<script lang="ts" setup>
import { computed, ref, reactive } from "@vue/reactivity";
import Recipe from "../../types/recipe";
import { accountStore } from "../../stores/accountStore";

const emit = defineEmits(["alert", "add"]);
const props = defineProps({
	recipeobject: Object,
});

const accStore = accountStore();
const showIngredients = ref(false);
const showTags = ref(false);
const imgLoaded = ref(false);
const imgZoom = ref(false);
console.log(typeof props.recipeobject);

const recipe = computed(() => props.recipeobject as Recipe);
const isFav = computed(() => accStore.isFav(recipe.value.uri));
const rating = ref(Math.random() * 100);

const addToList = () => {};

const addToWeek = () => {};
</script>

<template>
	<!--TODO Rating System-->
	<div class="w-full mb-2 transition-all duration-200 md:flex border border-black dark:border-primary-600 rounded-sm shadow-md bg-white dark:bg-neutral-700">
		<div class="relative bg-stone-800 md:shrink-0 md:h-auto md:w-24">
			<img
				:class="imgLoaded ? '' : ''"
				class="hidden md:block absolute h-48 max-h-48 w-full object-cover transition-all duration-1000 md:h-full md:w-48 bg-cover bg-opacity-20"
				src="..\..\assets\icons\recipeimg.svg"
			/>
			<img
				:id="recipe.uri"
				:class="
					imgLoaded
						? 'opacity-100 h-48 md:h-full md:w-48' + (imgZoom ? ' rounded md:h-fit  md:translate-x-80 md:scale-[2] lg:translate-x-[30rem] lg:scale-[3]' : 'scale-100 ')
						: 'opacity-0 h-0 w-0 scale-0'
				"
				class="md:absolute object-cover transition-all duration-500 w-full "
				:srcset="recipe.image"
				@load="imgLoaded = true"
				@click="imgZoom = !imgZoom"
			/>
		</div>
		<div class="w-full">
			<div class="flex flex-wrap items-center md:items-baseline pl-4">
				<span class="mt-1 text-xl font-medium text-black dark:text-white py-2"> {{ recipe.label }} </span>
				<img
					v-if="recipe.healthLabels?.includes('Vegan')"
					src="..\..\assets\icons\vegan.svg"
					alt=""
					class="h-12 self-start rounded-full ml-2 py-2"
				/>
				<img
					v-else-if="recipe.healthLabels?.includes('Vegetarian')"
					src="..\..\assets\icons\veggie.svg"
					alt=""
					class="h-12 self-start rounded-full ml-2 py-2"
				/>
					<span class="uppercase tracking-wide text-sm font-semibold text-orange-500 dark:text-orange-500 pl-2">{{ recipe.mealType?.at(0) ?? "" }}</span>
					<span
						class="uppercase tracking-wide text-sm font-semibold text-indigo-500 dark:text-indigo-500 pl-2"
						v-for="(htags, index) in recipe.dietLabels"
						:key="index"
						>{{ htags }}</span
					>
			</div>
			<div
				class="md:h-10 bg-neutral-300 dark:bg-neutral-800 flex flex-row flex-wrap text-center items-center px-2 font-medium text-black dark:text-neutral-300"
			>
				<div
					class="ml-1 text-transparent stars bg-clip-text select-none flex items-center"
					:style="`background-image: linear-gradient(to right, rgb(234 179 8) ${rating}%, white ${rating}%);`"
				>
					<span class="material-symbols-outlined cursor-default">star</span>
					<span class="material-symbols-outlined cursor-default">star</span>
					<span class="material-symbols-outlined cursor-default">star</span>
					<span class="material-symbols-outlined cursor-default">star</span>
					<span class="material-symbols-outlined cursor-default">star</span>
				</div>
				<span>({{ Math.round(rating / 2) / 10 }})</span>
				<div class="h-10 w-1 bg-white dark:bg-neutral-700 mx-3"></div>
				<span v-if="recipe.totalTime ?? 0 > 0" class="material-symbols-outlined"> timer </span>
				<span v-if="recipe.totalTime ?? 0 > 0"> &nbsp;{{ recipe.totalTime }}min</span>
				<div v-if="recipe.totalTime ?? 0 > 0" class="h-10 w-1 bg-white dark:bg-neutral-700 mx-3"></div>
				<span class="">Calories:&nbsp;{{ Math.round(recipe.calories) }}kcal</span>
				<div class="h-10 w-1 bg-white dark:bg-neutral-700 mx-3"></div>
				<span class="">Servings:&nbsp;{{ Math.round(recipe.yield ?? 0) }}</span>
				<div class="h-10 w-1 bg-white dark:bg-neutral-700 mx-3"></div>
				<button @click="emit('add',recipe)" class="flex items-center h-10 ml-auto mr-2 font-bold text-indigo-500 dark:text-indigo-500">
					Add<span class="material-symbols-outlined font-bold text-indigo-500 pl-1"> east </span>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
