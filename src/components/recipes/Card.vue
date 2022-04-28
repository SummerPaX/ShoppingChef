<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import Recipe from "../../types/recipe";

const props = defineProps({
	recipeProp: Object,
});

const recipe = computed(()=> props.recipeProp?.recipe as Recipe);
</script>

<template>
	<div
		class="w-full md:max-h-56 mb-2 overflow-hidden transition-all duration-200 md:flex border border-black dark:border-green-600 rounded-sm shadow-md bg-white dark:bg-gray-700"
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
			<!--TODO show more (Calories, all Ingredients, preptime, ...)-->
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
	</div>
</template>
