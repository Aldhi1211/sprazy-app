import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './config';
import { createUserProfile, getUserProfile } from './firestoreService';

export const registerWithEmail = async (
  email: string,
  password: string,
  username: string,
) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(credential.user.uid, { email, username });
  return credential.user;
};

export const loginWithEmail = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

export const logout = async () => {
  await signOut(auth);
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const getCurrentUser = (): User | null => auth.currentUser;

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
