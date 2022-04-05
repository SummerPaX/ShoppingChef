import { defineStore } from "pinia";
import Recipe from "../types/recipe";
import edamamOptions from "../types/edamamOptions";

export const recipeStore = defineStore("recipeStore", {
	state: () => ({
		app_key: "40698503668e0bb3897581f4766d77f9",
		app_id: "900da95e",
		recipes: [] as Array<Recipe>,
	}),
	getters: {
		getDietLabels() {
			return {
				balanced: {
					name: "Balanced",
					param: "balanced",
					description: "Protein/Fat/Carb values in 15/35/50 ratio",
				},
				highfiber: {
					name: "High-Fiber",
					param: "high-fiber",
					description: "More than 5g fiber per serving",
				},
				highprotein: {
					name: "High-Protein",
					param: "high-protein",
					description: "More than 50% of total calories from proteins",
				},
				lowcarb: {
					name: "Low-Carb",
					param: "low-carb",
					description: "Less than 20% of total calories from carbs",
				},
				lowfat: {
					name: "Low-Fat",
					param: "low-fat",
					description: "Less than 15% of total calories from fat",
				},
				lowsodium: {
					name: "Low-Sodium",
					param: "low-sodium",
					description: "Less than 140mg Na per serving",
				},
			};
		},
		getHealthLabels() {
			return [
				"alcohol-cocktail",
				"alcohol-free",
				"celery-free",
				"crustacean-free",
				"dairy-free",
				"DASH",
				"egg-free",
				"fish-free",
				"fodmap-free",
				"gluten-free",
				"immuno-supportive",
				"keto-friendly",
				"kidney-friendly",
				"kosher",
				"low-potassium",
				"low-sugar",
				"lupine-free",
				"Mediterranean",
				"mollusk-free",
				"mustard-free",
				"No-oil-added",
				"paleo",
				"peanut-free",
				"pecatarian",
				"pork-free",
				"red-meat-free",
				"sesame-free",
				"shellfish-free",
				"soy-free",
				"sugar-conscious",
				"sulfite-free",
				"tree-nut-free",
				"vegan",
				"vegetarian",
				"wheat-free",
			];
		},
		getMealTypes() {
			return ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];
		},
		getDishTypes() {
			return [
				"Alcohol-cocktail",
				"Biscuits and cookies",
				"Bread",
				"Cereals",
				"Condiments and sauces",
				"Drinks",
				"Desserts",
				"Egg",
				"Main course",
				"Omelet",
				"Pancake",
				"Preps",
				"Preserve",
				"Salad",
				"Sandwiches",
				"Soup",
				"Starter",
			];
		},
		getCuisineTypes() {
			return [
				"American",
				"Asian",
				"British",
				"Caribbean",
				"Central Europe",
				"Chinese",
				"Eastern Europe",
				"French",
				"Indian",
				"Italian",
				"Japanese",
				"Kosher",
				"Mediterranean",
				"Mexican",
				"Middle Eastern",
				"Nordic",
				"South American",
				"South East Asian",
			];
		},
	},
	actions: {
		async fetchRecipes(options: edamamOptions) {
			let optionsString = `&q=${options.query}&app_id=${this.app_id}&app_key=${this.app_key}`;
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
			if (options.calories.min > 0 || options.calories.max < Number.MAX_VALUE) {
				optionsString += "&calories=";
				optionsString +=
					options.calories.min > 0
						? options.calories.min +
						  (options.calories.max < Number.MAX_VALUE ? "-" : "%2b")
						: "";
				optionsString +=
					options.calories.max < Number.MAX_VALUE ? options.calories.max : "";
			}
			if (options.time.min > 0 || options.time.max < Number.MAX_VALUE) {
				optionsString += "&time=";
				optionsString +=
					options.time.min > 0
						? options.time.min +
						  (options.time.max < Number.MAX_VALUE ? "-" : "%2b")
						: "";
				optionsString +=
					options.time.max < Number.MAX_VALUE ? options.time.max : "";
			}
			optionsString += options.to > 0 ? `&to=${options.to}` : "";

			console.log(optionsString);

			const dataRequest = await fetch(
				"https://api.edamam.com/search?" + optionsString
			);
			const dataResponse = await dataRequest.json();
			console.log(dataResponse);
			const hits = dataResponse.hits as Array<Recipe>;
			console.log(hits);
			this.recipes = hits;
		},
	},
});
