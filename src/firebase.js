// const firebaseConfig = {
//     apiKey: "AIzaSyCDmDjMn_dUmA3mKHMz5RiQ_tJroYrRbZQ",
//     authDomain: "todo-application-ded2e.firebaseapp.com",
//     projectId: "todo-application-ded2e",
//     storageBucket: "todo-application-ded2e.appspot.com",
//     messagingSenderId: "39187109945",
//     appId: "1:39187109945:web:8f5a67b7a3570acd7c55e8",
//     measurementId: "G-QG0GPS9EMD"
//   };

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDmDjMn_dUmA3mKHMz5RiQ_tJroYrRbZQ",
  authDomain: "todo-application-ded2e.firebaseapp.com",
  projectId: "todo-application-ded2e",
  storageBucket: "todo-application-ded2e.appspot.com",
  messagingSenderId: "39187109945",
  appId: "1:39187109945:web:8f5a67b7a3570acd7c55e8",
  measurementId: "G-QG0GPS9EMD",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
