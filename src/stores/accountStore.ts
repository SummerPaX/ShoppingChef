import { defineStore } from "pinia";
import { auth } from "../firebase/config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	onAuthStateChanged,
	User,
	deleteUser,
	signInWithPopup,
	getAuth,
} from "firebase/auth";
import { async } from "@firebase/util";
import { useRoute } from "vue-router";

onAuthStateChanged(auth, (_user) => {
	const account = accountStore();
	account.authenticated = _user != null;
});

export const accountStore = defineStore("accountStore", {
	state: () => ({
		authenticated: false,
	}),
	getters: {
		getUser(): User | null {
			return auth.currentUser;
		},
	},
	actions: {
		async standardSignIn(email: string, password: string) {
			try {
				const res = await signInWithEmailAndPassword(auth, email, password);
				if (!res) throw new Error("Could not complete signin");
			} catch (err) {
				console.error(err);
			}
		},
		async deleteUser() {
			console.log("Deleting " + auth.currentUser);

			deleteUser(auth.currentUser as User);
		},
		async signOut() {
			return await signOut(auth);
		},
		async createUser(email: string, password: string) {
			try {
				const res = await createUserWithEmailAndPassword(auth, email, password);
				if (!res) throw new Error("Could not complete signup");
			} catch (err) {
				console.error(err);
			}
		},
		async googleSignIn() {
			const provider = new GoogleAuthProvider();

			const auth = getAuth();
			signInWithPopup(auth, provider)
				.then((result) => {})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.email;
					// The AuthCredential type that was used.
					const credential = GoogleAuthProvider.credentialFromError(error);
					// ...
				});
		},
	},
});
