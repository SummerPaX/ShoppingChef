<script lang="ts">
import RecipeCard from "../components/recipes/recipeCard.vue";
import { recipeStore } from '../stores/recipeStore'

export default {
  setup() {
    const recipes = recipeStore()

    return {
      recipes
    }
  },
  components: {
    RecipeCard
  }
}
</script>

<template>
  <div class="h-screen flex flex-col overflow-auto">
    <div class="m-2 mx-auto max-w-xl md:max-w-[40rem] lg:max-w-[55rem] xl:max-w-[72rem]  transition-all duration-200 ease-linear flex-grow px-1  overflow-auto">
      <RecipeCard v-for="(recipe, index) in recipes.recipes" :key="index" :recipe="recipe" />
    </div>
  </div>
</template>
