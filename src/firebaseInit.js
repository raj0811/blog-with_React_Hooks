// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIufT0jWyZ1EPEUQrMij95K_iHixz5GW4",
  authDomain: "hooksblog-5cb99.firebaseapp.com",
  projectId: "hooksblog-5cb99",
  storageBucket: "hooksblog-5cb99.appspot.com",
  messagingSenderId: "935828312861",
  appId: "1:935828312861:web:b2d098a9a2a35b138f87f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)