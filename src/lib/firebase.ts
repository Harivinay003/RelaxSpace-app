import { initializeApp, getApps } from 'firebase/app';
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

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
