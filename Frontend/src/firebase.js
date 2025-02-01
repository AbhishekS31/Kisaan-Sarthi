import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Firebase Auth (optional if needed for user actions)
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBRIkZUefMBs68Mr2wI0-cSud8Bog-Lefc",
    authDomain: "kisansarthi-afac5.firebaseapp.com",
    projectId: "kisansarthi-afac5",
    storageBucket: "kisansarthi-afac5.firebasestorage.app",
    messagingSenderId: "1037951831914",
    appId: "1:1037951831914:web:9d191374a5644e558b1f13",
    measurementId: "G-8GJ6KKTDQF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };