// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuaHyoJRE-vCTpuiB0Ev8_yQWUKZX8wyA",
  authDomain: "teamone-hackathon-2023.firebaseapp.com",
  projectId: "teamone-hackathon-2023",
  storageBucket: "teamone-hackathon-2023.appspot.com",
  messagingSenderId: "208996617684",
  appId: "1:208996617684:web:0085582f40d161a029da41",
  measurementId: "G-J96YBWHY1K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const fs = getFirestore();
