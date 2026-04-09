import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PublicUserProfile {
  uid: string;
  username: string;
  displayName?: string;
  initials: string;
  avatarColor: string;
  level?: string;
  location?: string;
  streak?: number;
  xp?: number;
  lessonsCount?: number;
  coursesCount?: number;
  friendsCount?: number;
}

export interface FriendEntry {
  friendUid: string;
  addedAt: Timestamp | null;
}

export interface FriendRequest {
  id: string;
  fromUid: string;
  fromUsername: string;
  toUid: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Timestamp | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const AVATAR_COLORS = ['#22a855', '#f97316', '#8b5cf6', '#0891b2', '#e11d48', '#16a34a', '#d97706'];

export const getAvatarColor = (uid: string): string => {
  const hash = uid.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

export const getInitials = (username: string, displayName?: string): string => {
  const name = displayName || username || '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

// ── Update own public profile ─────────────────────────────────────────────────

/** Call this after onboarding or whenever profile data changes. */
export const updatePublicProfile = async (
  uid: string,
  data: Partial<Omit<PublicUserProfile, 'uid'>>,
) => {
  await setDoc(
    doc(db, 'publicProfiles', uid),
    { uid, ...data, updatedAt: serverTimestamp() },
    { merge: true },
  );
};

// ── Search ────────────────────────────────────────────────────────────────────

export const searchUserByUsername = async (
  username: string,
  currentUid: string,
): Promise<PublicUserProfile | null> => {
  const clean = username.replace(/^@/, '').toLowerCase().trim();
  if (!clean) { return null; }

  // 1. Search publicProfiles (fastest, doesn't need elevated rules)
  try {
    const q = query(collection(db, 'publicProfiles'), where('username', '==', clean));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const data = snap.docs[0].data() as PublicUserProfile;
      if (data.uid === currentUid) { return null; }
      return {
        ...data,
        initials: data.initials || getInitials(data.username, data.displayName),
        avatarColor: data.avatarColor || getAvatarColor(data.uid),
      };
    }
  } catch { /* publicProfiles might be empty on first run, fall through */ }

  // 2. Fallback: search users collection directly
  //    Requires Firestore rule: allow read: if request.auth != null (on /users/{userId})
  const q2 = query(collection(db, 'users'), where('username', '==', clean));
  const snap2 = await getDocs(q2);
  if (!snap2.empty) {
    const d = snap2.docs[0];
    if (d.id === currentUid) { return null; }
    const raw = d.data();
    return {
      uid: d.id,
      username: raw.username,
      displayName: raw.displayName,
      initials: getInitials(raw.username, raw.displayName),
      avatarColor: getAvatarColor(d.id),
      level: raw.languageLevel,
      location: raw.location,
      streak: raw.streak ?? 0,
      xp: raw.xp ?? 0,
      lessonsCount: raw.lessonsCount ?? 0,
      coursesCount: raw.coursesCount ?? 0,
      friendsCount: raw.friendsCount ?? 0,
    };
  }

  return null;
};

export const getUserPublicProfile = async (
  uid: string,
): Promise<PublicUserProfile | null> => {
  // Try publicProfiles first
  const snap = await getDoc(doc(db, 'publicProfiles', uid));
  if (snap.exists()) {
    const data = snap.data() as PublicUserProfile;
    return {
      ...data,
      initials: data.initials || getInitials(data.username, data.displayName),
      avatarColor: data.avatarColor || getAvatarColor(uid),
    };
  }

  // Fallback to users collection
  const snap2 = await getDoc(doc(db, 'users', uid));
  if (snap2.exists()) {
    const raw = snap2.data();
    return {
      uid,
      username: raw.username,
      displayName: raw.displayName,
      initials: getInitials(raw.username, raw.displayName),
      avatarColor: getAvatarColor(uid),
      level: raw.languageLevel,
      location: raw.location,
      streak: raw.streak ?? 0,
      xp: raw.xp ?? 0,
      lessonsCount: raw.lessonsCount ?? 0,
      coursesCount: raw.coursesCount ?? 0,
      friendsCount: raw.friendsCount ?? 0,
    };
  }
  return null;
};

// ── Friend Requests ───────────────────────────────────────────────────────────

const requestId = (fromUid: string, toUid: string) => `${fromUid}_${toUid}`;

export const sendFriendRequest = async (
  fromUid: string,
  fromUsername: string,
  toUid: string,
) => {
  const id = requestId(fromUid, toUid);
  await setDoc(doc(db, 'friendRequests', id), {
    id,
    fromUid,
    fromUsername,
    toUid,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
};

export const checkFriendRequestStatus = async (
  fromUid: string,
  toUid: string,
): Promise<'none' | 'pending' | 'accepted'> => {
  const snap = await getDoc(doc(db, 'friendRequests', requestId(fromUid, toUid)));
  if (snap.exists()) {
    return snap.data().status as 'pending' | 'accepted';
  }
  // Also check if already friends
  const friendSnap = await getDoc(doc(db, 'users', fromUid, 'friends', toUid));
  if (friendSnap.exists()) { return 'accepted'; }
  return 'none';
};

export const getIncomingRequests = async (uid: string): Promise<FriendRequest[]> => {
  try {
    // Query all pending requests where toUid == uid
    const q = query(
      collection(db, 'friendRequests'),
      where('toUid', '==', uid),
      where('status', '==', 'pending'),
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as FriendRequest);
  } catch {
    return [];
  }
};

export const acceptFriendRequest = async (
  reqId: string,
  myUid: string,   // the acceptor (receiver)
  friendUid: string, // the sender
) => {
  const now = serverTimestamp();
  // Only write to OWN friends subcollection (permissions allow this)
  // The sender's side will be synced when they next open the app via syncAcceptedRequests()
  await Promise.all([
    setDoc(doc(db, 'users', myUid, 'friends', friendUid), {
      friendUid,
      addedAt: now,
    }),
    setDoc(doc(db, 'friendRequests', reqId), { status: 'accepted' }, { merge: true }),
  ]);
};

export const declineFriendRequest = async (reqId: string) => {
  await deleteDoc(doc(db, 'friendRequests', reqId));
};

/**
 * Called by the SENDER on app load.
 * Finds their sent requests that were accepted, then adds those users
 * to their own friends list (since acceptor only writes their own side).
 */
export const syncAcceptedRequests = async (uid: string): Promise<void> => {
  try {
    const q = query(
      collection(db, 'friendRequests'),
      where('fromUid', '==', uid),
      where('status', '==', 'accepted'),
    );
    const snap = await getDocs(q);
    if (snap.empty) { return; }

    await Promise.all(
      snap.docs.map(async d => {
        const req = d.data();
        const friendRef = doc(db, 'users', uid, 'friends', req.toUid);
        const exists = await getDoc(friendRef);
        if (!exists.exists()) {
          await setDoc(friendRef, {
            friendUid: req.toUid,
            addedAt: serverTimestamp(),
          });
        }
      }),
    );
  } catch { /* silent */ }
};

// ── Friends List ──────────────────────────────────────────────────────────────

export const getFriends = async (uid: string): Promise<PublicUserProfile[]> => {
  const snap = await getDocs(collection(db, 'users', uid, 'friends'));
  const friendUids = snap.docs.map(d => d.data().friendUid as string);
  if (friendUids.length === 0) { return []; }

  const profiles = await Promise.all(friendUids.map(fid => getUserPublicProfile(fid)));
  return profiles.filter((p): p is PublicUserProfile => p !== null);
};

export const removeFriend = async (myUid: string, friendUid: string) => {
  await Promise.all([
    deleteDoc(doc(db, 'users', myUid, 'friends', friendUid)),
    deleteDoc(doc(db, 'users', friendUid, 'friends', myUid)),
  ]);
};
