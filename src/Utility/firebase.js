

// Using Firebase v8 compatibility layer
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';       // For firebase.auth()
import 'firebase/compat/firestore';  // For firebase.firestore()


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
 
  }
} else {
  app = firebase.app(); // Get the already initialized default app
  console.log("Firebase was already initialized. Using existing app.");
}

// Export Firebase services
if (app) {
  authInstance = firebase.auth(app); // Or simply firebase.auth() if you prefer default app context
  dbInstance = firebase.firestore(app); // Or simply firebase.firestore()
} else {
 
  console.error("Firebase app object is not available. Auth and Firestore services cannot be initialized.");

}

export const auth = authInstance;
export const db = dbInstance;
export { app }; // Export the app instance if needed elsewhere