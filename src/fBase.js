import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDmi7B-ySxSKrKYD0v91U6foiDP6b23p9U",
    authDomain: "jwitter-45b06.firebaseapp.com",
    projectId: "jwitter-45b06",
    storageBucket: "jwitter-45b06.appspot.com",
    messagingSenderId: "549000357963",
    appId: "1:549000357963:web:deae5addb05db9bb1a05ce",
    measurementId: "G-W0QKE7V0N1"
  };


firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = firebase.storage();

