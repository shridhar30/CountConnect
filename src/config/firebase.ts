
// src/config/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfgUFTXX6UgsInUi7nuPS6G4KpRl476RQ",
  authDomain: "count-connect.firebaseapp.com",
  projectId: "count-connect",
  storageBucket: "count-connect.firebasestorage.app",
  messagingSenderId: "454765278480",
  appId: "1:454765278480:web:a635874b3ae166a7122195",
  measurementId: "G-0VLF8YGLD1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
