<script lang="ts" setup>
import { Temporal } from "@js-temporal/polyfill";
import { computed, ref } from "vue";
import CalendarAddModal from "../modals/CalendarAddModal.vue";
import { accountStore } from "../../stores/accountStore";
import Recipe from "../../types/recipe";

const emit = defineEmits(["alert"]);
const accStore = accountStore();
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

const openNewRecipeModal = ref(false);
const replaceRecipeModal = ref(false);
const label = computed(() => {
	return recipe.value?.label ?? props.mealType;
});
const recipe = computed(() => {
	if (accStore.calendardata.has(props.day.toString())) {
		const dayData = accStore.calendardata.get(props.day.toString());
		return dayData?.[props.mealType] as Recipe;
	}
});
</script>

<template>
	<div>
		<div
			:style="`background-image: url(${recipe.image})`"
			class="h-48 md:max-w-[12rem] bg-cover bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-500 transition-all duration-200 mt-1 flex flex-col items-center justify-end group cursor-pointer overflow-clip"
			v-if="recipe"
		>
			<div
				class="font-medium w-full  bg-stone-700/80 text-white transition-all p-1 pb-2 duration-200 translate-y-10 group-hover:translate-y-0"
			>
				{{ label }}
			</div>
			<div class="w-full flex flex-row justify-end p-1 bg-stone-700 translate-y-10 group-hover:translate-y-0 transition-all duration-200">
				<a :href="recipe.url" target="_blank" class="mr-auto text-indigo-500">Instructions</a>
				<button @click="replaceRecipeModal = true" class="material-symbols-outlined text-amber-500">find_replace</button>
				<button @click="accStore.addToCalendar(day, mealType, null)" class="material-symbols-outlined text-red-500">delete_forever</button>
			</div>
			<teleport to="#modalspace">
				<div v-if="replaceRecipeModal">
					<CalendarAddModal @close="replaceRecipeModal = false" @alert="emit('alert')" :day="day" :mealType="'Replace ' + mealType"></CalendarAddModal>
				</div>
			</teleport>
		</div>
		<div
			class="min-h-[5rem] md:h-48 bg-stone-300 dark:bg-stone-600 hover:bg-primary-500 transition-all duration-200 p-2 mt-1 flex flex-col items-center justify-center group cursor-pointer overflow-clip"
			v-else
			@click="openNewRecipeModal = true"
		>
			<div class="font-medium text-sm lg:text-base group-hover:font-bold group-hover:text-white transition-all duration-200">{{ mealType }}</div>
			<span
				class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 text-xs group-hover:text-5xl translate-y-10 group-hover:translate-y-0 transition-all font-bold duration-200"
			>
				add
			</span>
			<teleport to="#modalspace">
				<div v-if="openNewRecipeModal">
					<CalendarAddModal 
						@close="openNewRecipeModal = false"
					 	@alert="emit('alert')" 
					 	:day="day" :mealType="mealType">
					 </CalendarAddModal>
				</div>
			</teleport>
		</div>
	</div>
</template>
