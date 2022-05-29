import { acceptHMRUpdate, defineStore } from "pinia";
import { auth, db } from "../firebase/config";
import { Temporal } from "@js-temporal/polyfill";
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
import {
	doc,
	collection,
	getDoc,
	onSnapshot,
	DocumentReference,
	DocumentData,
	CollectionReference,
	setDoc,
	addDoc,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import { alertType } from "../types/constants";
import { recipeStore } from "./recipeStore";
import Recipe from "../types/recipe";
import { stringify } from "@firebase/util";

onAuthStateChanged(auth, (_user) => {
	const account = accountStore();
	account.user = _user;
	account.authenticated = _user != null;
	if (_user)
		getDoc(account.getUserDoc).then((d) => {
			if (!d.exists()) {
				Promise.all([
					setDoc(account.getUserDoc, { fav: {} }),
					setDoc(doc(account.getCalendarCol, "2000-02-02"), { Breakfast: "", Lunch: "", Dinner: "", Snacks: [] }),
					addDoc(account.getListsCol, {
						name: "",
						recipes: [],
						singleItems: [],
						creationDate: Timestamp.fromDate(new Date()),
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
		calendardata: new Map<string, any>(),
		listsdata: {} as any,
		sendAlert: (message: string, type: string) => {},
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
		getFavs(): Map<string, Recipe> {
			if (!this.userdata?.fav) return new Map<string, Recipe>();
			const map = new Map<string, Recipe>();
			Object.keys(this.userdata?.fav).map((key) => {
				map.set(key, this.userdata?.fav[key]);
			});
			return map;
		},
	},
	actions: {
		//Update UserDocs
		addFav(recipe: Recipe) {
			try {
				const id = recipeStore().getIdFromUri(recipe.uri);
				this.userdata.fav[id] = recipe;

				setDoc(this.getUserDoc, { fav: this.userdata.fav }, { merge: true });
			} catch (err) {
				this.sendAlert(err + "", alertType.ERROR);
				console.log(err);
			}
		},
		removeFav(uri: string) {
			delete this.userdata.fav[recipeStore().getIdFromUri(uri)];
			setDoc(this.getUserDoc, { fav: this.userdata.fav }, { merge: true });
		},
		isFav(uri: string): boolean {
			return this.userdata.fav.hasOwnProperty(recipeStore().getIdFromUri(uri));
		},
		//Update Calendar
		addToCalendar(day: Temporal.PlainDate, mealType: string, recipe: Recipe | null) {
			const entry = {} as any;
			entry[mealType] = recipe;
			setDoc(doc(this.getCalendarCol, day.toString()), entry, { merge: true });
		},
		//TODO: Update Lists

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
					(err) => this.sendAlert(err + "", alertType.ERROR)
				);
			} catch (err) {
				this.sendAlert(err + "", alertType.ERROR);
			}
		},
		subscribeToUserCalendar() {
			if (!this.user) return;
			try {
				this.unsub["calendarData"] = onSnapshot(
					this.getCalendarCol,
					(d) => {
						d.docs.forEach((doc) => {
							this.calendardata.set(doc.id, doc.data());
						});
						console.log(this.calendardata);
					},
					(err) => this.sendAlert(err + "", alertType.ERROR)
				);
			} catch (err) {
				this.sendAlert(err + "", alertType.ERROR);
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
					(err) => this.sendAlert(err + "", alertType.ERROR)
				);
			} catch (err) {
				this.sendAlert(err + "", alertType.ERROR);
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
			this.calendardata = new Map();
			this.listsdata = {};
		},
		//Log in Stuff
		async standardSignIn(email: string, password: string) {
			try {
				const res = await signInWithEmailAndPassword(auth, email, password);
				if (!res) throw new Error("Could not complete signin");
			} catch (err) {
				this.sendAlert(err + "", alertType.ERROR);
			}
		},
		async googleSignIn() {
			const provider = new GoogleAuthProvider();

			const auth = getAuth();
			signInWithPopup(auth, provider).catch((error) => {
				// // Handle Errors here.
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// // The email of the user's account used.
				// const email = error.email;
				// // The AuthCredential type that was used.
				// const credential = GoogleAuthProvider.credentialFromError(error);
				this.sendAlert(error.message, alertType.ERROR);
			});
		},
		async createUser(email: string, password: string) {
			try {
				const res = await createUserWithEmailAndPassword(auth, email, password);
				if (!res) throw new Error("Could not complete signup");
			} catch (err) {
				this.sendAlert(err + "", alertType.ERROR);
			}
		},
		async signOut() {
			this.unsubFromFirebase();
			signOut(auth);
			recipeStore().cleanStore();
		},
		async deleteUser() {
			this.unsubFromFirebase();
			deleteUser(auth.currentUser as User);
			recipeStore().cleanStore();
		},
	},
});
// make sure to pass the right store definition
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(accountStore, import.meta.hot));
}
