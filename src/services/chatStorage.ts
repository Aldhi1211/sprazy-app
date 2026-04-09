import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Types ─────────────────────────────────────────────────────────────────────

export type MessageType = 'text' | 'course_share';

export interface CourseShareData {
  id: string;
  icon: string;
  title: string;
  lessonsCount: number;
  level: string;
  isFree: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  type: MessageType;
  courseData?: CourseShareData;
  timestamp: number;
  read: boolean;
}

export interface ChatMeta {
  friendId: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  isMuted: boolean;
}

// ── Keys ──────────────────────────────────────────────────────────────────────

/** Canonical key — smaller uid always comes first so both sides share the same bucket */
const messagesKey = (uidA: string, uidB: string): string => {
  const [a, b] = [uidA, uidB].sort();
  return `@chat_msgs_${a}_${b}`;
};

const chatListKey = (uid: string): string => `@chat_list_${uid}`;

// ── Messages ──────────────────────────────────────────────────────────────────

export const getMessages = async (
  myUid: string,
  friendId: string,
): Promise<ChatMessage[]> => {
  try {
    const raw = await AsyncStorage.getItem(messagesKey(myUid, friendId));
    return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    return [];
  }
};

export const saveMessage = async (
  myUid: string,
  friendId: string,
  message: ChatMessage,
): Promise<void> => {
  try {
    const key = messagesKey(myUid, friendId);
    const existing = await getMessages(myUid, friendId);
    existing.push(message);
    await AsyncStorage.setItem(key, JSON.stringify(existing));
    await updateChatMeta(myUid, friendId, message);
  } catch {
    // silently fail — local storage errors shouldn't crash the app
  }
};

export const markAllRead = async (myUid: string, friendId: string): Promise<void> => {
  try {
    const msgs = await getMessages(myUid, friendId);
    const updated = msgs.map(m =>
      m.senderId !== myUid ? { ...m, read: true } : m,
    );
    await AsyncStorage.setItem(messagesKey(myUid, friendId), JSON.stringify(updated));

    // Zero out unread count in meta
    const list = await getChatList(myUid);
    const newList = list.map(item =>
      item.friendId === friendId ? { ...item, unreadCount: 0 } : item,
    );
    await AsyncStorage.setItem(chatListKey(myUid), JSON.stringify(newList));
  } catch { /* silent */ }
};

export const clearConversation = async (myUid: string, friendId: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(messagesKey(myUid, friendId));
    const list = await getChatList(myUid);
    const newList = list.filter(item => item.friendId !== friendId);
    await AsyncStorage.setItem(chatListKey(myUid), JSON.stringify(newList));
  } catch { /* silent */ }
};

// ── Chat List (metadata) ──────────────────────────────────────────────────────

export const getChatList = async (uid: string): Promise<ChatMeta[]> => {
  try {
    const raw = await AsyncStorage.getItem(chatListKey(uid));
    return raw ? (JSON.parse(raw) as ChatMeta[]) : [];
  } catch {
    return [];
  }
};

const updateChatMeta = async (
  myUid: string,
  friendId: string,
  lastMsg: ChatMessage,
): Promise<void> => {
  const list = await getChatList(myUid);
  const existing = list.find(item => item.friendId === friendId);
  const preview = buildPreview(lastMsg);

  if (existing) {
    existing.lastMessage = preview;
    existing.lastMessageTime = lastMsg.timestamp;
    if (lastMsg.senderId !== myUid) {
      existing.unreadCount += 1;
    }
  } else {
    list.push({
      friendId,
      lastMessage: preview,
      lastMessageTime: lastMsg.timestamp,
      unreadCount: lastMsg.senderId !== myUid ? 1 : 0,
      isMuted: false,
    });
  }
  // Sort by latest first
  list.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
  await AsyncStorage.setItem(chatListKey(myUid), JSON.stringify(list));
};

const buildPreview = (msg: ChatMessage): string => {
  if (msg.type === 'course_share') {
    return `Shared a course 📚`;
  }
  return msg.text.length > 45 ? msg.text.slice(0, 45) + '…' : msg.text;
};

export const toggleMute = async (myUid: string, friendId: string): Promise<void> => {
  const list = await getChatList(myUid);
  const newList = list.map(item =>
    item.friendId === friendId ? { ...item, isMuted: !item.isMuted } : item,
  );
  await AsyncStorage.setItem(chatListKey(myUid), JSON.stringify(newList));
};

// ── Helpers ───────────────────────────────────────────────────────────────────

export const generateMessageId = (): string =>
  `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const formatMessageTime = (timestamp: number): string => {
  const now = new Date();
  const d = new Date(timestamp);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (diffDays === 1) { return 'Yesterday'; }
  if (diffDays < 7) {
    return d.toLocaleDateString([], { weekday: 'long' });
  }
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export const formatDateSeparator = (timestamp: number): string => {
  const now = new Date();
  const d = new Date(timestamp);
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return `Today, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  if (diffDays === 1) { return 'Yesterday'; }
  return d.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
};
