interface Ingredient {
	text: string;
	quantity: number;
	measure: string;
	food: string;
	weight: number;
	foodCategory: string;
	image: string;
}

interface IRecipe {
	label: string;
	url: string;
	ingredients: Array<Ingredient>;
	calories: number;
	description?: string;
	uri: string;
	image?: string;
	source?: string;
	shareAs?: string;
	yield?: number;
	dietLabels?: Array<string>;
	healthLabels?: Array<string>;
	cautions?: Array<string>;
	ingredientLines?: Array<string>;
	totalWeight?: number;
	totalTime?: number;
	cuisineType?: Array<string>;
	mealType?: Array<string>;
	dishType?: Array<string>;
	totalNutrients?: any;
	totalDaily?: any;
	digest?: any;
}

class Recipe implements IRecipe {
	constructor() {
		this.label = "";
		this.uri = "";
		this.url = "";
		this.ingredients = [];
		this.calories = 0;
	}
	label: string;
	url: string;
	ingredients: Ingredient[];
	calories: number;
	description?: string | undefined;
	uri: string;
	image?: string | undefined;
	source?: string | undefined;
	shareAs?: string | undefined;
	yield?: number | undefined;
	dietLabels?: string[] | undefined;
	healthLabels?: string[] | undefined;
	cautions?: string[] | undefined;
	ingredientLines?: string[] | undefined;
	totalWeight?: number | undefined;
	totalTime?: number | undefined;
	cuisineType?: string[] | undefined;
	mealType?: string[] | undefined;
	dishType?: string[] | undefined;
	totalNutrients?: any;
	totalDaily?: any;
	digest?: any;
}
export default Recipe;
