<script lang="ts" setup>
import { ref, computed } from "vue";
import RecipeCard from "../components/recipes/Card.vue";
import Loading from "../components/Loading.vue";
import RecipeSearch from "../components/recipes/RecipeSearch.vue";
import { recipeStore } from "../stores/recipeStore";
import { accountStore } from "../stores/accountStore";
import Recipe from "../types/recipe";

const emit = defineEmits(["alert"]);
const addAlert = (message: string, type: string) => {
	emit("alert", message, type);
};

const accStore = accountStore();
const recipestore = recipeStore();
const recipes = computed(() => accStore.getFavs);
const count = computed(() => {
	recipes.value.size;
});
const more = computed(() => recipestore.more && Object.keys(recipes.value).length < 100);

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
</script>

<template>
	<div class="flex justify-center">
		<div
			class="h-screen flex flex-col max-w-xl md:max-w-[95%] xl:max-w-6xl transition-all duration-200 ease-linear flex-grow overflow-visible overflow-y-auto md:overflow-visible scroll-smooth"
			@scroll="handleScroll"
		>
			<div
				class="sticky transition-all ease-in-out shadow-lg md:mx-[-0.25rem] rounded-b-lg duration-200 bg-white dark:bg-neutral-800 top-0 px-2"
				:class="searchSticky ? '' : 'translate-y-[-7rem]'"
			>
			<h1 class="text-3xl dark:text-white text-center py-4">All your good Stuff</h1>
			</div>
			<div class="mb-[4.25rem] md:mb-0 px-1 scrollbar md:overflow-auto scroll-smooth">
				<!-- <p class="text-neutral-700 dark:text-white">{{ count }} Entrys</p> -->
				<RecipeCard @alert="emit('alert')" v-for="(value, key) in recipes" :key="key" :recipe="{ recipe: value }" />
				<!-- <div class="flex justify-center items-center w-full h-20">
					<Loading color="bg-gray-500" :loading="recipestore.fetching" />
				</div> -->
			</div>
		</div>
	</div>
</template>
