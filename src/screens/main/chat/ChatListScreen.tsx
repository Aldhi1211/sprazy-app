import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../../../theme/colors';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { ChatStackParamList } from '../../../navigation/types';
import {
  subscribeConversations,
  subscribeConversationsByFriends,
  Conversation,
  formatConvTime,
} from '../../../firebase/chatService';
import {
  getFriends,
  getIncomingRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getUserPublicProfile,
  PublicUserProfile,
  FriendRequest,
} from '../../../firebase/friendsService';
import AppIcon from '../../../components/AppIcon';

type Props = {
  navigation: NativeStackNavigationProp<ChatStackParamList, 'ChatList'>;
};

// First 4 friends simulate "online" (demo)
const ONLINE_SIMULATE_COUNT = 4;

const Avatar = ({
  initials,
  color,
  size = 46,
  showOnline = false,
}: {
  initials: string;
  color: string;
  size?: number;
  showOnline?: boolean;
}) => (
  <View style={{ position: 'relative' }}>
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
      ]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.3 }]}>{initials}</Text>
    </View>
    {showOnline && <View style={[styles.onlineDot, { borderRadius: 6 }]} />}
  </View>
);

const ChatListScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { user } = useAuth();

  const [friends, setFriends] = useState<PublicUserProfile[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [convError, setConvError] = useState('');
  // Cache profiles for conversation participants (may not be in friends list)
  const [profileCache, setProfileCache] = useState<Record<string, PublicUserProfile>>({});
  const [incomingRequests, setIncomingRequests] = useState<
    (FriendRequest & { senderProfile?: PublicUserProfile })[]
  >([]);
  const [processingReqId, setProcessingReqId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Real-time conversation subscription — two sources merged:
  // 1. query by participants (standard)
  // 2. direct doc lookup by friendId (works even without participants field)
  useEffect(() => {
    if (!user) { return; }

    // Keep latest results from each source; merge by convId
    let fromQuery: Conversation[] = [];
    let fromFriends: Conversation[] = [];

    const merge = () => {
      const map = new Map<string, Conversation>();
      fromQuery.forEach(c => map.set(c.id, c));
      fromFriends.forEach(c => map.set(c.id, c)); // overwrite with direct-lookup data
      const sorted = Array.from(map.values()).sort((a, b) => {
        const ta = a.lastMessageTime?.toMillis() ?? 0;
        const tb = b.lastMessageTime?.toMillis() ?? 0;
        return tb - ta;
      });
      setConversations(sorted);
    };

    const unsub1 = subscribeConversations(
      user.uid,
      convs => { fromQuery = convs; setConvError(''); merge(); },
      err => setConvError(err.message),
    );

    // friendIds comes from friends state — re-subscribed when friends change
    const friendIds = friends.map(f => f.uid);
    const unsub2 = subscribeConversationsByFriends(
      user.uid,
      friendIds,
      convs => { fromFriends = convs; merge(); },
    );

    return () => { unsub1(); unsub2(); };
  }, [user?.uid, friends]);

  // Fetch profiles for any conversation participant not yet cached
  useEffect(() => {
    if (!conversations.length) { return; }
    const missingIds = conversations
      .map(c => c.friendId)
      .filter(id => id && !profileCache[id]);
    if (!missingIds.length) { return; }

    Promise.all(missingIds.map(id => getUserPublicProfile(id).catch(() => null))).then(profiles => {
      const updates: Record<string, PublicUserProfile> = {};
      missingIds.forEach((id, i) => {
        if (profiles[i]) { updates[id] = profiles[i]!; }
      });
      if (Object.keys(updates).length) {
        setProfileCache(prev => ({ ...prev, ...updates }));
      }
    });
  }, [conversations]);

  // Keep profileCache in sync when friends list updates
  useEffect(() => {
    if (!friends.length) { return; }
    const updates: Record<string, PublicUserProfile> = {};
    friends.forEach(f => { updates[f.uid] = f; });
    setProfileCache(prev => ({ ...prev, ...updates }));
  }, [friends]);

  const loadFriendsAndRequests = useCallback(async () => {
    if (!user) { return; }
    try {
      const [fs, reqs] = await Promise.all([
        getFriends(user.uid),
        getIncomingRequests(user.uid),
      ]);
      setFriends(fs);

      const reqsWithProfiles = await Promise.all(
        reqs.map(async req => ({
          ...req,
          senderProfile: (await getUserPublicProfile(req.fromUid).catch(() => null)) ?? undefined,
        })),
      );
      setIncomingRequests(reqsWithProfiles);
    } catch {
      setFriends([]);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadFriendsAndRequests();
    }, [loadFriendsAndRequests]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFriendsAndRequests();
    setRefreshing(false);
  };

  const handleAccept = async (req: FriendRequest) => {
    if (!user || processingReqId) { return; }
    setProcessingReqId(req.id);
    try {
      await acceptFriendRequest(req.id, user.uid, req.fromUid);
      setIncomingRequests(prev => prev.filter(r => r.id !== req.id));
      const fs = await getFriends(user.uid);
      setFriends(fs);
    } finally {
      setProcessingReqId(null);
    }
  };

  const handleDecline = async (req: FriendRequest) => {
    if (!user || processingReqId) { return; }
    setProcessingReqId(req.id);
    try {
      await declineFriendRequest(req.id);
      setIncomingRequests(prev => prev.filter(r => r.id !== req.id));
    } finally {
      setProcessingReqId(null);
    }
  };

  // Online friends = first ONLINE_SIMULATE_COUNT
  const onlineFriends = friends.slice(0, ONLINE_SIMULATE_COUNT);

  // Build display list — show all conversations, use fallback if profile not cached yet
  const FALLBACK_COLORS = ['#22a855', '#f97316', '#8b5cf6', '#0891b2', '#e11d48'];
  const fallbackProfile = (uid: string): PublicUserProfile => {
    const hash = uid.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return {
      uid,
      username: uid.slice(0, 8),
      initials: uid.slice(0, 2).toUpperCase(),
      avatarColor: FALLBACK_COLORS[hash % FALLBACK_COLORS.length],
      level: '',
    };
  };

  const chatsWithProfiles = conversations.map(conv => ({
    conv,
    friend: profileCache[conv.friendId] ?? fallbackProfile(conv.friendId),
  }));

  const filtered = searchQuery.trim()
    ? chatsWithProfiles.filter(item =>
        item.friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.friend.displayName ?? '').toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : chatsWithProfiles;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ──────────────────────────────────────────────── */}
      <View style={[styles.header, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Messages</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.headerBtn, { backgroundColor: Colors.primaryLight }]}
              onPress={() => navigation.navigate('AddFriend')}>
              <AppIcon name="friends" size={20} />
              {incomingRequests.length > 0 && (
                <View style={styles.notifDot}>
                  <Text style={styles.notifDotText}>{incomingRequests.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headerBtn, { backgroundColor: Colors.primaryLight }]}>
              <AppIcon name="add_friend" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.searchBar, { backgroundColor: Colors.primaryLight, borderColor: '#c8edda' }]}>
          <AppIcon name="search" size={16} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search messages..."
            placeholderTextColor="#a0c8b0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <AppIcon name="close" size={16} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}>

        {/* ── Firestore error banner ────────────────────────────── */}
        {convError ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠ {convError}</Text>
          </View>
        ) : null}

        {/* ── Friend Requests ───────────────────────────────────── */}
        {incomingRequests.length > 0 && !searchQuery && (
          <View style={styles.reqSection}>
            <Text style={[styles.sectionLabel, { color: Colors.primaryDark }]}>
              Friend Requests ({incomingRequests.length})
            </Text>
            {incomingRequests.map(req => {
              const profile = req.senderProfile;
              const isProcessing = processingReqId === req.id;
              return (
                <View
                  key={req.id}
                  style={[styles.reqCard, { backgroundColor: colors.bg, borderColor: '#b5e8ca' }]}>
                  <Avatar
                    initials={profile?.initials ?? req.fromUsername.slice(0, 2).toUpperCase()}
                    color={profile?.avatarColor ?? Colors.primary}
                    size={44}
                  />
                  <View style={styles.reqInfo}>
                    <Text style={[styles.reqName, { color: colors.text }]}>
                      {profile?.displayName || req.fromUsername}
                    </Text>
                    <Text style={[styles.reqSub, { color: Colors.primary }]}>
                      @{req.fromUsername}
                      {profile?.level ? ` · ${profile.level}` : ''}
                    </Text>
                  </View>
                  <View style={styles.reqActions}>
                    <TouchableOpacity
                      style={[styles.reqBtnAccept, isProcessing && { opacity: 0.5 }]}
                      onPress={() => handleAccept(req)}
                      disabled={isProcessing}
                      activeOpacity={0.8}>
                      <Text style={styles.reqBtnAcceptText}>✓ Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.reqBtnDecline, { borderColor: colors.border }, isProcessing && { opacity: 0.5 }]}
                      onPress={() => handleDecline(req)}
                      disabled={isProcessing}
                      activeOpacity={0.8}>
                      <Text style={[styles.reqBtnDeclineText, { color: colors.textSub }]}>✕</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* ── Online Strip ──────────────────────────────────────── */}
        {onlineFriends.length > 0 && !searchQuery && (
          <View style={styles.onlineStrip}>
            <Text style={[styles.stripLabel, { color: Colors.primaryDark }]}>Online Now</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.onlineRow}>
              {onlineFriends.map(f => (
                <TouchableOpacity
                  key={f.uid}
                  style={styles.onlineItem}
                  onPress={() => navigation.navigate('FriendProfile', { friendId: f.uid })}
                  activeOpacity={0.75}>
                  <Avatar initials={f.initials} color={f.avatarColor} size={46} showOnline />
                  <Text style={[styles.onlineName, { color: Colors.primaryDark }]} numberOfLines={1}>
                    {f.username.split('.')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.onlineItem}
                onPress={() => navigation.navigate('AddFriend')}
                activeOpacity={0.75}>
                <View style={styles.onlineAdd}>
                  <Text style={{ fontSize: 22, color: '#5a9e75' }}>+</Text>
                </View>
                <Text style={[styles.onlineName, { color: '#a0c8b0' }]}>Add</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}

        {/* ── No Friends yet ─────────────────────────────────────── */}
        {friends.length === 0 && conversations.length === 0 && (
          <View style={styles.emptyFriends}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>👥</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No friends yet</Text>
            <Text style={[styles.emptySub, { color: colors.textSub }]}>
              Search for friends by username to start chatting!
            </Text>
            <TouchableOpacity
              style={styles.addFriendBtn}
              onPress={() => navigation.navigate('AddFriend')}
              activeOpacity={0.85}>
              <Text style={styles.addFriendBtnText}>+ Add Friend</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Recent Chats ──────────────────────────────────────── */}
        {filtered.length > 0 && (
          <>
            <Text style={[styles.sectionLabel, { color: Colors.primaryDark }]}>Recent Chats</Text>
            {filtered.map(({ conv, friend }, idx) => {
              const isOnline = idx < ONLINE_SIMULATE_COUNT;
              const unread = conv.unreadCount[user?.uid ?? ''] ?? 0;
              const isUnread = unread > 0;

              return (
                <TouchableOpacity
                  key={conv.id}
                  style={[
                    styles.chatItem,
                    {
                      backgroundColor: isUnread ? '#f7fef9' : colors.bg,
                      borderBottomColor: colors.border,
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate('Conversation', { friendId: friend.uid })
                  }
                  activeOpacity={0.75}>
                  <Avatar
                    initials={friend.initials}
                    color={friend.avatarColor}
                    size={48}
                    showOnline={isOnline}
                  />
                  <View style={styles.chatInfo}>
                    <Text style={[styles.chatName, { color: colors.text }]}>
                      {friend.displayName || friend.username}
                    </Text>
                    <Text
                      style={[
                        styles.chatPreview,
                        isUnread ? { color: Colors.primaryDark, fontWeight: '700' } : { color: colors.textSub },
                      ]}
                      numberOfLines={1}>
                      {conv.lastMessage || 'Say hello!'}
                    </Text>
                  </View>
                  <View style={styles.chatRight}>
                    <Text style={[styles.chatTime, { color: colors.textSub }]}>
                      {formatConvTime(conv.lastMessageTime)}
                    </Text>
                    {isUnread ? (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{unread > 99 ? '99+' : unread}</Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        )}

        {/* ── Friends with no chat yet ─────────────────────────── */}
        {friends.length > 0 && conversations.length === 0 && filtered.length === 0 && !searchQuery && (
          <View style={styles.emptyChats}>
            <Text style={{ fontSize: 36, marginBottom: 10 }}>💬</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No messages yet</Text>
            <Text style={[styles.emptySub, { color: colors.textSub }]}>
              Start a conversation with one of your friends!
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.friendsRow}
              style={{ marginTop: 16 }}>
              {friends.map(f => (
                <TouchableOpacity
                  key={f.uid}
                  style={styles.friendChip}
                  onPress={() => navigation.navigate('Conversation', { friendId: f.uid })}
                  activeOpacity={0.75}>
                  <Avatar initials={f.initials} color={f.avatarColor} size={40} />
                  <Text style={[styles.friendChipName, { color: colors.text }]} numberOfLines={1}>
                    {f.username.split('.')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorBanner: {
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff0f0',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: { fontSize: 12, color: '#b91c1c' },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    borderBottomWidth: 1.5,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: '800' },
  headerActions: { flexDirection: 'row', gap: 8 },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#e11d48',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  notifDotText: { fontSize: 9, fontWeight: '800', color: '#fff' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 13, fontWeight: '500', padding: 0 },

  // Avatar
  avatar: { alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700' },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
  },

  // Online Strip
  onlineStrip: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 10 },
  stripLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  onlineRow: { flexDirection: 'row', gap: 14 },
  onlineItem: { alignItems: 'center', gap: 5 },
  onlineName: {
    fontSize: 10,
    fontWeight: '600',
    maxWidth: 46,
    textAlign: 'center',
  },
  onlineAdd: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#b5e8ca',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Section
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 4,
  },

  // Chat Item
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 12,
    borderBottomWidth: 1,
  },
  chatInfo: { flex: 1, minWidth: 0 },
  chatName: { fontSize: 13.5, fontWeight: '700', marginBottom: 3 },
  chatPreview: { fontSize: 12, fontWeight: '500' },
  chatRight: { alignItems: 'flex-end', gap: 5, flexShrink: 0 },
  chatTime: { fontSize: 10.5, fontWeight: '500' },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: { fontSize: 10.5, fontWeight: '700', color: '#fff' },

  // Empty states
  emptyFriends: {
    alignItems: 'center',
    padding: 36,
    paddingTop: 60,
  },
  emptyChats: {
    alignItems: 'center',
    padding: 32,
    paddingTop: 40,
  },
  emptyTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  emptySub: { fontSize: 13, textAlign: 'center', lineHeight: 19 },
  addFriendBtn: {
    marginTop: 16,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  addFriendBtnText: { color: '#fff', fontSize: 13.5, fontWeight: '700' },
  friendsRow: { paddingHorizontal: 4, gap: 12 },
  friendChip: { alignItems: 'center', gap: 5 },
  friendChipName: { fontSize: 10, fontWeight: '600', maxWidth: 50, textAlign: 'center' },

  // Friend Requests
  reqSection: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4 },
  reqCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 13,
    padding: 11,
    paddingHorizontal: 13,
    gap: 10,
    marginBottom: 9,
    backgroundColor: '#f7fef9',
  },
  reqInfo: { flex: 1, minWidth: 0 },
  reqName: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  reqSub: { fontSize: 10.5, fontWeight: '500' },
  reqActions: { flexDirection: 'row', gap: 7, flexShrink: 0 },
  reqBtnAccept: {
    backgroundColor: Colors.primary,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  reqBtnAcceptText: { color: '#fff', fontSize: 11.5, fontWeight: '700' },
  reqBtnDecline: {
    borderWidth: 1.5,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  reqBtnDeclineText: { fontSize: 12, fontWeight: '700' },
});

export default ChatListScreen;
