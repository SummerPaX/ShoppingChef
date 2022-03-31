<script lang="ts">
import { defineProps, PropType, computed } from "vue";
import Recipe from "../../types/recipe";

export default {
  props: {
    recipe: {
      type: Object as PropType<Recipe>,
      required: true,
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="card-img">
      <img class="" :src="recipe.img" />
    </div>
    <div class="p-4">
      <div class="header">
        <span class="header-tag" v-for="(htags,index) in recipe.header" :key=index>{{htags}}</span>
        </div>
      <h1 class="title">{{ recipe.title }}</h1>
      <ul class="tags">
        <li v-for="(tags,index) in recipe.tags" :key=index>{{tags}}</li>
      </ul>
    </div>
  </div>
</template>
