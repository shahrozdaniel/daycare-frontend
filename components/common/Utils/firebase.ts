import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getMessaging,getToken } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyCbqk_0UfbOhLRywEJjL-eVM2_w1J0byAY",
  authDomain: "cooddle-b0900.firebaseapp.com",
  projectId: "cooddle-b0900",
  storageBucket: "cooddle-b0900.appspot.com",
  messagingSenderId: "163144146983",
  appId: "1:163144146983:web:64444dd45626758ba62e02",
  measurementId: "G-ZQK3XGH426"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db= getFirestore(app)
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;
export default messaging;





