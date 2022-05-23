interface Ingredient {
	text: string;
	quantity: number;
	measure: string;
	food: string;
	weight: number;
	foodCategory: string;
	image: string;
}

interface Recipe {
  label: string;
	url: string;
	ingredients: Array<Ingredient>;
	calories: number;
  description?: string;
	uri?: string;
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

export default Recipe;
