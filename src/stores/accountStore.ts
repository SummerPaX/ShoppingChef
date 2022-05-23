import { acceptHMRUpdate, defineStore } from "pinia";
import { auth, db } from "../firebase/config";
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
import { doc, collection, getDoc, onSnapshot, DocumentReference, DocumentData, CollectionReference, setDoc, addDoc, Timestamp } from "firebase/firestore";
import { async } from "@firebase/util";

onAuthStateChanged(auth, (_user) => {
	const account = accountStore();
	account.user = _user;
	account.authenticated = _user != null;
	if (_user)
		getDoc(account.getUserDoc).then((d) => {
			if (!d.exists()) {
				Promise.all([
					setDoc(account.getUserDoc, { fav: [] }),
					setDoc(doc(account.getCalendarCol, "2000-02-02"), { Breakfast: "", Lunch: "", Dinner: "", Snacks: [] }),
					addDoc(account.getListsCol, {
						name: "",
						recipes: [],
						singleItems: [],
						creationDate: Timestamp.fromDate(new Date()),
						completionDate: Timestamp.fromDate(new Date("January 1, 1970")),
					}),
				]).then(() => account.subscribeToFirebase());
			} else account.subscribeToFirebase();
		});
});

export const accountStore = defineStore("accountStore", {
	state: () => ({
		authenticated: false,
		user: null as User | null | undefined,
		unsub: {
			userData: () => {},
			calendarData: () => {},
			listsData: () => {},
		},
		userdata: null as any,
		calendardata: {} as any,
		listsdata: {} as any,
	}),
	getters: {
		getUser(): User | null | undefined {
			return this.user;
		},
		getUserDoc(): DocumentReference<DocumentData> {
			return doc(db, "User", this.user?.uid ?? "");
		},
		getCalendarCol(): CollectionReference<DocumentData> {
			return collection(db, "User", this.user?.uid ?? "", "Calendar");
		},
		getListsCol(): CollectionReference<DocumentData> {
			return collection(db, "User", this.user?.uid ?? "", "Lists");
		},
	},
	actions: {
		//Subscribe to Firebase Data
		subscribeToUserData() {
			if (!this.user) return;
			try {
				this.unsub["userData"] = onSnapshot(
					this.getUserDoc,
					(d) => {
						this.userdata = d.data();
						console.log(this.userdata);
					},
					(err) => console.log(err)
				);
			} catch (err) {
				console.log(err);
			}
		},
		subscribeToUserCalendar() {
			if (!this.user) return;
			try {
				this.unsub["calendarData"] = onSnapshot(
					this.getCalendarCol,
					(d) => {
						d.docs.forEach((doc) => {
							this.calendardata[doc.id] = doc.data();
						});
						console.log(this.calendardata);
					},
					(err) => console.log(err)
				);
			} catch (err) {
				console.log(err);
			}
		},
		subscribeToUserLists() {
			if (!this.user) return;
			try {
				this.unsub["listsData"] = onSnapshot(
					this.getListsCol,
					(d) => {
						d.docs.forEach((doc) => {
							this.listsdata[doc.id] = doc.data();
						});
						console.log(this.listsdata);
					},
					(err) => console.log(err)
				);
			} catch (err) {
				console.log(err);
			}
		},
		subscribeToFirebase() {
			this.subscribeToUserData();
			this.subscribeToUserCalendar();
			this.subscribeToUserLists();
		},
		unsubFromFirebase() {
			this.unsub["calendarData"]();
			this.unsub["userData"]();
			this.unsub["listsData"]();
			this.userdata = null;
			this.calendardata = {};
			this.listsdata = {};
		},
		//Log in Stuff
		async standardSignIn(email: string, password: string) {
			try {
				const res = await signInWithEmailAndPassword(auth, email, password);
				if (!res) throw new Error("Could not complete signin");
			} catch (err) {
				console.error(err);
			}
		},
		async googleSignIn() {
			const provider = new GoogleAuthProvider();

			const auth = getAuth();
			signInWithPopup(auth, provider).catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
		},
		async createUser(email: string, password: string) {
			try {
				const res = await createUserWithEmailAndPassword(auth, email, password);
				if (!res) throw new Error("Could not complete signup");
			} catch (err) {
				console.error(err);
			}
		},
		async signOut() {
			this.unsubFromFirebase();
			signOut(auth);
		},
		async deleteUser() {
			this.unsubFromFirebase();
			deleteUser(auth.currentUser as User);
		},
	},
});
// make sure to pass the right store definition
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(accountStore, import.meta.hot));
}
