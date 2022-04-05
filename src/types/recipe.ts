interface Ingredient {
  text: String;
  quantity: Number;
  measure: String;
  food: String;
  weight: Number;
  foodCategory: String
  image: String  
}

interface Recipe {
  uri: String
	label: String;
	image: string;
	source: String;
	url: String;
  shareAs: String;
  yield: Number;
  dietLabels: Array<String>;
  healthLabels: Array<String>;
  cautions: Array<String>;
  ingredientLines: Array<String>;
  ingredients: Array<Ingredient>
  calories: Number;
  totalWeight: Number;
  totalTime: Number;
  cuisineType: Array<String>;
  mealType: Array<String>;
  dishType: Array<String>;
  totalNutrients: any;
  totalDaily: any;
  digest: any;
}

export default Recipe;
