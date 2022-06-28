<script lang="ts" setup>
import { ref } from "vue";
import { accountStore } from "../stores/accountStore";
import Ingredient from "../types/ingredient";
import Recipe from "../types/recipe";
import Shoppinglist from "../types/shoppinglist";

const emit = defineEmits(["alert"]);
const accStore = accountStore();

const recipes = accStore.getFavs;

const lists = ref(new Map<string, Shoppinglist>());

const singleItems = ref(new Map<string, Ingredient>());
const singleItems2 = ref(new Map<string, Ingredient>());

recipes.forEach((recipe) => {
	recipe.ingredients.forEach((ingredient) => {
		if (!recipe.label.includes("Cheese")) {
		singleItems.value.set(ingredient.food, ingredient);
		}
		else{
			singleItems2.value.set(ingredient.food, ingredient);
		}
	});
});

singleItems2.value.set("Toilet Paper", {
	food: "Toilet Paper",
	measure: "<unit>",
	quantity: 2,
});

singleItems2.value.set("Milk", {
	food: "Milk",
	measure: "l",
	quantity: 1.5,
});

singleItems2.value.set("Monster Energy", {
	food: "Monster Energy",
	measure: "<unit>",
	quantity: 12,
});

lists.value.set("asdes", {
	creationDate: new Date(),
	name: "⚡ Week 24",
	recipes: [	],
	singleItems: singleItems.value,
});
lists.value.set("sdfsdf", {
	creationDate: new Date(),
	name: "Shopping List",
	recipes: [],
	singleItems: singleItems2.value,
});

console.log(lists);

//filter((value) => !['salt', 'pepper', 'water'].includes(value.food.toLowerCase())
const unit = "<unit>";
</script>
<template>
	<div class="flex flex-col items-center h-screen">
		<header class="flex text-3xl dark:text-white text-center py-4">
			Shopping Lists

			<button class="flex font-bold items-center text-base text-white bg-green-500 rounded-full ml-5 transition-colors">
				<span class="p-2 material-symbols-outlined"> add </span>
			</button>
		</header>
		<div class="flex flex-wrap justify-center w-fit overflow-auto scrollbar">
			<div
				v-for="([lid, list], key) in lists"
				:key="lid"
				class="flex flex-col h-fit m-2 border min-w-[18rem] border-black dark:border-primary-600 rounded-sm shadow-md bg-white dark:bg-neutral-700 dark:text-white"
			>
				<header class="h-10 p-2 w-full bg-neutral-800">
					<input
						disabled
						type="text"
						class="block text-center w-full h-full bg-transparent placeholder:text-neutral-400 placeholder:dark:text-neutral-500 focus-visible:outline-none focus:border-none transition-spacing"
						placeholder="Title"
						:value="list.name"
					/>
				</header>
				<ul class="flex mx-1 flex-col">
					<li
						v-for="(ingredient, id) in list.singleItems.values()"
						:key="id"
						class="relative flex flex-row flex-nowrap justify-start items-center before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-neutral-500 before:bottom-0"
					>
						<input v-model="ingredient['checked']" :id="'check-' + lid + id" class="check" type="checkbox" />
						<label :for="'check-' + lid + id" class="select-none p-2 w-full peer">
							<div :class="ingredient['checked'] ? 'line-through text-neutral-400' : ''" class="pr-1 transition-all" v-if="ingredient.quantity > 0">
								{{ Math.round(ingredient.quantity * 100) / 100 + (ingredient.measure != unit ? "" : "x") }}
							</div>
							<div
								:class="ingredient['checked'] ? 'line-through text-neutral-400' : ''"
								class="pr-1 transition-all"
								v-if="ingredient.measure && ingredient.measure != unit"
							>
								{{ ingredient.measure }}
							</div>
							<div :class="ingredient['checked'] ? 'line-through text-neutral-400' : ''" class="pr-1 whitespace-nowrap transition-all">
								{{ ingredient.food }}
							</div>
						</label>
						<img
							:src="ingredient.image ?? ''"
							:alt="ingredient.food"
							:class="(ingredient.image ? '' : 'hidden ') + (ingredient['checked'] ? 'opacity-30' : '')"
							class="h-8 w-8 transition-all"
						/>
						<!--class="left-0  hidden absolute peer-hover:block h-24 -translate-x-24"> -->
					</li>
				</ul>

				<div class="w-full mt-2 bg-neutral-800">
					<div class="flex ml-auto h-10 items-center self-start">
						<button class="material-symbols-outlined font-bold text-white bg-green-400 rounded-full h-9 w-9 ml-1 transition-colors">menu_book</button>
						<button
							v-if="!list.name.includes('⚡')"
							class="ml-auto h-10 text-white hover:bg-primary-70 font-bold hover:bg-primary-700 bg-primary-600 p-2 mr-0.5"
						>
							Add Recipe
						</button>
						<button v-if="!list.name.includes('⚡')" class="h-10 text-white hover:bg-primary-700 bg-primary-600 font-bold p-2">Add Item</button>
						<label v-else class="ml-auto mr-2"> ⚡ Dynamic List </label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>
