<script lang="ts" setup>
import Meal from "./Meal.vue";
import { Temporal } from "@js-temporal/polyfill";
import { accountStore } from "../../stores/accountStore";
import { computed } from "vue";
import Recipe from "../../types/recipe";

const emit = defineEmits(["alert"]);
const accStore = accountStore();

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const props = defineProps({
	day: {
		type: Temporal.PlainDate,
		required: true,
	},
});
const calories = computed(() => {
	if (accStore.calendardata.has(props.day.toString())) {
		const dayData = accStore.calendardata.get(props.day.toString());
		console.log(dayData);

		let c = 0;
		Object.keys(dayData).forEach((element) => {
			c += (dayData[element]?.calories ?? 0) / (dayData[element]?.yield ?? 1);
		});
		return Math.round(c);
	}
	return 0;
});
</script>

<template>
	<div class="flex flex-col justify-center m-1 rounded ring-primary-500">
		<header
			:class="day?.equals(Temporal.Now.plainDateISO()) ? 'bg-primary-600 dark:bg-primary-700' : 'dark:bg-neutral-700 bg-neutral-500'"
			class="w-full p-2 text-white font-bold rounded-t"
		>
			<span class="hidden lg:block"> {{ days[(day?.dayOfWeek ?? 0) - 1] + ", " + day?.day + ". " }} </span>
			<span class="block lg:hidden"> {{ days[(day?.dayOfWeek ?? 0) - 1].substring(0, 3) + ", " + day?.day + ". " }} </span>
		</header>
		<Meal @alert="emit('alert')" :day="day" mealType="Breakfast"></Meal>
		<Meal @alert="emit('alert')" :day="day" mealType="Lunch"></Meal>
		<Meal @alert="emit('alert')" :day="day" mealType="Dinner"></Meal>
		<Meal @alert="emit('alert')" :day="day" class="rounded-b" mealType="Snack"></Meal>
		<div>Calories: {{ calories }}</div>
	</div>
</template>
