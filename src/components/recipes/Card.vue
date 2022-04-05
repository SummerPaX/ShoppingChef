<script lang="ts">
import { defineProps, PropType, computed } from "vue";
import Recipe from "../../types/recipe";

export default {
	props: {
		recipeProp: Object,
	},
	computed: {
		recipe(): Recipe {
			return this.recipeProp?.recipe as Recipe;
		},
	},
};
</script>

<template>
	<div
		class="w-[100%] mb-2 overflow-hidden transition-all duration-200 md:flex border border-black dark:border-green-600 rounded-sm shadow-md bg-white dark:bg-gray-700"
	>
		<div class="md:shrink-0">
			<img
				class="h-48 w-full object-cover md:h-full md:w-48"
				:src="recipe.image"
			/>
		</div>
		<div class="p-4">
			<div class="header">
				<span
					class="uppercase tracking-wide text-sm font-semibold text-indigo-500 dark:text-indigo-500 pr-2"
					v-for="(htags, index) in recipe.dietLabels"
					:key="index"
					>{{ htags }}</span
				>
			</div>
			<a
			:href="recipe.url" target="_blank"
				class="block mt-1 text-lg leading-tight font-medium hover:underline text-black dark:text-white"
			>
				{{ recipe.label }}
			</a>
			<ul
				class="flex flex-wrap place-content-between md:place-content-start mt-2"
			>
				<li
					class="mr-1 mt-1 py-0.5 px-1.5 rounded-sm bg-gray-200 text-slate-500 dark:bg-green-800 dark:text-gray-100"
					v-for="(tags, index) in recipe.healthLabels"
					:key="index"
				>
					{{ tags }}
				</li>
			</ul>
		</div>
	</div>
</template>
