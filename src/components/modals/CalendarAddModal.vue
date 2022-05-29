<script lang="ts" setup>
import { Temporal } from "@js-temporal/polyfill";
import { ref } from "vue";
import { accountStore } from "../../stores/accountStore";
import { mealTypes } from "../../types/constants";
import Recipe from "../../types/recipe";
import RecipeCard from "./CalendarAddRecipeCard.vue";

const emit = defineEmits(["alert", "close"]);

const accStore = accountStore();
const recipes = ref(accStore.getFavs);
const open = ref(false);
setTimeout(() => {
	open.value = true;
}, 0);
const add = (recipe: Recipe) => {
	accStore.addToCalendar(props.day, props.mealType, recipe);
	emit("close");
};

const props = defineProps({
	day: {
		type: Temporal.PlainDate,
		required: true,
	},
	mealType: {
		type: String,
		required: true,
	},
});
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const dayString = days[props.day.dayOfWeek - 1].substring(0, 3) + ", " + props.day.day + ". " + months[props.day.month - 1] + " " + props.day.year;
</script>

<template>
	<div
		:class="open ? 'bg-stone-800/70' : 'bg-stone-800/0'"
		class="absolute flex justify-center top-0 left-0 w-screen h-screen transition-all duration-500"
		@click.self="emit('close')"
	>
		<div
			:class="open ? 'scale-100' : 'scale-0 -translate-y-full'"
			class="flex flex-col justify-between bg-stone-500/80 duration-500 transition-all mx-2 w-full max-w-6xl h-fit min-h-[30%] max-h-[80%] md:ml-20 mt-2 md:mt-12 rounded-lg p-4 font-bold text-xl dark:text-white"
		>
			<header class="flex flex-row justify-between items-center">
				<span class="font-bold text-transparent material-symbols-outlined">close</span>
				<h1>{{ mealType }} on {{ dayString }}</h1>
				<button @click="emit('close')" class="font-bold hover:text-red-400 transition-colors material-symbols-outlined">close</button>
			</header>
			<div class="w-full h-full my-2 overflow-y-auto overflow-x-hidden scrollbar scroll-smooth px-1 max-h-[80%]">
				<div v-for="(value, key) in recipes" :key="key">
					<RecipeCard @alert="emit('alert')" @add="add" :recipeobject="value" />
				</div>
			</div>
			<footer class="flex flex-row items-center justify-center">
				<router-link to="/recipes" class="flex flex-row items-center bg-green-500 px-2 rounded">
					<span class="font-bold material-symbols-outlined mr-2 text-3xl"> menu_book </span>
					<span class="font-bold">Find new Recipes</span>
				</router-link>
			</footer>
		</div>
	</div>
</template>
