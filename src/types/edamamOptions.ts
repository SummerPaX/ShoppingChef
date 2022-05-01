interface edamamOptions {
	query: string;
	diet: Array<string>;
	health: Array<string>;
	mealType: Array<string>;
	dishType: Array<string>;
	cuisine: Array<string>;
	calories: {
		min: number;
		max: number;
	};
	time: {
		min: number;
		max: number;
	};
	from: number;
    to: number;
}

export default edamamOptions;