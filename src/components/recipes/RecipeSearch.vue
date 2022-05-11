<script lang="ts" setup>
import { ref } from "vue";
import edamamOptions from "../../types/edamamOptions";
import { recipeStore } from "../../stores/recipeStore";

const emit = defineEmits(["alert"]);

const recipes = recipeStore();

let showmeal = ref(false);
let showcuisine = ref(false);
let showdiet = ref(false);
let showhealth = ref(false);
let showdish = ref(false);
let showcalories = ref(false);
let showpreptime = ref(false);
let filterVisible = ref(false);

let query = ref<edamamOptions>({
	query: "",
	diet: [],
	health: [],
	mealType: [],
	dishType: [],
	cuisine: [],
	calories: {
		min: 0,
		max: 0,
	},
	time: {
		min: 0,
		max: 0,
	},
	from: 0,
	to: 20,
});
const submitSearch = () => {
	if (query.value.query) {
		recipes.fetchRecipes(query.value);
	}
};
const deleteSearchInput = () => {
	query.value = {
		query: "",
		diet: [],
		health: [],
		mealType: [],
		dishType: [],
		cuisine: [],
		calories: {
			min: 0,
			max: 0,
		},
		time: {
			min: 0,
			max: 0,
		},
		from: 0,
		to: 20,
	};
	document.getElementById("searchBar")?.focus();
};
</script>

<template>
	<div class="relative flex flex-col text-neutral-600 dark:text-white items-center overflow-visible">
		<!-- Search Bar -->
		<form
			v-on:submit.prevent="submitSearch"
			class="relative mt-2 h-12 flex flex-row w-full items-center bg-neutral-100 dark:bg-neutral-800 rounded-full border border-primary-600 group overflow-visible transition-all duration-100 mx-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				:class="query.query ? 'h-8 w-8' : 'h-0 w-0 '"
				class="group-focus-within:h-8 group-focus-within:w-8 absolute flex items-center ml-3 text-center rounded-full fill-neutral-500 dark:fill-neutral-400 transition-all"
			>
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path
					d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
				/>
			</svg>
			<input
				v-model="query.query"
				id="searchBar"
				type="text"
				:class="query.query ? 'ml-14' : 'ml-4'"
				class="block w-full h-full group-focus-within:ml-14 mr-10 bg-transparent placeholder:text-neutral-400 placeholder:dark:text-neutral-500 focus-visible:outline-none focus:border-none transition-spacing"
				placeholder="Search"
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				@click.passive="deleteSearchInput"
				:class="query.query ? 'h-6 w-6' : 'h-0 w-0 '"
				class="absolute cursor-pointer right-20 mr-2 flex my-auto rounded-full fill-neutral-500 dark:fill-neutral-400 transition-all"
			>
				<!-- X Button -->
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
			</svg>
			<button
				:class="query.query ? 'w-20' : 'w-0 opacity-0'"
				class="h-full right-0 rounded-r-full shrink-0 grow-0 bg-primary-600 text-white font-semibold transition-all hover:bg-primary-800 focus-visible:bg-primary-800 focus-visible:outline-none overflow-hidden focus:border-none"
			>
				Search
			</button>
		</form>

		<!--Filter-->
		<!--TODO make Filters Reactive / komplett überarbeiten-->
		<div class="relative mt-2 flex flex-row flex-wrap items-baseline justify-start w-full transition-spacing">
			<button :disabled="!filterVisible" class="peer hidden"></button>
			<button
				@click.prevent="filterVisible = !filterVisible"
				:class="filterVisible ? 'rounded-lg' : 'rounded-full'"
				class="flex items-center lg:mr-5 border-2 border-primary-600 select-none px-1 m-1 md:mx-2.5 hover:bg-neutral-200 hover:dark:bg-neutral-600 transition-colors ease-in-out"
			>
				<span v-if="filterVisible" class="material-symbols-outlined">close</span>
				<span v-else class="material-symbols-outlined">navigate_next</span>
			</button>
			<div
				:class="showmeal ? 'rounded-lg' : 'rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-600'"
				class="absolute left-14 flex flex-col border-2 border-primary-600 px-2 m-1 md:mx-2 bg-white dark:bg-neutral-800 bg-opacity-90 whitespace-nowrap select-none peer-disabled:left-10 peer-disabled:w-0 peer-disabled:opacity-0 transition-all ease-in-out"
			>
				<h1 @click="showmeal = !showmeal" class="cursor-pointer flex items-center">
					Meal
					<span class="material-symbols-outlined">
						{{ showmeal ? "expand_less" : "expand_more" }}
					</span>
				</h1>
				<div v-if="showmeal">
					<div v-for="meal in recipes.getMealTypes" :key="meal" class="my-1 pl-1 flex flex-row justify-between">
						<input :id="meal" v-model="query.mealType" :value="meal" class="check peer" type="checkbox" />
						<label :for="meal" class="peer-checked:bg-pink-500 peer-checked:bg-opacity-40 pr-1">{{ meal }}</label>
					</div>
				</div>
			</div>
			<div
				:class="showcuisine ? 'rounded-lg' : 'rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-600'"
				class="absolute left-[8.5rem] flex flex-col border-2 border-primary-600 px-2 m-1 md:mx-2 bg-white dark:bg-neutral-800 bg-opacity-90 whitespace-nowrap select-none peer-disabled:left-10 peer-disabled:w-0 peer-disabled:opacity-0 transition-all ease-in-out"
			>
				<h1 @click="showcuisine = !showcuisine" class="cursor-pointer flex items-center">
					Cuisine
					<span class="material-symbols-outlined">
						{{ showcuisine ? "expand_less" : "expand_more" }}
					</span>
				</h1>
				<div v-if="showcuisine">
					<div v-for="cuisine in recipes.getCuisineTypes" :key="cuisine" class="my-1 pl-1 flex flex-row justify-between">
						<input :id="cuisine" v-model="query.cuisine" :value="cuisine" class="check peer" type="checkbox" />
						<label :for="cuisine" class="peer-checked:bg-pink-500 peer-checked:bg-opacity-40 pr-1">{{ cuisine }}</label>
					</div>
				</div>
			</div>
			<div
				:class="showhealth ? 'rounded-lg' : 'rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-600'"
				class="absolute left-[14.5rem] flex flex-col border-2 border-primary-600 px-2 m-1 md:mx-2 bg-white dark:bg-neutral-800 bg-opacity-90 whitespace-nowrap select-none peer-disabled:left-10 peer-disabled:w-0 peer-disabled:opacity-0 transition-all ease-in-out"
			>
				<h1 @click="showhealth = !showhealth" class="cursor-pointer flex items-center">
					HealthLabels
					<span class="material-symbols-outlined">
						{{ showhealth ? "expand_less" : "expand_more" }}
					</span>
				</h1>
				<div v-if="showhealth">
					<div v-for="health in recipes.getHealthLabels" :key="health" class="my-1 pl-1 flex flex-row justify-between">
						<input :id="health" v-model="query.health" :value="health" class="check peer" type="checkbox" />
						<label :for="health" class="peer-checked:bg-pink-500 peer-checked:bg-opacity-40 pr-1">{{ health }}</label>
					</div>
				</div>
			</div>
			<div
				:class="showdiet ? 'rounded-lg' : 'rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-600'"
				class="absolute mt-10 md:mt-1 left-14 md:left-[23rem] flex flex-col border-2 border-primary-600 px-2 m-1 md:mx-2 bg-white dark:bg-neutral-800 bg-opacity-90 whitespace-nowrap select-none peer-disabled:left-10 peer-disabled:w-0 peer-disabled:opacity-0 transition-all ease-in-out"
			>
				<h1 @click="showdiet = !showdiet" class="cursor-pointer flex items-center">
					Diet
					<span class="material-symbols-outlined">
						{{ showdiet ? "expand_less" : "expand_more" }}
					</span>
				</h1>
				<div v-if="showdiet">
					<div v-for="diet in recipes.getDietLabels" :key="diet.param" class="my-1 pl-1 flex flex-row justify-between">
						<input :id="diet.param" v-model="query.diet" :value="diet.param" class="check peer" type="checkbox" />
						<label :for="diet.param" class="peer-checked:bg-pink-500 peer-checked:bg-opacity-40 pr-1">{{ diet.name }}</label>
					</div>
				</div>
			</div>
			<div
				:class="showdish ? 'rounded-lg' : 'rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-600'"
				class="absolute mt-10 md:mt-1 left-[8.15rem] md:left-[27.65rem] flex flex-col border-2 border-primary-600 px-2 m-1 md:mx-2 bg-white dark:bg-neutral-800 bg-opacity-90 whitespace-nowrap select-none peer-disabled:left-10 peer-disabled:w-0 peer-disabled:opacity-0 transition-all ease-in-out"
			>
				<h1 @click="showdish = !showdish" class="cursor-pointer flex items-center">
					Dish
					<span class="material-symbols-outlined">
						{{ showdish ? "expand_less" : "expand_more" }}
					</span>
				</h1>
				<div v-if="showdish">
					<div v-for="dish in recipes.getDishTypes" :key="dish" class="my-1 pl-1 flex flex-row justify-between">
						<input :id="dish" v-model="query.dishType" :value="dish" class="check peer" type="checkbox" />
						<label :for="dish" class="peer-checked:bg-pink-500 peer-checked:bg-opacity-40 pr-1">{{ dish }}</label>
					</div>
				</div>
			</div>
			<div
				:class="showcalories ? 'rounded-lg' : 'rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-600'"
				class="absolute mt-10 left-[13rem] md:left-14 lg:mt-1 lg:left-[32.4rem] flex flex-col border-2 border-primary-600 px-2 m-1 md:mx-2 bg-white dark:bg-neutral-800 bg-opacity-90 whitespace-nowrap select-none peer-disabled:left-10 peer-disabled:w-0 peer-disabled:opacity-0 transition-all ease-in-out"
			>
				<h1 @click="showcalories = !showcalories" class="cursor-pointer flex items-center">
					Calories
					<span class="material-symbols-outlined">
						{{ showcalories ? "expand_less" : "expand_more" }}
					</span>
				</h1>
				<div v-if="showcalories" class="flex flex-col">
					<div class="flex flex-row items-center">
						<label for="nimCal" class="w-8">min</label>
						<input
							id="minCal"
							type="number"
							placeholder="min"
							v-model="query.calories.min"
							class="block w-20 px-1 m-1 rounded placeholder:text-neutral-400 placeholder:dark:text-neutral-300 focus-visible:outline-none focus:border-none bg-neutral-200 dark:bg-neutral-600 transition-spacing"
						/>
					</div>
					<div class="flex flex-row items-center">
						<label for="nimCal" class="w-8">max</label>
						<input
							id="maxCal"
							type="number"
							placeholder="max"
							v-model="query.calories.max"
							class="block w-20 px-1 m-1 rounded placeholder:text-neutral-400 placeholder:dark:text-neutral-300 focus-visible:outline-none focus:border-none bg-neutral-200 dark:bg-neutral-600 transition-spacing"
						/>
					</div>
				</div>
			</div>
			<div
				:class="showpreptime ? 'rounded-lg' : 'rounded-lg hover:bg-neutral-200 hover:dark:bg-neutral-600'"
				class="absolute mt-10 left-[19.25rem] md:left-[10rem] lg:mt-1 lg:left-[38.7rem] flex flex-col border-2 border-primary-600 px-2 m-1 md:mx-2 bg-white dark:bg-neutral-800 bg-opacity-90 whitespace-nowrap select-none peer-disabled:left-10 peer-disabled:w-0 peer-disabled:opacity-0 transition-all ease-in-out"
			>
				<h1 @click="showpreptime = !showpreptime" class="cursor-pointer flex items-center">
					Preptime
					<span class="material-symbols-outlined">
						{{ showpreptime ? "expand_less" : "expand_more" }}
					</span>
				</h1>
				<div v-if="showpreptime" class="flex flex-col">
					<div class="flex flex-row items-center">
						<label for="nimCal" class="w-8">min</label>
						<input
							id="minCal"
							type="number"
							placeholder="min"
							v-model="query.time.min"
							class="block w-20 px-1 m-1 rounded placeholder:text-neutral-400 placeholder:dark:text-neutral-300 focus-visible:outline-none focus:border-none bg-neutral-200 dark:bg-neutral-600 transition-spacing"
						/>
					</div>
					<div class="flex flex-row items-center">
						<label for="nimCal" class="w-8">max</label>
						<input
							id="maxCal"
							type="number"
							placeholder="max"
							v-model="query.time.max"
							class="block w-20 px-1 m-1 rounded placeholder:text-neutral-400 placeholder:dark:text-neutral-300 focus-visible:outline-none focus:border-none bg-neutral-200 dark:bg-neutral-600 transition-spacing"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
