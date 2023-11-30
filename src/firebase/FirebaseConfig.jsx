// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfWTxHov1T6yWngkKMnJqEGMdmVEsNYnc",
  authDomain: "blogproject-9e97b.firebaseapp.com",
  projectId: "blogproject-9e97b",
  storageBucket: "blogproject-9e97b.appspot.com",
  messagingSenderId: "1080457191547",
  appId: "1:1080457191547:web:be7334261425ca2dfdc2de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { fireDB, auth, storage };
