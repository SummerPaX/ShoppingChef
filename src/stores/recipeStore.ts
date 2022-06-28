import { acceptHMRUpdate, defineStore } from "pinia";
import { alertType } from "../types/constants";
import Recipe from "../types/recipe";
import edamamOptions from "../types/edamamOptions";

export const recipeStore = defineStore("recipeStore", {
	state: () => ({
		recipes: new Map<string, Recipe>(),
		count: 0,
		next: "",
		fetching: false,
		images: new Map<string, string>(),
		sendAlert: (message: string, type: string) => {},
	}),
	actions: {
		async fetchRecipes(options: edamamOptions) {
			this.cleanStore();
			this.fetching = true;

			try {
				const optionsString = buildQueryString(options);
				console.log(optionsString);

				const dataRequest = await fetch("https://api.edamam.com/api/recipes/v2/?" + optionsString);
				const dataResponse = await dataRequest.json();
				dataResponse.hits.forEach((hit: any) => {					
					this.recipes.set(this.getIdFromUri(hit.recipe.uri), hit.recipe);
				});
				
				if(dataResponse.count == 0) this.sendAlert("No Recipes found", alertType.WARN)

				this.count = dataResponse.count;
				this.next = dataResponse._links?.next?.href ?? "";
			} catch (err) {
				this.sendAlert(err + "", alertType.ERROR);
			} finally {
				this.fetching = false;
			}
		},
		async fetchMoreRecipes() {
			if (this.next.length <= 0) return;
			try {
				this.fetching = true;
				const dataRequest = await fetch(this.next);
				const dataResponse = await dataRequest.json();
				console.log(dataResponse);

				dataResponse.hits.forEach((hit: any) => {
					this.recipes.set(this.getIdFromUri(hit.recipe.uri), hit.recipe);
				});
				this.count = dataResponse.count;
				this.next = dataResponse._links?.next?.href ?? "";
			} catch (err) {
				this.sendAlert(err + "", alertType.ERROR);
			} finally {
				this.fetching = false;
			}
		},
		getIdFromUri(uri: string): string {
			return uri.substring(uri.indexOf("recipe_") + 7);
		},
		cleanStore() {
			this.recipes = new Map();
			this.count = 0;
			this.next = "";
		},
	},
});

function buildQueryString(options: edamamOptions): string {
	const query = new URLSearchParams({
		type: "public",
		q: options.query,
		app_id: "900da95e",
		app_key: "40698503668e0bb3897581f4766d77f9",
		from: options.from.toString(),
		to: options.to.toString(),
	});
	options.health.forEach((element: string) => query.append("health", element));
	options.mealType.forEach((element: string) => query.append("mealType", element));
	options.dishType.forEach((element: string) => query.append("dishType", element));
	options.cuisine.forEach((element: string) => query.append("cuisineType", element));

	const calorieRange = generateRangeString(options.calories.min, options.calories.max);
	if (calorieRange.length > 0) {
		query.append("calories", calorieRange);
	}
	const timeRange = generateRangeString(options.time.min, options.time.max);
	if (timeRange.length > 0) {
		query.append("time", timeRange);
	}
	return query.toString();
}
function generateRangeString(min: number, max: number): string {
	return (min > 0 ? min + (max > 0 ? "-" : "%2b") : "") + (max > 0 ? max : "");
}


// make sure to pass the right store definition, `recipeStore` in this case.
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(recipeStore, import.meta.hot));
}
