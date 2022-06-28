import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import apiKey from "./apiKey.json"

initializeApp(apiKey);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
