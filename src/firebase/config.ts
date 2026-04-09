import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ─── GANTI DENGAN CREDENTIALS FIREBASE ANDA ──────────────────────────────────
const firebaseConfig = {
  apiKey: 'AIzaSyDMv0SNJm7rgdROCTYoIv3BBomO3rhqrMw',
  authDomain: 'sprazy-app.firebaseapp.com',
  projectId: 'sprazy-app',
  storageBucket: 'sprazy-app.firebasestorage.app',
  messagingSenderId: '1084856535581',
  appId: '1:1084856535581:web:73f8fce014620210d854f4',
};
// ─────────────────────────────────────────────────────────────────────────────

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
