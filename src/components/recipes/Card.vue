<script lang="ts" setup>
import Recipe from "../../types/recipe";

const props = defineProps({
	recipeProp: Object,
});

const recipe: Recipe = props.recipeProp?.recipe as Recipe;
</script>

<template>
	<div
		class="w-full  md:max-h-56 mb-2 overflow-hidden transition-all duration-200 md:flex border border-black dark:border-green-600 rounded-sm shadow-md bg-white dark:bg-gray-700"
	>
		<div class="md:shrink-0">
			<img class="h-48 w-full object-cover md:h-full md:w-48" :src="recipe.image" />
		</div>
		<div class="p-4 w-full">
			<div class="header">
				<span
					class="uppercase tracking-wide text-sm font-semibold text-indigo-500 dark:text-indigo-500 pr-2"
					v-for="(htags, index) in recipe.dietLabels"
					:key="index"
					>{{ htags }}</span
				>
			</div>
			<a :href="recipe.url" target="_blank" class="block mt-1 text-lg leading-tight font-medium hover:underline text-black dark:text-white">
				{{ recipe.label }}
			</a>
			<ul class="flex max-h-32 overflow-hidden flex-col place-content-between md:place-content-start mt-2">
				<li
					class="mr-1 mt-1 w-full py-0.5 px-1.5 rounded-sm bg-gray-200 text-slate-500 dark:bg-green-800 dark:text-gray-100"
					v-for="(lines, index) in recipe.ingredientLines"
					:key="index"
				>
					{{ lines }}
				</li>
			</ul>
		</div>
		<div class="absolute right-0 top-0 hidden fill-white bg-green-500">
			<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
				<path
					d="M24 38Q23.35 38 22.925 37.575Q22.5 37.15 22.5 36.5V25.5H11.5Q10.85 25.5 10.425 25.075Q10 24.65 10 24Q10 23.35 10.425 22.925Q10.85 22.5 11.5 22.5H22.5V11.5Q22.5 10.85 22.925 10.425Q23.35 10 24 10Q24.65 10 25.075 10.425Q25.5 10.85 25.5 11.5V22.5H36.5Q37.15 22.5 37.575 22.925Q38 23.35 38 24Q38 24.65 37.575 25.075Q37.15 25.5 36.5 25.5H25.5V36.5Q25.5 37.15 25.075 37.575Q24.65 38 24 38Z"
				/>
			</svg>
		</div>
	</div>
</template>
