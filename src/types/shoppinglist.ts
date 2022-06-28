import Ingredient from "./ingredient";
import Recipe from "./recipe";

export default interface Shoppinglist {
	completionDate?: Date;
	creationDate: Date;
	name: String;
	recipes: Array<Recipe>;
	singleItems: Map<string,Ingredient>;
}
