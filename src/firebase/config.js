// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDrySZNH1vK0C3QZ_qlUW1GCqNdDnJCFE",
  authDomain: "codegalaxy-a9730.firebaseapp.com",
  projectId: "codegalaxy-a9730",
  storageBucket: "codegalaxy-a9730.firebasestorage.app",
  messagingSenderId: "625963327145",
  appId: "1:625963327145:web:b4f2f0a8e90c2988cf93b8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
