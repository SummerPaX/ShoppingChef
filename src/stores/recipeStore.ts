import { acceptHMRUpdate, defineStore } from "pinia";
import { cuisineTypes, dietLabels, dishTypes, healthLabels, mealTypes } from "../types/constants";
import Recipe from "../types/recipe";
import edamamOptions from "../types/edamamOptions";

function buildQueryString(options: edamamOptions, appid: string, appkey: string): string {
	//TODO use fetch options
	let optionsString = `&q=${options.query}&app_id=${appid}&app_key=${appkey}`;
	options.diet.forEach((element: String) => {
		optionsString += `&diet=${element}`;
	});
	options.health.forEach((element: String) => {
		optionsString += `&health=${element}`;
	});
	options.mealType.forEach((element: String) => {
		optionsString += `&mealType=${element}`;
	});
	options.dishType.forEach((element: String) => {
		optionsString += `&dishType=${element}`;
	});
	options.cuisine.forEach((element: String) => {
		optionsString += `&cuisineType=${element}`;
	});
	if (options.calories.min > 0 || options.calories.max > 0) {
		optionsString += "&calories=";
		optionsString += options.calories.min > 0 ? options.calories.min + (options.calories.max > 0 ? "-" : "%2b") : "";
		optionsString += options.calories.max > 0 ? options.calories.max : "";
	}
	if (options.time.min > 0 || options.time.max > 0) {
		optionsString += "&time=";
		optionsString += options.time.min > 0 ? options.time.min + (options.time.max > 0 ? "-" : "%2b") : "";
		optionsString += options.time.max > 0 ? options.time.max : "";
	}
	optionsString += options.from > 0 ? `&from=${options.from}` : "";
	optionsString += options.to > 0 ? `&to=${options.to}` : "";
	console.log(optionsString);

	return optionsString;
}
async function fetchRecipes(optionsString: string) {
	//TODO error handling!!!
	const dataRequest = await fetch("https://api.edamam.com/search?" + optionsString);
	const dataResponse = await dataRequest.json();
	return dataResponse;
}

export const recipeStore = defineStore("recipeStore", {
	state: () => ({
		//TODO store Appkey and appid securely
		app_key: "40698503668e0bb3897581f4766d77f9",
		app_id: "900da95e",
		// recipes: [] as any[],
		recipes: {} as any,
		count: 0,
		more: false,
		fetching: false,
		currentOptions: {
			query: "",
			diet: [],
			health: [],
			mealType: [],
			dishType: [],
			cuisine: [],
			calories: {
				min: 0,
				max: 0,
			},
			time: {
				min: 0,
				max: 0,
			},
			from: 0,
			to: 0,
		} as edamamOptions,
	}),
	getters: {
		getRecipes(): any {
			return this.recipes;
		},
		getDietLabels() {
			return dietLabels;
		},
		getHealthLabels() {
			return healthLabels;
		},
		getMealTypes() {
			return mealTypes;
		},
		getDishTypes() {
			return dishTypes;
		},
		getCuisineTypes() {
			return cuisineTypes;
		},
	},
	actions: {
		async fetchRecipes(options: edamamOptions) {
			this.count = 0;
			this.more = false;
			this.currentOptions.from = 0;
			this.currentOptions.to = 20;
			this.fetching = true;
			this.currentOptions = options;
			this.recipes = {};

			const optionsString = buildQueryString(options, this.app_id, this.app_key);

			const dataResponse = await fetchRecipes(optionsString);
			dataResponse.hits.forEach((hit: any) => {
				this.recipes[this.getIdFromUri(hit.recipe.uri)] = hit.recipe;
			});

			this.count = dataResponse.count;
			this.more = dataResponse.more;
			this.currentOptions.to = dataResponse.to;
			this.fetching = false;
			console.log(this.$state);
		},
		async fetchMoreRecipes() {
			if (!this.more) return;
			this.fetching = true;

			this.currentOptions.to += 20;
			this.currentOptions.from += 20;

			const optionsString = buildQueryString(this.currentOptions, this.app_id, this.app_key);

			const dataResponse = await fetchRecipes(optionsString);
			// this.recipes.push(...dataResponse.hits);
			dataResponse.hits.forEach((hit: any) => {
				this.recipes[this.getIdFromUri(hit.recipe.uri)] = hit.recipe;
			});
			this.count = dataResponse.count;
			this.more = dataResponse.more;
			this.fetching = false;
			console.log(this.$state);
		},
		getIdFromUri(uri: string): string {
			return uri.substring(uri.indexOf("recipe_") + 7);
		},
	},
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(recipeStore, import.meta.hot));
}
