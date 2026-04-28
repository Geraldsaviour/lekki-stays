// Firebase Configuration
// This file contains your Firebase project configuration
// Get these values from Firebase Console > Project Settings > General

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA8moQvtYRObBsuNlU52uN9nDIXCCq0Mfs",
  authDomain: "lekki-stays.firebaseapp.com",
  projectId: "lekki-stays",
  storageBucket: "lekki-stays.firebasestorage.app",
  messagingSenderId: "879597470658",
  appId: "1:879597470658:web:9dce2da8c0413ba01e0c5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export for use in your application
export { app, firebaseConfig };
export default firebaseConfig;
