interface edamamOptions {
	query: string;
	diet: Array<String>;
	health: Array<String>;
	mealType: Array<String>;
	dishType: Array<String>;
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