<script lang="ts" setup>
import { computed, ref, reactive } from "@vue/reactivity";
import Recipe from "../../types/recipe";
import { accountStore } from "../../stores/accountStore";

const emit = defineEmits(["alert"]);
const props = defineProps({
	recipeObject: {
		type: Object,
		required: true,
	},
});

const accStore = accountStore();
const showIngredients = ref(false);
const showTags = ref(false);
const imgLoaded = ref(false);
const imgZoom = ref(false);

const recipe = computed(() => props.recipeObject as Recipe);
const isFav = computed(() => accStore.isFav(recipe.value.uri));
const rating = ref(Math.random() * 70 + 30);
const addToList = () => {};

const addToWeek = () => {};

const toggleFav = () => {
	if (isFav.value) accStore.removeFav(recipe.value.uri);
	else accStore.addFav(recipe.value);
};

// const rateHover = (event: MouseEvent) => {
// 	let localX = event.pageX - (<Element>event.currentTarget).getBoundingClientRect().x;
// 	let tempRating = Math.round(localX * (100 / (<Element>event.currentTarget).getBoundingClientRect().width));
// 	tempRating = tempRating + 5 - (tempRating % 5);
// 	rating.value = tempRating;
// 	console.log(rating.value);
// };
// const rate = (event: MouseEvent) => {
// 	let localX = event.pageX - (<Element>event.currentTarget).getBoundingClientRect().x;
// 	let tempRating = Math.round(localX * (100 / (<Element>event.currentTarget).getBoundingClientRect().width));
// 	tempRating = tempRating + 5 - (tempRating % 5);
// 	rating.value = tempRating;
// };
</script>

<template>
	<div
		class="box-border w-full mb-2 transition-all animate-slide-up duration-200 md:flex border border-black dark:border-primary-600 rounded-sm shadow-md bg-white dark:bg-neutral-700"
	>
		<div class="relative md:shrink-0 h-48 md:h-auto md:w-48">
			<img
				:class="imgLoaded ? '' : ' '"
				class="absolute h-48 max-h-48 w-full object-cover transition-all duration-1000 md:h-full md:w-48 bg-cover bg-opacity-20"
				src="..\..\assets\icons\recipeimg.svg"
			/>
			<img
				:id="recipe.uri"
				:class="
					imgLoaded
						? 'opacity-100 h-48 md:h-full ' +
						  (imgZoom ? 'absolute rounded md:h-48 md:translate-x-80 md:scale-[2] lg:translate-x-[30rem] lg:scale-[3]' : 'scale-100 ')
						: 'opacity-0 h-0 scale-150'
				"
				class="object-cover transition-all duration-500 w-full md:w-48"
				:srcset="recipe.image"
				@load="imgLoaded = true"
				@click="imgZoom = !imgZoom"
			/>
		</div>
		<div class="w-full">
			<div class="flex items-center pl-4">
				<img
					v-if="recipe.healthLabels?.includes('Vegan')"
					src="..\..\assets\icons\vegan.svg"
					alt=""
					class="h-12 self-start rounded-full ml-[-0.5rem] pr-2 py-2"
				/>
				<img
					v-else-if="recipe.healthLabels?.includes('Vegetarian')"
					src="..\..\assets\icons\veggie.svg"
					alt=""
					class="h-12 rounded-full ml-[-0.5rem] pr-2 py-2"
				/>
				<div class="flex items-center flex-wrap">
					<span class="uppercase tracking-wide text-sm font-semibold text-orange-500 dark:text-orange-500 pr-2">{{ recipe.mealType?.at(0) ?? "" }}</span>
					<span
						class="uppercase tracking-wide text-sm font-semibold text-indigo-500 dark:text-indigo-500 pr-2"
						v-for="(htags, index) in recipe.dietLabels"
						:key="index"
						>{{ htags }}</span
					>
				</div>
				<div class="flex ml-auto h-12 items-start self-start">
					<!-- TODO: Fav animation -->
					<button
						@click.prevent="toggleFav"
						:class="isFav ? 'text-pink-500 hover:text-pink-600' : 'hover:text-pink-300'"
						class="material-symbols-outlined font-bold text-white bg-primary-400 p-2 rounded-bl transition-colors"
					>
						favorite
					</button>
					<router-link id="lists" to="/lists" @click.prevent="toggleFav" class="material-symbols-outlined text-white hover:bg-primary-700 bg-primary-600 p-2 ml-0.5 transition-colors">
						add_shopping_cart
					</router-link>
					<router-link id="home" to="/home" @click.prevent="toggleFav" class="material-symbols-outlined text-white hover:bg-primary-700 bg-primary-600 p-2 ml-0.5 transition-colors">
						calendar_add_on
					</router-link>
				</div>
			</div>
			<a href="#" class="mt-1 text-xl flex font-medium hover:underline text-black dark:text-white mx-4 py-2">
				{{ recipe.label }}
			</a>
			<ul class="flex overflow-hidden flex-col place-content-between md:place-content-start mt-2 px-4 py-2">
				<header
					@click="showIngredients = !showIngredients"
					class="flex items-center mt-1 leading-tight font-medium text-black dark:text-white cursor-pointer select-none"
				>
					Ingredients<button class="material-symbols-outlined select-none">
						{{ showIngredients ? "expand_less" : "expand_more" }}
					</button>
				</header>
				<div v-if="showIngredients">
					<li
						class="mr-1 mt-1 w-full py-0.5 px-1.5 rounded-sm bg-neutral-200 text-slate-500 dark:bg-primary-800 dark:text-neutral-100"
						v-for="(lines, index) in recipe.ingredientLines"
						:key="index"
					>
						{{ lines }}
					</li>
				</div>
			</ul>
			<ul class="flex overflow-hidden flex-col place-content-between md:place-content-start px-4 py-2">
				<header @click="showTags = !showTags" class="flex w-full items-center leading-tight font-medium text-black dark:text-white cursor-pointer select-none">
					Tags<button class="material-symbols-outlined cursor-pointer select-none">
						{{ showTags ? "expand_less" : "expand_more" }}
					</button>
				</header>
				<div v-if="showTags" class="flex flex-row flex-wrap">
					<li
						class="mr-1 mt-1 py-0.5 px-1.5 bg-primary-600 text-neutral-100 rounded-sm cursor-default"
						v-for="(lines, index) in recipe.healthLabels"
						:key="index"
					>
						{{ lines }}
					</li>
				</div>
			</ul>
			<div
				class="lg:h-10 bg-neutral-300 dark:bg-neutral-800 flex flex-row flex-wrap text-center items-center px-2 font-medium text-black dark:text-neutral-300"
			>
				<div
					class="ml-1 text-transparent stars bg-clip-text select-none flex items-center"
					:style="`background-image: linear-gradient(to right, rgb(234 179 8) ${rating}%, white ${rating}%);`"
				>
					<span v-for="n in 5" :key="n" class="material-symbols-outlined cursor-default">star</span>
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
				<a :href="recipe.url" target="_blank" class="flex items-center h-10 ml-auto mr-2 text-indigo-500 dark:text-indigo-500">
					Instructions <span class="material-symbols-outlined text-base text-indigo-500 pl-1"> north_east </span>
				</a>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
