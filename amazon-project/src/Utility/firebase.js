// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

import {getAuth} from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIudEQ9QVYQx7sTaEQnlITwR8Nmm73d7s",
  authDomain: "clone-bb5c7.firebaseapp.com",
  projectId: "clone-bb5c7",
  storageBucket: "clone-bb5c7.firebasestorage.app",
  messagingSenderId: "462415576286",
  appId: "1:462415576286:web:5cbdebf02860c965c3164f"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const db = app.firestore()
