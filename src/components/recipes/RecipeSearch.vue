<script lang="ts">
import edamamOptions from "../../types/edamamOptions";
import { recipeStore } from "../../stores/recipeStore";

export default {
	data() {
		return {
			queryText: "schnitzel",
		};
	},
	setup() {
		const recipes = recipeStore();

		return {
			recipes,
		};
	},
	methods: {
		submitSearch() {
			if(this.queryText)
			this.recipes.fetchRecipes({
				query: this.queryText,
				diet: [],
				health: [],
				mealType: [],
				dishType: [],
				cuisine: [],
				calories: {
					min: 0,
					max: Number.MAX_VALUE,
				},
				time: {
					min: 0,
					max: 60,
				},
				to: 50,
			} as edamamOptions);
		},
		deleteSearchInput() {
			this.queryText = "";
			document.getElementById("searchBar")?.focus();
		},
	},
};
</script>

<template>
	<div
		class="relative flex flex-col text-gray-600 dark:text-white items-center"
	>
		<form
		v-on:submit.prevent="submitSearch"
			class="relative h-12 flex flex-row w-full items-center bg-gray-100 dark:bg-gray-800 rounded-full border border-green-600 group overflow-hidden transition-all duration-100 mx-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				:class="queryText ? 'h-8 w-8' : 'h-0 w-0 '"
				class="group-focus-within:h-8 group-focus-within:w-8 absolute flex items-center ml-3 text-center rounded-full fill-gray-500 dark:fill-gray-400 transition-all"
			>
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path
					d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
				/>
			</svg>
			<input
				v-model="queryText"
				id="searchBar"
				type="text"
				:class="queryText ? 'ml-14' : 'ml-4'"
				class="block w-full h-full group-focus-within:ml-14 mr-10  bg-opacity-0 placeholder:text-gray-400 placeholder:dark:text-gray-500 focus-visible:outline-none focus:border-none bg-inherit transition-spacing"
				placeholder="Search"
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				@click.passive="deleteSearchInput"
				:class="queryText ? 'h-6 w-6' : 'h-0 w-0 '"
				class="absolute cursor-pointer right-20 mr-2 flex my-auto rounded-full fill-gray-500 dark:fill-gray-400 transition-all"
			>
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path
					d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
				/>
			</svg>
			<button
				:class="queryText ? 'w-20' : 'w-0 opacity-0'"
				class="h-full right-0 rounded-r-full shrink-0 grow-0 bg-green-600 text-white font-semibold transition-all focus-visible:outline-none focus:border-none"
			>
				Search
			</button>
		</form>
		<div class=" mt-2 flex flex-row flex-wrap md:flex-nowrap">
			<button class="border-2 border-green-600 rounded-full px-2 m-1 md:mx-3 hover:bg-gray-200 hover:dark:bg-gray-600  transition-all">
				Meal
			</button>
			<button class="border-2 border-green-600 rounded-full px-2 m-1 md:mx-3 hover:bg-gray-200 hover:dark:bg-gray-600  transition-all">
				Cuisine
			</button>
			<button class="border-2 border-green-600 rounded-full px-2 m-1 md:mx-3 hover:bg-gray-200 hover:dark:bg-gray-600  transition-all">
				Diet
			</button>			
			<button class="border-2 border-green-600 rounded-full px-2 m-1 md:mx-3 hover:bg-gray-200 hover:dark:bg-gray-600  transition-all">
				Allergies
			</button>
			<button class="border-2 border-green-600 rounded-full px-2 m-1 md:mx-3 hover:bg-gray-200 hover:dark:bg-gray-600  transition-all">
				Dish
			</button>
			<button class="border-2 border-green-600 rounded-full px-2 m-1 md:mx-3 hover:bg-gray-200 hover:dark:bg-gray-600  transition-all">
				Calories
			</button>
			<button class="border-2 border-green-600 rounded-full px-2 m-1 md:mx-3 hover:bg-gray-200 hover:dark:bg-gray-600  transition-all">
				Preptime
			</button>
		</div>
	</div>
</template>

<style scoped></style>
