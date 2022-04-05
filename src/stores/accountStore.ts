import { defineStore } from "pinia";
import { auth } from "../firebase/config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
  onAuthStateChanged,
  User, deleteUser
} from "firebase/auth";
import { async } from "@firebase/util";
import { useRoute } from "vue-router";


onAuthStateChanged(auth, (_user) => {
  const account = accountStore();
  account.authenticated = _user != null;
})

export const accountStore = defineStore("accountStore", {
	state: () => ({
		authenticated: false,
	}),
  getters: {
    getUser(): User | null{
      return auth.currentUser;
    }
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
	},
});
