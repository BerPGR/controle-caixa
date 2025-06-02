// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR5y1Vqt4BWZVK0UFhI6Z7IbaTzBB2hWU",
  authDomain: "caixa-467c5.firebaseapp.com",
  projectId: "caixa-467c5",
  storageBucket: "caixa-467c5.firebasestorage.app",
  messagingSenderId: "416482415181",
  appId: "1:416482415181:web:0811447f2b1b5176bb4204"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const auth = getAuth(app)
//const db = getFirestore(app)
