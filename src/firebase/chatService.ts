import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  writeBatch,
  increment,
} from 'firebase/firestore';
import { db } from './config';

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

export interface FirestoreMessage {
  id: string;
  senderId: string;
  text: string;
  type: MessageType;
  courseData?: CourseShareData | null;
  timestamp: Timestamp | null;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: Timestamp | null;
  /** unreadCount[uid] = number of unread messages for that uid */
  unreadCount: Record<string, number>;
  updatedAt: Timestamp | null;
  friendId: string; // populated client-side
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Canonical conversation ID: smaller uid always comes first */
export const buildConvId = (uid1: string, uid2: string): string => {
  const [a, b] = [uid1, uid2].sort();
  return `${a}_${b}`;
};

const previewText = (text: string, type: MessageType): string => {
  if (type === 'course_share') { return 'Shared a course 📚'; }
  return text.length > 45 ? text.slice(0, 45) + '…' : text;
};

// ── Conversation ──────────────────────────────────────────────────────────────

export const ensureConversation = async (
  uid1: string,
  uid2: string,
): Promise<string> => {
  const id = buildConvId(uid1, uid2);
  const ref = doc(db, 'conversations', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const sorted = [uid1, uid2].sort();
    await setDoc(ref, {
      participants: sorted,
      lastMessage: '',
      lastMessageTime: null,
      unreadCount: { [sorted[0]]: 0, [sorted[1]]: 0 },
      updatedAt: serverTimestamp(),
    });
  }
  return id;
};

// ── Send Message ──────────────────────────────────────────────────────────────

export const sendMessage = async (
  myUid: string,
  friendUid: string,
  text: string,
  type: MessageType = 'text',
  courseData?: CourseShareData,
): Promise<void> => {
  const id = await ensureConversation(myUid, friendUid);
  const batch = writeBatch(db);

  // Add message document
  const msgRef = doc(collection(db, 'conversations', id, 'messages'));
  batch.set(msgRef, {
    id: msgRef.id,
    senderId: myUid,
    text,
    type,
    courseData: courseData ?? null,
    timestamp: serverTimestamp(),
    read: false,
  });

  // Update conversation metadata + increment receiver unread count
  batch.set(
    doc(db, 'conversations', id),
    {
      lastMessage: previewText(text, type),
      lastMessageTime: serverTimestamp(),
      [`unreadCount.${friendUid}`]: increment(1),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  await batch.commit();
};

// ── Mark Read ─────────────────────────────────────────────────────────────────

export const markConversationRead = async (
  convId: string,
  uid: string,
): Promise<void> => {
  try {
    await setDoc(
      doc(db, 'conversations', convId),
      { [`unreadCount.${uid}`]: 0 },
      { merge: true },
    );
  } catch { /* silent */ }
};

// ── Real-time Subscriptions ───────────────────────────────────────────────────

/**
 * Subscribe to all conversations for a user.
 * Primary: query by participants array-contains.
 * Returns an unsubscribe function — call it in useEffect cleanup.
 */
export const subscribeConversations = (
  uid: string,
  onUpdate: (convs: Conversation[]) => void,
  onError?: (err: Error) => void,
): (() => void) => {
  const q = query(
    collection(db, 'conversations'),
    where('participants', 'array-contains', uid),
  );

  return onSnapshot(
    q,
    snap => {
      const convs: Conversation[] = snap.docs
        .map(d => {
          const data = d.data();
          return {
            id: d.id,
            participants: data.participants ?? [],
            lastMessage: data.lastMessage ?? '',
            lastMessageTime: data.lastMessageTime ?? null,
            unreadCount: data.unreadCount ?? {},
            updatedAt: data.updatedAt ?? null,
            friendId: (data.participants as string[]).find(p => p !== uid) ?? '',
          };
        })
        .sort((a, b) => {
          const ta = a.lastMessageTime?.toMillis() ?? 0;
          const tb = b.lastMessageTime?.toMillis() ?? 0;
          return tb - ta;
        });
      onUpdate(convs);
    },
    err => onError?.(err),
  );
};

/**
 * Subscribe to conversations by directly computing doc IDs from friendIds.
 * This works even if the conversation doc doesn't have a `participants` field.
 * Each friend gets its own onSnapshot listener; results are merged and sorted.
 */
export const subscribeConversationsByFriends = (
  myUid: string,
  friendIds: string[],
  onUpdate: (convs: Conversation[]) => void,
): (() => void) => {
  if (!friendIds.length) {
    onUpdate([]);
    return () => {};
  }

  const convMap = new Map<string, Conversation>();
  const unsubs: (() => void)[] = [];

  const emit = () => {
    const sorted = Array.from(convMap.values()).sort((a, b) => {
      const ta = a.lastMessageTime?.toMillis() ?? 0;
      const tb = b.lastMessageTime?.toMillis() ?? 0;
      return tb - ta;
    });
    onUpdate(sorted);
  };

  friendIds.forEach(friendId => {
    const convId = buildConvId(myUid, friendId);
    const ref = doc(db, 'conversations', convId);
    const unsub = onSnapshot(ref, snap => {
      if (snap.exists()) {
        const data = snap.data();
        convMap.set(convId, {
          id: convId,
          participants: data.participants ?? [myUid, friendId],
          lastMessage: data.lastMessage ?? '',
          lastMessageTime: data.lastMessageTime ?? null,
          unreadCount: data.unreadCount ?? {},
          updatedAt: data.updatedAt ?? null,
          friendId,
        });
      } else {
        convMap.delete(convId);
      }
      emit();
    });
    unsubs.push(unsub);
  });

  return () => unsubs.forEach(u => u());
};

/**
 * Subscribe to messages in a single conversation.
 * Returns an unsubscribe function.
 */
export const subscribeMessages = (
  myUid: string,
  friendUid: string,
  onUpdate: (messages: FirestoreMessage[]) => void,
  onError?: (err: Error) => void,
): (() => void) => {
  const id = buildConvId(myUid, friendUid);
  const q = query(
    collection(db, 'conversations', id, 'messages'),
    orderBy('timestamp', 'asc'),
    limit(200),
  );

  return onSnapshot(
    q,
    snap => {
      const msgs = snap.docs.map(d => ({
        ...(d.data() as Omit<FirestoreMessage, 'id'>),
        id: d.id,
      })) as FirestoreMessage[];
      onUpdate(msgs);
    },
    err => onError?.(err),
  );
};

// ── Time helpers ──────────────────────────────────────────────────────────────

export const formatConvTime = (ts: Timestamp | null): string => {
  if (!ts) { return ''; }
  const d = ts.toDate();
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (diffDays === 1) { return 'Yesterday'; }
  if (diffDays < 7) {
    return d.toLocaleDateString([], { weekday: 'short' });
  }
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export const formatMsgTime = (ts: Timestamp | null): string => {
  if (!ts) { return ''; }
  return ts.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatDateSeparator = (ts: Timestamp | null): string => {
  if (!ts) { return ''; }
  const d = ts.toDate();
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return `Today, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  if (diffDays === 1) { return 'Yesterday'; }
  return d.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
};
