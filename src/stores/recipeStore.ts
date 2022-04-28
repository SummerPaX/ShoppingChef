import { defineStore } from "pinia";
import Recipe from "../types/recipe";
import edamamOptions from "../types/edamamOptions";


export const recipeStore = defineStore("recipeStore", {
	state: () => ({
		//TODO store Appkey and appid securely
		app_key: "40698503668e0bb3897581f4766d77f9",
		app_id: "900da95e",
		recipes: [],
		count: 0,
		more: false,
		to: 0,
		fetching: false
	}),
	getters: {
		getRecipes(): Recipe[] {
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
			//this.recipes = [];
			this.count = 0;
			this.more = false;
			this.to = 0;
			this.fetching = true;

			//TODO use fetch options
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
			optionsString += options.to > 0 ? `&to=${options.to}` : "";

			console.log(optionsString);
			//TODO error handling!!!
			const dataRequest = await fetch("https://api.edamam.com/search?" + optionsString);
			const dataResponse = await dataRequest.json();

			this.recipes = dataResponse.hits;
			this.count = dataResponse.count;
			this.more = dataResponse.more;
			this.to = dataResponse.to;
			this.fetching = false;
			console.log(this.recipes);
		},
	},
});

const dietLabels = [
	{
		name: "Balanced",
		param: "balanced",
		description: "Protein/Fat/Carb values in 15/35/50 ratio",
	},
	{
		name: "High-Fiber",
		param: "high-fiber",
		description: "More than 5g fiber per serving",
	},
	{
		name: "High-Protein",
		param: "high-protein",
		description: "More than 50% of total calories from proteins",
	},
	{
		name: "Low-Carb",
		param: "low-carb",
		description: "Less than 20% of total calories from carbs",
	},
	{
		name: "Low-Fat",
		param: "low-fat",
		description: "Less than 15% of total calories from fat",
	},
	{
		name: "Low-Sodium",
		param: "low-sodium",
		description: "Less than 140mg Na per serving",
	},
];

const healthLabels = [
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

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];

const dishTypes = [
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

const cuisineTypes = [
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
]