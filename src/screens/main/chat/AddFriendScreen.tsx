import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../../theme/colors';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { ChatStackParamList } from '../../../navigation/types';
import {
  searchUserByUsername,
  sendFriendRequest,
  checkFriendRequestStatus,
  getFriends,
  PublicUserProfile,
} from '../../../firebase/friendsService';
import AppIcon from '../../../components/AppIcon';

type Props = {
  navigation: NativeStackNavigationProp<ChatStackParamList, 'AddFriend'>;
};

type RequestStatus = 'none' | 'pending' | 'accepted' | 'loading';

// Static suggestions for demo (in production these would come from mutual connections in Firestore)
const SUGGESTION_COLORS = ['#8b5cf6', '#0891b2', '#f97316', '#e11d48'];

const Avatar = ({
  initials,
  color,
  size = 46,
}: {
  initials: string;
  color: string;
  size?: number;
}) => (
  <View
    style={[
      styles.avatar,
      { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
    ]}>
    <Text style={[styles.avatarText, { fontSize: size * 0.3 }]}>{initials}</Text>
  </View>
);

const AddFriendScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { user, profile } = useAuth();

  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<PublicUserProfile | null>(null);
  const [searchError, setSearchError] = useState('');
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('none');
  const [existingFriends, setExistingFriends] = useState<PublicUserProfile[]>([]);
  const [suggestStatus, setSuggestStatus] = useState<Record<string, 'none' | 'pending' | 'accepted'>>({});

  useEffect(() => {
    if (user) {
      getFriends(user.uid).then(setExistingFriends);
    }
  }, [user]);

  const handleSearch = async () => {
    const q = query.trim();
    if (!q || !user) { return; }
    setSearching(true);
    setSearchResult(null);
    setSearchError('');
    setRequestStatus('none');

    try {
      const result = await searchUserByUsername(q, user.uid);
      if (!result) {
        setSearchError('No user found with that username.');
      } else {
        setSearchResult(result);
        const status = await checkFriendRequestStatus(user.uid, result.uid);
        setRequestStatus(status);
      }
    } catch {
      setSearchError('Something went wrong. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleAddFriend = async (targetUid: string, targetProfile: PublicUserProfile) => {
    if (!user || !profile) { return; }
    setRequestStatus('loading');
    try {
      await sendFriendRequest(user.uid, profile.username ?? user.email ?? 'unknown', targetUid);
      setRequestStatus('pending');
    } catch {
      setRequestStatus('none');
    }
  };

  const handleAddSuggestion = async (f: PublicUserProfile) => {
    if (!user || !profile) { return; }
    setSuggestStatus(prev => ({ ...prev, [f.uid]: 'pending' }));
    try {
      await sendFriendRequest(user.uid, profile.username ?? user.email ?? 'unknown', f.uid);
    } catch {
      setSuggestStatus(prev => ({ ...prev, [f.uid]: 'none' }));
    }
  };

  // Suggestions = existing friends' details shown for others to discover (simplified demo)
  // In production, we'd fetch "people you may know" from Firestore
  const suggestions = existingFriends.slice(0, 4);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ────────────────────────────────────────────── */}
      <View style={[styles.header, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: Colors.primaryLight }]}
            onPress={() => navigation.goBack()}>
            <Text style={[styles.backIcon, { color: Colors.primaryDark }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Add Friend</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Search Bar */}
        <View style={[styles.searchBar, { borderColor: Colors.primary, backgroundColor: Colors.primaryLight }]}>
          <AppIcon name="search" size={18} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search by username..."
            placeholderTextColor="#a0c8b0"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setQuery('');
                setSearchResult(null);
                setSearchError('');
              }}>
              <AppIcon name="close" size={16} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>

        {/* ── Loading ──────────────────────────────────────────── */}
        {searching && (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={[styles.loadingText, { color: colors.textSub }]}>Searching...</Text>
          </View>
        )}

        {/* ── Search Error ─────────────────────────────────────── */}
        {!searching && searchError !== '' && (
          <View style={[styles.errorBox, { borderColor: colors.border }]}>
            <AppIcon name="search" size={28} style={{ marginBottom: 8 }} />
            <Text style={[styles.errorText, { color: colors.textSub }]}>{searchError}</Text>
          </View>
        )}

        {/* ── Search Result ─────────────────────────────────────── */}
        {!searching && searchResult && (
          <>
            <Text style={[styles.sectionLabel, { color: Colors.primaryDark }]}>Search Result</Text>
            <View style={[styles.resultCard, { backgroundColor: colors.bg, borderColor: colors.border }]}>
              {/* Top Row */}
              <View style={styles.rcTop}>
                <Avatar initials={searchResult.initials} color={searchResult.avatarColor} size={54} />
                <View style={styles.rcInfo}>
                  <Text style={[styles.rcName, { color: colors.text }]}>
                    {searchResult.displayName || searchResult.username}
                  </Text>
                  <Text style={[styles.rcUsername, { color: Colors.primary }]}>
                    @{searchResult.username}
                  </Text>
                  <View style={styles.rcBadges}>
                    {searchResult.level && (
                      <View style={styles.badgeB1}>
                        <Text style={styles.badgeB1Text}>{searchResult.level}</Text>
                      </View>
                    )}
                    {(searchResult.streak ?? 0) > 0 && (
                      <View style={styles.badgeStreak}>
                        <Text style={styles.badgeStreakText}>
                          🔥 {searchResult.streak} days
                        </Text>
                      </View>
                    )}
                    {searchResult.location && (
                      <View style={styles.badgeLoc}>
                        <Text style={styles.badgeLocText}>{searchResult.location}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Stats */}
              <View style={styles.rcStats}>
                {[
                  { num: searchResult.lessonsCount ?? 0, label: 'Lessons' },
                  { num: searchResult.coursesCount ?? 0, label: 'Courses' },
                  { num: searchResult.streak ?? 0, label: 'Streak' },
                  { num: searchResult.xp ?? 0, label: 'XP' },
                ].map(item => (
                  <View key={item.label} style={[styles.rcStat, { backgroundColor: Colors.primaryLight }]}>
                    <Text style={styles.rcStatNum}>{item.num}</Text>
                    <Text style={styles.rcStatLabel}>{item.label}</Text>
                  </View>
                ))}
              </View>

              {/* Action Button */}
              {requestStatus === 'loading' ? (
                <View style={styles.btnPending}>
                  <ActivityIndicator color={Colors.primary} size="small" />
                </View>
              ) : requestStatus === 'accepted' ? (
                <TouchableOpacity
                  style={styles.btnAccepted}
                  onPress={() =>
                    navigation.navigate('Conversation', { friendId: searchResult.uid })
                  }>
                  <Text style={styles.btnAcceptedText}>💬 Send Message</Text>
                </TouchableOpacity>
              ) : requestStatus === 'pending' ? (
                <View style={styles.btnPending}>
                  <Text style={styles.btnPendingText}>⏳ Request Sent</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => handleAddFriend(searchResult.uid, searchResult)}
                  activeOpacity={0.85}>
                  <Text style={styles.btnAddText}>+ Add Friend</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        {/* ── People You May Know ─────────────────────────────── */}
        {suggestions.length > 0 && (
          <>
            <Text style={[styles.sectionLabel, { color: Colors.primaryDark, marginTop: searchResult ? 8 : 0 }]}>
              People You May Know
            </Text>
            {suggestions.map((f, idx) => {
              const status = suggestStatus[f.uid] ?? 'none';
              const isSent = status === 'pending' || status === 'accepted';
              return (
                <TouchableOpacity
                  key={f.uid}
                  style={[styles.suggestItem, { backgroundColor: colors.bg, borderColor: colors.border }]}
                  onPress={() => navigation.navigate('FriendProfile', { friendId: f.uid })}
                  activeOpacity={0.75}>
                  <Avatar
                    initials={f.initials}
                    color={SUGGESTION_COLORS[idx % SUGGESTION_COLORS.length]}
                    size={42}
                  />
                  <View style={styles.suggestInfo}>
                    <Text style={[styles.suggestName, { color: colors.text }]}>
                      {f.displayName || f.username}
                    </Text>
                    <Text style={[styles.suggestSub, { color: Colors.primary }]}>
                      @{f.username} · {f.level ?? 'Learner'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.suggestAddBtn,
                      isSent
                        ? { backgroundColor: Colors.primaryLight, borderColor: '#d4f0de' }
                        : { backgroundColor: Colors.primaryLight, borderColor: '#b5e8ca' },
                    ]}
                    onPress={e => {
                      e.stopPropagation();
                      if (!isSent) { handleAddSuggestion(f); }
                    }}
                    activeOpacity={isSent ? 1 : 0.75}>
                    <Text style={[styles.suggestAddText, { color: isSent ? colors.textSub : Colors.primaryDark }]}>
                      {isSent ? 'Sent' : '+ Add'}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </>
        )}

        {/* ── Intro hint when no search yet ───────────────────── */}
        {!searching && !searchResult && searchError === '' && suggestions.length === 0 && (
          <View style={styles.hintBox}>
            <AppIcon name="search" size={44} style={{ marginBottom: 14 }} />
            <Text style={[styles.hintTitle, { color: colors.text }]}>Find Friends</Text>
            <Text style={[styles.hintSub, { color: colors.textSub }]}>
              Search by username (e.g. @rika.kusuma) to find and connect with fellow learners.
            </Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
    borderBottomWidth: 1.5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 16, fontWeight: '800' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 13,
    paddingHorizontal: 13,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 13, fontWeight: '600', padding: 0 },

  // Body
  body: { padding: 16 },

  // Loading / error
  loadingBox: { alignItems: 'center', padding: 30, gap: 10 },
  loadingText: { fontSize: 13 },
  errorBox: {
    alignItems: 'center',
    padding: 30,
    borderWidth: 1.5,
    borderRadius: 14,
    marginBottom: 10,
  },
  errorText: { fontSize: 13.5, textAlign: 'center', lineHeight: 20 },

  // Section label
  sectionLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
  },

  // Avatar
  avatar: { alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700' },

  // Result Card
  resultCard: {
    borderWidth: 1.5,
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
  },
  rcTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 13, marginBottom: 12 },
  rcInfo: { flex: 1 },
  rcName: { fontSize: 14.5, fontWeight: '800', marginBottom: 2 },
  rcUsername: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
  rcBadges: { flexDirection: 'row', gap: 5, flexWrap: 'wrap' },
  badgeB1: { backgroundColor: '#d4f5e0', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  badgeB1Text: { fontSize: 9.5, fontWeight: '700', color: Colors.primaryDark },
  badgeStreak: { backgroundColor: '#fff5d6', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  badgeStreakText: { fontSize: 9.5, fontWeight: '700', color: '#92600a' },
  badgeLoc: { backgroundColor: '#eef3ff', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  badgeLocText: { fontSize: 9.5, fontWeight: '700', color: '#4466cc' },

  rcStats: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  rcStat: { flex: 1, borderRadius: 9, paddingVertical: 7, alignItems: 'center' },
  rcStatNum: { fontSize: 14, fontWeight: '800', color: Colors.primaryDark, marginBottom: 2 },
  rcStatLabel: { fontSize: 9.5, color: Colors.primary, fontWeight: '500' },

  btnAdd: {
    backgroundColor: Colors.primary,
    borderRadius: 11,
    paddingVertical: 11,
    alignItems: 'center',
  },
  btnAddText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  btnPending: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1.5,
    borderColor: '#b5e8ca',
    borderRadius: 11,
    paddingVertical: 11,
    alignItems: 'center',
  },
  btnPendingText: { color: Colors.primaryDark, fontSize: 13, fontWeight: '600' },
  btnAccepted: {
    backgroundColor: Colors.primary,
    borderRadius: 11,
    paddingVertical: 11,
    alignItems: 'center',
  },
  btnAcceptedText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Suggestions
  suggestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 13,
    padding: 11,
    paddingHorizontal: 13,
    gap: 11,
    marginBottom: 9,
  },
  suggestInfo: { flex: 1 },
  suggestName: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  suggestSub: { fontSize: 10.5, fontWeight: '500' },
  suggestAddBtn: {
    borderWidth: 1.5,
    borderRadius: 9,
    paddingHorizontal: 13,
    paddingVertical: 6,
  },
  suggestAddText: { fontSize: 11.5, fontWeight: '700' },

  // Hint
  hintBox: { alignItems: 'center', paddingTop: 50, paddingHorizontal: 20 },
  hintTitle: { fontSize: 17, fontWeight: '800', marginBottom: 8 },
  hintSub: { fontSize: 13.5, textAlign: 'center', lineHeight: 20 },
});

export default AddFriendScreen;
