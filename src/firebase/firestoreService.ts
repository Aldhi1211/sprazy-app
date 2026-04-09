import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

export interface UserProfile {
  email: string;
  username: string;
  selectedLanguage?: string;
  knowledgeLevel?: string;
  studyReason?: string;
  languageLevel?: string;
  dailyGoal?: number;
  isPremium?: boolean;
  onboardingComplete?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

/** Mirror search-relevant fields to publicProfiles so username search works */
const syncPublicProfile = async (uid: string, data: Partial<UserProfile>) => {
  try {
    const initials = (data.username ?? '??').slice(0, 2).toUpperCase();
    const COLORS = ['#22a855', '#f97316', '#8b5cf6', '#0891b2', '#e11d48'];
    const hash = uid.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const avatarColor = COLORS[hash % COLORS.length];

    const pub: Record<string, any> = {
      uid,
      initials,
      avatarColor,
      updatedAt: serverTimestamp(),
    };
    if (data.username)      { pub.username = data.username.toLowerCase(); }
    if (data.languageLevel) { pub.level = data.languageLevel; }

    await setDoc(doc(db, 'publicProfiles', uid), pub, { merge: true });
  } catch { /* silent — public profile sync is non-critical */ }
};

export const createUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  await setDoc(doc(db, 'users', uid), {
    ...data,
    isPremium: false,
    onboardingComplete: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await syncPublicProfile(uid, data);
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  await setDoc(doc(db, 'users', uid), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
  await syncPublicProfile(uid, data);
};
