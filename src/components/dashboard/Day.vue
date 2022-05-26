<script lang="ts" setup>
import Meal from "./Meal.vue";
import { Temporal } from "@js-temporal/polyfill";

const emit = defineEmits(["alert"]);

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const props = defineProps({
	day: Temporal.PlainDate,
});
</script>

<template>
	<div class="flex flex-col justify-center m-1 rounded ring-primary-500">
		<header
			:class="day?.equals(Temporal.Now.plainDateISO()) ? 'bg-primary-600 dark:bg-primary-700' : 'dark:bg-neutral-700 bg-neutral-500'"
			class="w-48 p-2 text-white font-bold rounded-t "
		>
			{{ days[(day?.dayOfWeek ?? 0) - 1] + ", " + day?.day + ". " }}
		</header>
		<Meal @alert="emit('alert')" mealType="Breakfast"></Meal>
		<Meal @alert="emit('alert')" mealType="Lunch"></Meal>
		<Meal @alert="emit('alert')" mealType="Dinner"></Meal>
		<Meal @alert="emit('alert')" class="rounded-b" mealType="Snacks"></Meal>
	</div>
</template>
