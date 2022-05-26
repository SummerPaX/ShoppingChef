import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import apiKey from "./apiKey.json"

const firebaseConfig = apiKey;

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
