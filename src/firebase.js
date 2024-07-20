// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-sLR9KBweSa8l9QOQGVXNeQH7hDBUyGA",
  authDomain: "apartments-51f57.firebaseapp.com",
  projectId: "apartments-51f57",
  storageBucket: "apartments-51f57.appspot.com",
  messagingSenderId: "731663978236",
  appId: "1:731663978236:web:a355ca88e9db0515a81179",
  measurementId: "G-VC63V1KRY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };