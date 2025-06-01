// // import { initializeApp } from "firebase/app";
// import firebase from "firebase/compat/app";

// import {getAuth} from 'firebase/auth'
// import 'firebase/compat/firestore'
// import 'firebase/compat/auth'


// // Your web app's Firebase configuration
// const firebaseConfig = {

//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// const app = firebase.initializeApp(firebaseConfig);


// export const auth = getAuth(app)
// export const db = app.firestore()


// Using Firebase v8 compatibility layer
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';       
import 'firebase/compat/firestore';  

console.log("Attempting to initialize Firebase with API Key:", import.meta.env.VITE_FIREBASE_API_KEY);



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;

// Initialize Firebase
// Check if Firebase has already been initialized to prevent errors during hot reloads
if (!firebase.apps.length) {
  try {
    app = firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully!");
  } catch (error) {
    console.error("FIREBASE INITIALIZATION FAILED:", error);

  }
} else {
  app = firebase.app(); // Get the already initialized app
  console.log("Firebase was already initialized.");
}


export const auth = firebase.auth();
export const db = firebase.firestore();

