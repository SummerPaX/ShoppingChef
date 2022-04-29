<script lang="ts" setup>
import { ref, computed } from "vue";
import RecipeCard from "../components/recipes/Card.vue";
import RecipeSearch from "../components/recipes/RecipeSearch.vue";
import { recipeStore } from "../stores/recipeStore";
import Recipe from "../types/recipe";

const recipes = computed(() => recipeStore().getRecipes);
const count = computed(() => recipeStore().count);

let startY = ref(0);
let searchSticky = ref(true);

const handleScroll = (e: Event) => {
	var scrollY = (<HTMLElement>e.target).scrollTop;
	if (scrollY > startY.value) {
		searchSticky.value = false;
	} else {
		searchSticky.value = true;
	}
	startY.value = scrollY;
};
</script>

<template>
	<div class="flex justify-center">
		<div
			class="h-screen flex flex-col max-w-xl md:max-w-[95%] xl:max-w-6xl transition-all duration-200 ease-linear flex-grow overflow-visible overflow-y-auto md:overflow-visible"
			@scroll="handleScroll"
		>
			<div class="sticky transition-all ease-in-out shadow-lg md:mx-[-0.25rem] rounded-b-lg duration-200 bg-white dark:bg-gray-800 top-0 px-2  " :class="searchSticky ? '' : 'translate-y-[-7rem]'">
				<RecipeSearch></RecipeSearch>
			</div>
			<div class="m-2 mb-[4.25rem] md:mb-0 px-1 scrollbar md:overflow-auto">
				<p class="text-gray-700 dark:text-white">{{ count }} Entrys found</p>
				<RecipeCard v-for="recipe in recipes" :key="recipe.uri" :recipeProp="recipe" />
			</div>
		</div>
	</div>
</template>
