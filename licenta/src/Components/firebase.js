import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";



firebase.initializeApp({
  apiKey: "AIzaSyAZR1NEQDeljHSBGoztycO9hrvV4pCudTY",
  authDomain: "instaclone-bac98.firebaseapp.com",
  projectId: "instaclone-bac98",
  storageBucket: "instaclone-bac98.appspot.com",
  messagingSenderId: "64084375581",
  appId: "1:64084375581:web:1a8573f82ad863dc076ef4"
});

const auth = firebase.auth();
const storage = firebase.storage();

export {storage,auth};