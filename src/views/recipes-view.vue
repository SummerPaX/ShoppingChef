<script lang="ts">
import RecipeCard from "../components/recipes/RecipeCard.vue";
import RecipeSearch from "../components/recipes/RecipeSearch.vue";
import { recipeStore } from "../stores/recipeStore";

export default {
	setup() {
		const recipes = recipeStore();

		return {
			recipes,
		};
	},
	components: {
		RecipeCard, RecipeSearch
	},
};
</script>

<template>
<div class=" flex justify-center">

	<div class="h-screen flex flex-col overflow-auto max-w-xl md:max-w-[95%] xl:max-w-6xl transition-all duration-200 ease-linear flex-grow">
		<RecipeSearch class="my-5"></RecipeSearch>
		<div
			class="m-2 mb-[4.25rem] md:mb-0 mx-auto px-1 scrollbar overflow-auto"
		>
			<RecipeCard
				v-for="(recipe, index) in recipes.recipes"
				:key="index"
				:recipe="recipe"
			/>
		</div>
	</div>
</div>
</template>
