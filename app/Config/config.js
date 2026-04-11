

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyCWSFjSxkN7j6JuHPzQcxlIGRzRZQAr1YQ",
  authDomain: "postly-36c65.firebaseapp.com",
  projectId: "postly-36c65",
  storageBucket: "postly-36c65.firebasestorage.app",
  messagingSenderId: "446452513766",
  appId: "1:446452513766:web:6e817d0d9df4f2c4be3427",
  measurementId: "G-9Z0ERRR9XM",
};

// ✅ prevent duplicate init (Next.js fix)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ ADD THIS

// ✅ export all
export { auth, db, storage };
export default app;