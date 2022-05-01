interface Ingredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodCategory: string
  image: string  
}

interface Recipe {
  uri: string
	label: string;
	image: string;
	source: string;
	url: string;
  shareAs: string;
  yield: number;
  dietLabels: Array<string>;
  healthLabels: Array<string>;
  cautions: Array<string>;
  ingredientLines: Array<string>;
  ingredients: Array<Ingredient>
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: Array<string>;
  mealType: Array<string>;
  dishType: Array<string>;
  totalNutrients: any;
  totalDaily: any;
  digest: any;
}

export default Recipe;
