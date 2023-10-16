// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  apiKey: "AIzaSyAX7-yDIk5KIHsYE-8W0fwC3Ya6zK0bUmM",
  authDomain: "englishpet-1db19.firebaseapp.com",
  projectId: "englishpet-1db19",
  storageBucket: "englishpet-1db19.appspot.com",
  messagingSenderId: "422593476442",
  appId: "1:422593476442:web:97ec39cf6a120f96826563",
  measurementId: "G-23WYM7P64P"
};

console.log(firebaseConfig)

// Initialize Firebase
let firebase_app = initializeApp(firebaseConfig);

export default firebase_app;