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


// src/firebase.js (or your Firebase configuration file)

// Using Firebase v8 compatibility layer
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';       // For firebase.auth()
import 'firebase/compat/firestore';  // For firebase.firestore()

// ---  beurre ---
// --- STEP 1: CRITICAL DEBUGGING - CHECK THE API KEY AND OTHER ENV VARS ---
// The console logs below will show you what values are being loaded from your .env file.
// Open your browser's developer console (usually F12) to see this output when your app loads.

console.log("Firebase Env Vars from .env file:");
console.log("VITE_FIREBASE_API_KEY:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("VITE_FIREBASE_AUTH_DOMAIN:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log("VITE_FIREBASE_PROJECT_ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
// Add logs for other VITE_FIREBASE_... variables if you suspect they are also issues.

// IF ANY OF THE LOGGED VALUES (ESPECIALLY VITE_FIREBASE_API_KEY) ARE 'undefined' OR WRONG:
// 1.  CHECK YOUR `.env` FILE:
//     -   It MUST be in the VERY ROOT of your Vite project (same level as `package.json`, `vite.config.js`).
//     -   It MUST be named `.env` (or `.env.local`, `.env.development` etc. - Vite specific).
//     -   Variable names MUST start with `VITE_` (e.g., `VITE_FIREBASE_API_KEY`).
//     -   The values should be correct, e.g., `VITE_FIREBASE_API_KEY="AIzaSyYourActualApiKey"`
//
// 2.  RESTART YOUR VITE DEV SERVER:
//     -   After creating or ANY change to your `.env` file, you MUST stop (`Ctrl+C`)
//         and restart your Vite development server (e.g., `npm run dev` or `yarn dev`).
//         Vite only loads these variables on startup.
//
// 3.  VERIFY VALUES IN FIREBASE CONSOLE:
//     -   Go to console.firebase.google.com -> Your Project -> Project Settings (gear icon) -> General tab.
//     -   Scroll to "Your apps" and select your web app.
//     -   Compare ALL `firebaseConfig` values there with what's in your `.env` file.
// --- End STEP 1 ---

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let authInstance;
let dbInstance;

// Initialize Firebase
// Check if Firebase has already been initialized to prevent errors (e.g., during hot module replacement)
if (!firebase.apps.length) {
  try {
    // Check if the apiKey is actually present before initializing
    if (!firebaseConfig.apiKey) {
      throw new Error("Firebase API Key is missing. Check your .env file and Vite server restart.");
    }
    app = firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully!");
  } catch (error) {
    console.error("FIREBASE INITIALIZATION FAILED:", error.message);
    console.error("Full error object:", error);
    // If you still get "auth/invalid-api-key" here, it means:
    //   a) The API key being used (check console.log above) IS STILL WRONG.
    //   b) The API key IS CORRECT, but it's restricted in Google Cloud Console:
    //      - Go to console.cloud.google.com -> APIs & Services -> Credentials.
    //      - Select your project. Find the API Key used by Firebase.
    //      - Check "Application restrictions" (HTTP referrers):
    //          - Ensure your dev domain (e.g., `http://localhost:5173` or your Vite port) is listed.
    //          - For testing, temporarily set to "None".
    //      - Check "API restrictions":
    //          - Ensure "Identity Toolkit API" (for Auth) and "Cloud Firestore API" (for Firestore)
    //            and "Firebase Installations API" are allowed.
    //          - For testing, temporarily set to "Don't restrict key".
    //      - *Changes to Google Cloud API key restrictions can take a few minutes to propagate.*
    //
    // If the error is "Firebase: No Firebase App '[DEFAULT]' has been created - call Firebase App.initializeApp()",
    // it means initializeApp failed silently or was skipped, likely due to a missing API key earlier.
  }
} else {
  app = firebase.app(); // Get the already initialized default app
  console.log("Firebase was already initialized. Using existing app.");
}

// Export Firebase services
// It's safer to initialize these after confirming app initialization
if (app) {
  authInstance = firebase.auth(app); // Or simply firebase.auth() if you prefer default app context
  dbInstance = firebase.firestore(app); // Or simply firebase.firestore()
} else {
  // Fallback or error handling if app couldn't be initialized
  // This prevents errors if `app` is undefined when trying to use `auth` or `db`
  console.error("Firebase app object is not available. Auth and Firestore services cannot be initialized.");
  // You might want to throw an error here or provide mock objects depending on your app's needs
  // For now, we'll leave them potentially undefined, which will cause errors downstream if app init failed.
}

export const auth = authInstance;
export const db = dbInstance;
export { app }; // Export the app instance if needed elsewhere