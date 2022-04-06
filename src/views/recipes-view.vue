<script lang="ts">
import RecipeCard from "../components/recipes/Card.vue";
import RecipeSearch from "../components/recipes/RecipeSearch.vue";
import { recipeStore } from "../stores/recipeStore";

export default {
	setup() {
		const recipestore = recipeStore();

		return {
			recipestore,
		};
	},
	components: {
		RecipeCard, RecipeSearch
	},
};
</script>

<template>
<div class=" flex justify-center overflow-x-clip overflow-y-auto md:overflow-clip">

	<div class="h-screen flex flex-col max-w-xl md:max-w-[95%] xl:max-w-6xl transition-all duration-200 ease-linear flex-grow overflow-visible">
		<RecipeSearch></RecipeSearch>
		<div
			class="m-2 mb-[4.25rem] md:mb-0 mx-auto px-1 scrollbar md:overflow-auto"
		>
			<RecipeCard
				v-for="(recipe, index) in recipestore.recipes"
				:key="index"
				:recipeProp="recipe"
			/>
		</div>
	</div>
</div>
</template>
