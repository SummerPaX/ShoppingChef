<script lang="ts" setup>
import { ref, computed } from "vue";
import RecipeCard from "../components/recipes/Card.vue";
import Loading from "../components/Loading.vue";
import RecipeSearch from "../components/recipes/RecipeSearch.vue";
import { recipeStore } from "../stores/recipeStore";
import Recipe from "../types/recipe";

const emit = defineEmits(["alert"]);
const addAlert = (message: string, type: string) => {
	emit("alert", message, type);
};

const store = recipeStore();
const recipes = computed(() => store.recipes);
const count = computed(() => (store.count < recipes.value.size ? recipes.value.size : store.count));
const more = computed(() => store.next.length > 0);

let startY = ref(0);
let searchSticky = ref(true);

const handleScroll = (e: Event) => {
	var scrollY = (<HTMLElement>e.target).scrollTop;
	if (scrollY > startY.value) {
		searchSticky.value = false;
	} else {
		searchSticky.value = true;
	}
	startY.value = scrollY;
};
const loadMore = () => {
	store.fetchMoreRecipes();
};
</script>

<template>
	<div class="flex justify-center">
		<div
			class="relative h-screen flex flex-col max-w-xl md:max-w-[95%] xl:max-w-6xl transition-all duration-200 ease-linear flex-grow overflow-visible overflow-y-auto md:overflow-clip scrollbar scroll-smooth"
			@scroll="handleScroll"
		>
			<div class="absolute w-full top-32 bottom-0 md:mb-0 px-1 scrollbar md:overflow-auto scroll-smooth">
				<RecipeCard @alert="emit('alert')" v-for="(value, key) in recipes" :key="key" :recipeObject="value[1]" />
				<div v-if="more" class="flex justify-center items-center h-20">
					<button
						v-if="!store.fetching"
						@click="loadMore"
						class="material-symbols-outlined font-semibold rounded-full border-2 border-neutral-500 text-neutral-500 hover:animate-bounce-up transition-all hover:bg-neutral-700 text-4xl mb-4"
					>
						arrow_downward
					</button>
					<Loading color="bg-gray-500" :loading="store.fetching" />
				</div>
				<Loading v-else color="bg-gray-500" class="m-auto" :loading="store.fetching" />
			</div>
			<div
				class="sticky transition-all ease-in-out shadow-lg md:mx-[-0.25rem] rounded-b-lg duration-200 bg-white dark:bg-neutral-800 top-0 px-2"
				:class="searchSticky ? '' : 'translate-y-[-8rem]'"
			>
				<RecipeSearch @alert="addAlert"></RecipeSearch>
				<p class="text-neutral-700 dark:text-white">{{ recipes.size + " of " + count }} Entries</p>
			</div>
		</div>
	</div>
</template>
