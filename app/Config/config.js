import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWSFjSxkN7j6JuHPzQcxlIGRzRZQAr1YQ",
  authDomain: "postly-36c65.firebaseapp.com",
  projectId: "postly-36c65",
  storageBucket: "postly-36c65.firebasestorage.app",
  messagingSenderId: "446452513766",
  appId: "1:446452513766:web:6e817d0d9df4f2c4be3427",
  measurementId: "G-9Z0ERRR9XM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;