// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArseUnZK36DXpk07m7OmMccttGih4sfUU",
  authDomain: "how-much-spent.firebaseapp.com",
  projectId: "how-much-spent",
  storageBucket: "how-much-spent.appspot.com",
  messagingSenderId: "399591315715",
  appId: "1:399591315715:web:3ca05f43fb751621fd7136",
  measurementId: "G-VW8EMVLEX6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
