<script lang="ts">
import edamamOptions from "../../types/edamamOptions"
import { recipeStore } from "../../stores/recipeStore";

export default {
	data() {
		return{
			queryText: "schnitzel"
		}
	},
	setup() {
		const recipes = recipeStore();

		return {
			recipes,
		};
	},
	methods: {
		submitSearch(){
			this.recipes.fetchRecipes(
				{
					query: this.queryText,
					diet: [],
					health: [],
					mealType: [],
					dishType: [],
					cuisine: ["french"],
					calories: {
						min: 0,
						max: Number.MAX_VALUE
					},
					time: {
						min: 0,
						max: 60
					}, to: 50
				} as edamamOptions
			)
		}
	}
};
</script>

<template>
	<form v-on:submit.prevent="submitSearch" class="flex flex-col items-center justify-center">
		<div
			class="flex flex-row w-full bg-gray-100 dark:bg-gray-800 rounded-full border border-green-400 focus:border-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="h-12 w-12 flex items-center pl-3 shadow text-center fill-gray-800 dark:fill-gray-400"
			>
				<path d="M0 0h24v24H0V0z" fill="none" />
				<path
					d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
				/>
			</svg>
			<input
			v-model="queryText"
				type="text"
				class="block w-full text-white text-center placeholder:text-gray-500 focus-visible:outline-none focus:border-none bg-inherit"
				placeholder="Search"
			/>
			<select
				name="category"
				id="search-category"
				class="block w-56 shadow text-indigo-500 uppercase text-left rounded-r-full bg-inherit placeholder:text-gray-500 outline-none focus-visible:ring-2 focus-visible:ring-green-500 "
			>
				<option value="High-Protein">High-Protein</option>
				<option value=""></option>
				<option value=""></option>
				<option value=""></option>
				<option value=""></option>
				<option value=""></option>
				<option value=""></option>
			</select>
		</div>
	</form>
</template>

<style scoped></style>
