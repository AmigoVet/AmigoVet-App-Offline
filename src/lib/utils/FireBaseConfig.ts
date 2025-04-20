import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import * as firebaseAuth from 'firebase/auth';


// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCirGpvJs-ofYdyVKBt7A6ybhE9xFaWH7Q',
  authDomain: 'amigovet-c7e78.firebaseapp.com',
  projectId: 'amigovet-c7e78',
  storageBucket: 'amigovet-c7e78.firebasestorage.app',
  messagingSenderId: '269835825028',
  appId: '1:269835825028:web:dc743e3601ca9e79f8b7d1',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP)
