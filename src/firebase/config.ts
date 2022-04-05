import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAnhQn_QvX6redkQxWigTLs0KybhI38gmQ",
	authDomain: "shopping-chef-6dfa9.firebaseapp.com",
	projectId: "shopping-chef-6dfa9",
	storageBucket: "shopping-chef-6dfa9.appspot.com",
	messagingSenderId: "918225214273",
	appId: "1:918225214273:web:7074296b0d9345ff31dfc0",
	measurementId: "G-NDCDJG63EZ"
  };

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
