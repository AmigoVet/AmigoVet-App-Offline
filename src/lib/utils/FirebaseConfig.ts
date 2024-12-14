// Importa las funciones necesarias
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as firebaseAuth from 'firebase/auth';
import { initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFaFiBmC6SOhG8AXnargPecVswqB4h9TI",
  authDomain: "animalia-4c7a6.firebaseapp.com",
  projectId: "animalia-4c7a6",
  storageBucket: "animalia-4c7a6.firebasestorage.app",
  messagingSenderId: "504860170712",
  appId: "1:504860170712:web:ec4c84dc53fbe78aac3aad",
  measurementId: "G-VLKDWTEC1K",
};

// Inicializa Firebase
const appFirebase = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(appFirebase);

const auth = initializeAuth(appFirebase, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage)
});

// Exporta las instancias
export { appFirebase, db, auth };
