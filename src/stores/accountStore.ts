import { auth, db } from "../firebase/config";
import { acceptHMRUpdate, defineStore } from "pinia";
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
import { doc, collection, getDoc, onSnapshot, DocumentReference, DocumentData, CollectionReference, setDoc, addDoc, Timestamp } from "firebase/firestore";
import { alertType } from "../types/constants";
import { recipeStore } from "./recipeStore";
import Recipe from "../types/recipe";
import Shoppinglist from "../types/shoppinglist";
import { stringifyQuery } from "vue-router";

onAuthStateChanged(auth, (_user) => {
	const account = accountStore();
	account.user = _user;
	account.authenticated = _user != null;
	if (!account.authenticated) return;

	//get UserDoc
	getDoc(account.getUserDoc).then((d) => {
		if (d.exists()) {
			account.subscribeToFirebase();
			return;
		}
		//create Userdokument in the DB if it doesn't exist
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
	});
});

export const accountStore = defineStore("accountStore", {
	state: () => ({
		authenticated: false,
		user: null as User | null | undefined,
		userdata: null as any,
		calendardata: new Map<string, any>(),
		listsdata: new Map<string, Shoppinglist>() as any,
		unsub: {
			userData: () => {},
			calendarData: () => {},
			listsData: () => {},
		},
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

				setDoc(this.getUserDoc, { fav: this.userdata.fav }, { merge: true }).catch((err) => {
					this.sendAlert(err + "", alertType.ERROR);
				});
			} catch (err) {
				this.sendAlert(err + "", alertType.ERROR);
				console.log(err);
			}
		},
		removeFav(uri: string) {
			delete this.userdata.fav[recipeStore().getIdFromUri(uri)];

			setDoc(this.getUserDoc, { fav: this.userdata.fav });
			console.log(uri);
		},
		isFav(uri: string): boolean {
			const id = recipeStore().getIdFromUri(uri);
			return this.userdata.fav.hasOwnProperty(id);
		},
		//Update Calendar
		addToCalendar(day: Temporal.PlainDate, mealType: string, recipe: Recipe | null) {
			const entry = {} as any;
			entry[mealType] = recipe;
			setDoc(doc(this.getCalendarCol, day.toString()), entry, { merge: true });
		},
		//Update Lists
		addToList(day: Temporal.PlainDate, mealType: string, recipe: Recipe | null) {
			const entry = {} as any;
			entry[mealType] = recipe;
			setDoc(doc(this.getCalendarCol, day.toString()), entry, { merge: true });
		},
		//Subscribe to Firebase Data
		subscribeToUserData() {
			if (!this.user) return;
			try {
				this.unsub["userData"] = onSnapshot(
					this.getUserDoc, //doc(db, "User", this.user?.uid ?? "")
					(d) => (this.userdata = d.data()),
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
		standardSignIn(email: string, password: string) {
			signInWithEmailAndPassword(auth, email, password).catch((error) => {
				this.sendAlert(error + "", alertType.ERROR);
			});
		},
		googleSignIn() {
			const provider = new GoogleAuthProvider();

			signInWithPopup(auth, provider).catch((error) => {
				this.sendAlert(error.message, alertType.ERROR);
			});
		},
		createUser(email: string, password: string) {
			createUserWithEmailAndPassword(auth, email, password).catch((error) => {
				this.sendAlert(error.message, alertType.ERROR);
			});
		},
		signOut() {
			this.unsubFromFirebase();
			signOut(auth);
			recipeStore().cleanStore();
		},
		deleteUser() {
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
