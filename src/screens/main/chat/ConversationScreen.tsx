import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../../../theme/colors';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { ChatStackParamList } from '../../../navigation/types';
import {
  FirestoreMessage,
  sendMessage,
  subscribeMessages,
  markConversationRead,
  buildConvId,
  formatMsgTime,
  formatDateSeparator,
} from '../../../firebase/chatService';
import {
  getUserPublicProfile,
  PublicUserProfile,
} from '../../../firebase/friendsService';
import { Timestamp } from 'firebase/firestore';
import AppIcon from '../../../components/AppIcon';

type Props = {
  navigation: NativeStackNavigationProp<ChatStackParamList, 'Conversation'>;
  route: RouteProp<ChatStackParamList, 'Conversation'>;
};

type ListItem =
  | { type: 'date'; key: string; label: string }
  | { type: 'message'; key: string; message: FirestoreMessage };

const buildListItems = (messages: FirestoreMessage[]): ListItem[] => {
  const items: ListItem[] = [];
  let lastDateLabel = '';

  for (const msg of messages) {
    const dateLabel = formatDateSeparator(msg.timestamp);
    if (dateLabel && dateLabel !== lastDateLabel) {
      items.push({ type: 'date', key: `date_${msg.id}`, label: dateLabel });
      lastDateLabel = dateLabel;
    }
    items.push({ type: 'message', key: msg.id, message: msg });
  }
  return items;
};

const ConversationScreen = ({ navigation, route }: Props) => {
  const { colors } = useTheme();
  const { user, profile } = useAuth();
  const { friendId } = route.params;

  const [messages, setMessages] = useState<FirestoreMessage[]>([]);
  const [friend, setFriend] = useState<PublicUserProfile | null>(null);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef<FlatList>(null);
  const convId = buildConvId(user?.uid ?? '', friendId);

  const myUid = user?.uid ?? '';
  const myInitials = profile?.username
    ? profile.username.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? 'ME';

  // Load friend profile
  useEffect(() => {
    getUserPublicProfile(friendId).then(setFriend);
  }, [friendId]);

  // Real-time messages subscription
  useEffect(() => {
    if (!myUid) { return; }

    const unsubscribe = subscribeMessages(
      myUid,
      friendId,
      msgs => {
        setMessages(msgs);
        setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
      },
    );

    // Mark as read when entering conversation
    markConversationRead(convId, myUid);

    return () => {
      unsubscribe();
    };
  }, [myUid, friendId, convId]);

  // Mark read whenever new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      markConversationRead(convId, myUid);
    }
  }, [messages.length, convId, myUid]);

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || !myUid || sending) { return; }

    setInputText('');
    setSending(true);
    try {
      await sendMessage(myUid, friendId, text);
    } catch {
      setInputText(text); // restore on failure
    } finally {
      setSending(false);
    }
  };

  const listItems = buildListItems(messages);

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item.type === 'date') {
      return (
        <View style={styles.dateSep}>
          <Text style={[styles.dateSepText, { color: colors.textSub }]}>{item.label}</Text>
        </View>
      );
    }

    const msg = item.message;
    const isMe = msg.senderId === myUid;

    return (
      <View style={[styles.msgRow, isMe ? styles.msgRowMe : styles.msgRowThem]}>
        <View
          style={[
            styles.msgAvatar,
            { backgroundColor: isMe ? '#5dd98a' : (friend?.avatarColor ?? Colors.primary) },
          ]}>
          <Text style={[styles.msgAvatarText, { color: isMe ? '#0a2e15' : '#fff' }]}>
            {isMe ? myInitials : (friend?.initials ?? '??')}
          </Text>
        </View>

        <View style={[styles.msgBubbleCol, isMe ? styles.msgBubbleColMe : {}]}>
          {!isMe && friend && (
            <Text style={[styles.msgSenderName, { color: Colors.primary }]}>
              {friend.username.split('.')[0]}
            </Text>
          )}

          {msg.type === 'course_share' && msg.courseData ? (
            <View style={[styles.courseCard, { borderColor: colors.border }]}>
              <Text style={styles.courseCardTag}>📚 Course</Text>
              <Text style={[styles.courseCardTitle, { color: colors.text }]}>
                {msg.courseData.title}
              </Text>
              <Text style={[styles.courseCardSub, { color: Colors.primary }]}>
                {msg.courseData.lessonsCount} lessons · {msg.courseData.level} ·{' '}
                {msg.courseData.isFree ? 'Free' : 'Premium'}
              </Text>
            </View>
          ) : (
            <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
              <Text style={[styles.bubbleText, { color: isMe ? '#fff' : colors.text }]}>
                {msg.text}
              </Text>
            </View>
          )}

          <View style={isMe ? styles.msgMetaMe : styles.msgMetaThem}>
            <Text style={[styles.msgTime, { color: colors.textSub }]}>
              {formatMsgTime(msg.timestamp)}
            </Text>
            {isMe && <Text style={styles.msgRead}>✓✓</Text>}
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ────────────────────────────────────────────── */}
      <View style={[styles.header, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: Colors.primaryLight }]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.backIcon, { color: Colors.primaryDark }]}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.peerInfo}
          onPress={() => navigation.navigate('FriendProfile', { friendId })}
          activeOpacity={0.75}>
          <View style={[styles.peerAvatar, { backgroundColor: friend?.avatarColor ?? Colors.primary }]}>
            <Text style={styles.peerAvatarText}>{friend?.initials ?? '??'}</Text>
            <View style={styles.peerOnlineDot} />
          </View>
          <View style={styles.peerText}>
            <Text style={[styles.peerName, { color: colors.text }]}>
              {friend?.displayName || friend?.username || '...'}
            </Text>
            <Text style={styles.peerStatus}>
              Online · {friend?.level ?? 'Learner'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: Colors.primaryLight }]}
            onPress={() => navigation.navigate('FriendProfile', { friendId })}>
            <AppIcon name="profile" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: Colors.primaryLight }]}
            onPress={() =>
              Alert.alert('More Options', '', [
                { text: 'View Profile', onPress: () => navigation.navigate('FriendProfile', { friendId }) },
                { text: 'Cancel', style: 'cancel' },
              ])
            }>
            <AppIcon name="more" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Messages ──────────────────────────────────────────── */}
      <FlatList
        ref={listRef}
        data={listItems}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        contentContainerStyle={[styles.msgList, { backgroundColor: Colors.primaryLight }]}
        style={{ backgroundColor: Colors.primaryLight }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
        ListEmptyComponent={
          <View style={styles.emptyConvo}>
            <Text style={{ fontSize: 36, marginBottom: 10 }}>👋</Text>
            <Text style={[styles.emptyText, { color: colors.textSub }]}>
              Say hello to {friend?.username ?? 'your friend'}!
            </Text>
          </View>
        }
      />

      {/* ── Input Bar ─────────────────────────────────────────── */}
      <View style={[styles.inputBar, { backgroundColor: colors.bg, borderTopColor: colors.border }]}>
        <TouchableOpacity style={[styles.attachBtn, { backgroundColor: Colors.primaryLight }]}>
          <AppIcon name="attach" size={20} />
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { backgroundColor: Colors.primaryLight, borderColor: '#c8edda', color: colors.text }]}
          placeholder="Type a message..."
          placeholderTextColor="#a0c8b0"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          returnKeyType="send"
          blurOnSubmit={false}
          onSubmitEditing={handleSend}
        />

        <TouchableOpacity style={[styles.emojiBtn, { backgroundColor: Colors.primaryLight }]}>
          <AppIcon name="emoji" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sendBtn, { opacity: inputText.trim() && !sending ? 1 : 0.5 }]}
          onPress={handleSend}
          disabled={!inputText.trim() || sending}
          activeOpacity={0.85}>
          <AppIcon name="send" size={18} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 52,
    paddingBottom: 10,
    gap: 10,
    borderBottomWidth: 1.5,
  },
  backBtn: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { fontSize: 16, fontWeight: '600' },
  peerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  peerAvatar: {
    width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  peerAvatarText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  peerOnlineDot: {
    position: 'absolute', bottom: 1, right: 1,
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: '#22c55e', borderWidth: 2, borderColor: '#fff',
  },
  peerText: { flex: 1 },
  peerName: { fontSize: 14, fontWeight: '700' },
  peerStatus: { fontSize: 11, color: Colors.primary, fontWeight: '600' },
  headerActions: { flexDirection: 'row', gap: 7 },
  actionBtn: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },

  msgList: { padding: 14, paddingBottom: 8, flexGrow: 1 },

  dateSep: { alignItems: 'center', paddingVertical: 8 },
  dateSepText: { fontSize: 10.5, fontWeight: '600' },

  msgRow: { flexDirection: 'row', gap: 8, marginBottom: 12, alignItems: 'flex-end' },
  msgRowMe: { flexDirection: 'row-reverse' },
  msgRowThem: {},

  msgAvatar: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  msgAvatarText: { fontSize: 10, fontWeight: '700' },

  msgBubbleCol: { maxWidth: '72%', gap: 3 },
  msgBubbleColMe: { alignItems: 'flex-end' },
  msgSenderName: { fontSize: 10, fontWeight: '700', paddingHorizontal: 4 },

  bubble: { borderRadius: 14, paddingHorizontal: 13, paddingVertical: 9 },
  bubbleMe: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  bubbleThem: {
    backgroundColor: '#fff', borderBottomLeftRadius: 4,
    borderWidth: 1.5, borderColor: '#d4f0de',
  },
  bubbleText: { fontSize: 12.5, lineHeight: 18 },

  courseCard: {
    backgroundColor: '#fff', borderWidth: 1.5,
    borderRadius: 13, padding: 10, paddingHorizontal: 12, maxWidth: 190,
  },
  courseCardTag: {
    fontSize: 9.5, fontWeight: '700', color: Colors.primaryDark,
    textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4,
  },
  courseCardTitle: { fontSize: 12.5, fontWeight: '700', marginBottom: 2 },
  courseCardSub: { fontSize: 10.5, fontWeight: '500' },

  msgMetaMe: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingRight: 4 },
  msgMetaThem: { flexDirection: 'row', alignItems: 'center', paddingLeft: 4 },
  msgTime: { fontSize: 10, fontWeight: '500' },
  msgRead: { fontSize: 10, color: Colors.primary, fontWeight: '600' },

  emptyConvo: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingTop: 100, paddingHorizontal: 32,
  },
  emptyText: { fontSize: 13.5, textAlign: 'center' },

  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end',
    paddingHorizontal: 12, paddingVertical: 9,
    gap: 8, borderTopWidth: 1.5,
  },
  attachBtn: {
    width: 34, height: 34, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  input: {
    flex: 1, borderWidth: 1.5, borderRadius: 22,
    paddingHorizontal: 14, paddingVertical: 8,
    fontSize: 13, maxHeight: 100, minHeight: 36,
  },
  emojiBtn: {
    width: 34, height: 34, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  sendBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
});

export default ConversationScreen;
