interface Ingredient {
  text: string;
  quantity: Number;
  measure: string;
  food: string;
  weight: Number;
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
  yield: Number;
  dietLabels: Array<string>;
  healthLabels: Array<string>;
  cautions: Array<string>;
  ingredientLines: Array<string>;
  ingredients: Array<Ingredient>
  calories: Number;
  totalWeight: Number;
  totalTime: Number;
  cuisineType: Array<string>;
  mealType: Array<string>;
  dishType: Array<string>;
  totalNutrients: any;
  totalDaily: any;
  digest: any;
}

export default Recipe;
