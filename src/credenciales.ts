// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFaFiBmC6SOhG8AXnargPecVswqB4h9TI",
  authDomain: "animalia-4c7a6.firebaseapp.com",
  projectId: "animalia-4c7a6",
  storageBucket: "animalia-4c7a6.firebasestorage.app",
  messagingSenderId: "504860170712",
  appId: "1:504860170712:web:ec4c84dc53fbe78aac3aad",
  measurementId: "G-VLKDWTEC1K"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
export default appFirebase;