export default interface Ingredient {
	text?: string;
	quantity: number;
	measure: string;
	food: string;
	weight?: number;
	foodCategory?: string;
	image?: string | null;
	checked?: boolean
}