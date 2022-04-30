<script lang="ts" setup>
import Meal from './Meal.vue'

const props = defineProps({
	day: Temporal,
});

console.log(props.day.);
</script>

<template>
    <div class="flex flex-col justify-center m-1">
      <header class="w-48 p-2 text-white font-bold rounded bg-gray-500 dark:bg-gray-600">{{day}}</header>
      <Meal mealType="Breakfast"></Meal>
      <Meal mealType="Lunch"></Meal>
      <Meal mealType="Dinner"></Meal>
      <Meal mealType="Snacks"></Meal>
    </div>
</template>