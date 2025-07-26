import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "serenescape-1q8fb",
  "appId": "1:473114562091:web:5aea78f17005cdc4dea46e",
  "storageBucket": "serenescape-1q8fb.firebasestorage.app",
  "apiKey": "AIzaSyD8HX9vM_DGZwdHzCU-ig9n_ZswbZqcAIs",
  "authDomain": "serenescape-1q8fb.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "473114562091"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
