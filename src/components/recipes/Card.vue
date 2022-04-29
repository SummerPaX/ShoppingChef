<script lang="ts" setup>
import { computed, ref, reactive } from "@vue/reactivity";
import Recipe from "../../types/recipe";

let showIngredients = ref(false);
let showTags = ref(false);

const props = defineProps({
	recipeProp: Object,
});

const recipe = computed(() => props.recipeProp?.recipe as Recipe);
</script>

<template>
	<!--TODO Rating System-->
	<div
		class="w-full mb-2 overflow-hidden transition-all duration-200 md:flex border border-black dark:border-green-600 rounded-sm shadow-md bg-white dark:bg-gray-700 "
	>
		<div class="md:shrink-0 ">
			<!--TODO maybe Lazy Load Image-->
			<img class="h-48 w-full object-cover md:h-full md:w-48  bg-[url('src\assets\logo.png')] bg-cover bg-opacity-20"  :srcset="recipe.image" />
		</div>
		<div class="w-full">
			<div class="flex items-center px-4 py-2">
				<img v-if="recipe.healthLabels.includes('Vegan')" src="..\..\assets\icons\vegan.svg" alt="" class="h-12 rounded-full ml-[-0.5rem] pr-2" />
				<img v-else-if="recipe.healthLabels.includes('Vegetarian')" src="..\..\assets\icons\veggie.svg" alt="" class="h-12 rounded-full ml-[-0.5rem] pr-2" />
				<span class="uppercase tracking-wide text-sm font-semibold text-orange-500 dark:text-orange-500 pr-2">{{ recipe.mealType.at(0) }}</span>
				<span
					class="uppercase tracking-wide text-sm font-semibold text-indigo-500 dark:text-indigo-500 pr-2"
					v-for="(htags, index) in recipe.dietLabels"
					:key="index"
					>{{ htags }}</span
				>
			</div>
			<a href="#" class="mt-1 text-xl leading-tight font-medium hover:underline text-black dark:text-white px-4 py-2">
				{{ recipe.label }}
			</a>
			<!--TODO show more (Calories, preptime, ...)-->
			<ul class="flex overflow-hidden flex-col place-content-between md:place-content-start mt-2 px-4 py-2">
				<header class="flex items-center mt-1 leading-tight font-medium text-black dark:text-white">
					Ingredients<span class="material-symbols-outlined cursor-pointer select-none" @click="showIngredients = !showIngredients">
						{{ showIngredients ? "expand_less" : "expand_more" }}
					</span>
				</header>
				<div v-if="showIngredients">
					<li
						class="mr-1 mt-1 w-full py-0.5 px-1.5 rounded-sm bg-gray-200 text-slate-500 dark:bg-green-800 dark:text-gray-100"
						v-for="(lines, index) in recipe.ingredientLines"
						:key="index"
					>
						{{ lines }}
					</li>
				</div>
			</ul>
			<ul class="flex overflow-hidden flex-col place-content-between md:place-content-start px-4 py-2">
				<header class="flex w-full items-center leading-tight font-medium text-black dark:text-white">
					Tags<span class="material-symbols-outlined cursor-pointer select-none" @click="showTags = !showTags">
						{{ showTags ? "expand_less" : "expand_more" }}
					</span>
				</header>
				<div v-if="showTags" class="flex flex-row flex-wrap">
					<li class="mr-1 mt-1 py-0.5 px-1.5 bg-green-600 text-gray-100 rounded-sm" v-for="(lines, index) in recipe.healthLabels" :key="index">
						{{ lines }}
					</li>
				</div>
			</ul>
			<div class="h-10 bg-gray-800 flex flex-row text-center items-center px-2 font-medium text-black dark:text-gray-300">
				<span v-if="recipe.totalTime > 0" class="material-symbols-outlined"> timer </span
				><span v-if="recipe.totalTime > 0"> &nbsp;{{ recipe.totalTime }}min</span>
				<div v-if="recipe.totalTime > 0" class="h-full w-1 bg-gray-700 mx-2"></div>
				<span class="">Calories:&nbsp;{{ Math.round(recipe.calories) }}kcal</span>
				<div class="h-full w-1 bg-gray-700 mx-2"></div>
				<span class="">Servings:&nbsp;{{ Math.round(recipe.yield) }}</span>
				<div class="h-full w-1 bg-gray-700 mx-2"></div>
				<a :href="recipe.url" target="_blank" class="flex items-center ml-auto mr-2 text-indigo-500 dark:text-indigo-500"
					>Instructions<span class="material-symbols-outlined text-base text-indigo-500 pl-1"> north_east </span></a
				> 
			</div>
		</div>
	</div>
</template>

<style scoped></style>
