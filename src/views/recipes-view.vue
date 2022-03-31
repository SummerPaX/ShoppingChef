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
  <div class="page-container">
    <div class="recipe-container">
      <RecipeCard v-for="(recipe, index) in recipes.recipes" :key="index" :recipe="recipe" />
    </div>
  </div>
</template>
