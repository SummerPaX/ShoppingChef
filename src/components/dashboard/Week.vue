<script lang="ts" setup>
import Day from "./Day.vue";
import { ref } from "vue";
import { Temporal } from "@js-temporal/polyfill";

const emit = defineEmits(["alert"]);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const today = ref(Temporal.Now.plainDateISO());
</script>

<template>
	<div class="flex items-center justify-start flex-col">
		<div class="flex items-center">
			<span
				@click="today = today.subtract({ weeks: 1 })"
				class="material-symbols-outlined cursor-pointer hover:font-bold hover:text-green-500 hover:animate-bounce-left p-1 transition-all duration-200 select-none"
			>
				navigate_before
			</span>
			<span @click="today = Temporal.Now.plainDateISO()" class="px-2 cursor-pointer rounded hover:bg-gray-500 transition-all duration-200">
				{{ months[today.month - 1] + " " + today.year + " Week " + today.weekOfYear }}</span
			>
			<span
				@click="today = today.add({ weeks: 1 })"
				class="material-symbols-outlined cursor-pointer hover:font-bold hover:text-green-500 hover:animate-bounce-right p-1 transition-all duration-200 select-none"
			>
				navigate_next
			</span>
		</div>
		<div class="h-full flex flex-row flex-wrap m-1 items-start justify-start">
			<Day @alert="emit('alert')" :day="today.subtract({ days: today.dayOfWeek - 1 })"></Day>
			<Day @alert="emit('alert')" :day="today.subtract({ days: today.dayOfWeek - 2 })"></Day>
			<Day @alert="emit('alert')" :day="today.subtract({ days: today.dayOfWeek - 3 })"></Day>
			<Day @alert="emit('alert')" :day="today.subtract({ days: today.dayOfWeek - 4 })"></Day>
			<Day @alert="emit('alert')" :day="today.subtract({ days: today.dayOfWeek - 5 })"></Day>
			<Day @alert="emit('alert')" :day="today.subtract({ days: today.dayOfWeek - 6 })"></Day>
			<Day @alert="emit('alert')" :day="today.subtract({ days: today.dayOfWeek - 7 })"></Day>
		</div>
	</div>
</template>
