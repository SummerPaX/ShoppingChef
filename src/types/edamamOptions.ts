interface edamamOptions {
	query: string;
	diet: Array<string>;
	health: Array<string>;
	mealType: Array<string>;
	dishType: Array<string>;
	cuisine: Array<string>;
	calories: {
		min: Number;
		max: Number;
	};
	time: {
		min: Number;
		max: Number;
	};
    to: Number;
}

export default edamamOptions;