const alertType = {
	SUCCESS: "green",
	INFO: "blue",
	WARN: "yellow",
	ERROR: "red",
};

const dietLabels = [
	{
		name: "Balanced",
		param: "balanced",
		description: "Protein/Fat/Carb values in 15/35/50 ratio",
	},
	{
		name: "High-Fiber",
		param: "high-fiber",
		description: "More than 5g fiber per serving",
	},
	{
		name: "High-Protein",
		param: "high-protein",
		description: "More than 50% of total calories from proteins",
	},
	{
		name: "Low-Carb",
		param: "low-carb",
		description: "Less than 20% of total calories from carbs",
	},
	{
		name: "Low-Fat",
		param: "low-fat",
		description: "Less than 15% of total calories from fat",
	},
	{
		name: "Low-Sodium",
		param: "low-sodium",
		description: "Less than 140mg Na per serving",
	},
];

const healthLabels = [
	"alcohol-cocktail",
	"alcohol-free",
	"celery-free",
	"crustacean-free",
	"dairy-free",
	"DASH",
	"egg-free",
	"fish-free",
	"fodmap-free",
	"gluten-free",
	"immuno-supportive",
	"keto-friendly",
	"kidney-friendly",
	"kosher",
	"low-potassium",
	"low-sugar",
	"lupine-free",
	"Mediterranean",
	"mollusk-free",
	"mustard-free",
	"No-oil-added",
	"paleo",
	"peanut-free",
	"pecatarian",
	"pork-free",
	"red-meat-free",
	"sesame-free",
	"shellfish-free",
	"soy-free",
	"sugar-conscious",
	"sulfite-free",
	"tree-nut-free",
	"vegan",
	"vegetarian",
	"wheat-free",
];

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];

const dishTypes = [
	"Alcohol-cocktail",
	"Biscuits and cookies",
	"Bread",
	"Cereals",
	"Condiments and sauces",
	"Drinks",
	"Desserts",
	"Egg",
	"Main course",
	"Omelet",
	"Pancake",
	"Preps",
	"Preserve",
	"Salad",
	"Sandwiches",
	"Soup",
	"Starter",
];

const cuisineTypes = [
	"American",
	"Asian",
	"British",
	"Caribbean",
	"Central Europe",
	"Chinese",
	"Eastern Europe",
	"French",
	"Indian",
	"Italian",
	"Japanese",
	"Kosher",
	"Mediterranean",
	"Mexican",
	"Middle Eastern",
	"Nordic",
	"South American",
	"South East Asian",
];

export { alertType, dietLabels, healthLabels, mealTypes, dishTypes, cuisineTypes };
