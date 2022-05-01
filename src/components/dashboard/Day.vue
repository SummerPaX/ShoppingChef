<script lang="ts" setup>
import Meal from './Meal.vue'
import {Temporal } from '@js-temporal/polyfill'

const days = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

const props = defineProps({
	day: Temporal.PlainDate,
});
</script>

<template>
    <div  class="flex flex-col justify-center m-1 rounded ring-green-500">
      <header :class="day?.equals(Temporal.Now.plainDateISO()) ? 'dark:bg-green-700' : 'dark:bg-gray-700'" class="w-48 p-2 text-white font-bold rounded-t bg-gray-500 ">{{days[day?.dayOfWeek-1] +", " + day?.day+". " }}</header>
      <Meal mealType="Breakfast"></Meal>
      <Meal mealType="Lunch"></Meal>
      <Meal mealType="Dinner"></Meal>
      <Meal class="rounded-b" mealType="Snacks"></Meal>
    </div>
</template>