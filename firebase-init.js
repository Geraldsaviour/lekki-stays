// Firebase Initialization
// This file initializes Firebase services for the frontend

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Import your Firebase configuration
import firebaseConfig from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Export Firebase services
export { app, db, auth, collection, addDoc, getDocs, query, where, orderBy, Timestamp, signInWithEmailAndPassword, onAuthStateChanged, signOut };
