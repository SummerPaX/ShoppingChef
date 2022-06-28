<script lang="ts" setup>
import Day from "./Day.vue";
import { ref } from "vue";
import { Temporal } from "@js-temporal/polyfill";

const emit = defineEmits(["alert"]);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const today = ref(Temporal.Now.plainDateISO());
</script>

<template>
	<div class="absolute left-0 md:left-4 right-0 flex items-center justify-start flex-col h-screen overflow-auto scrollbar pt-5">
		<div class="md:flex hidden items-center">
			<span
				@click="today = today.subtract({ weeks: 1 })"
				class="material-symbols-outlined cursor-pointer hover:font-bold hover:text-primary-500 hover:animate-bounce-left p-1 transition-all duration-200 select-none"
			>
				navigate_before
			</span>
			<span @click="today = Temporal.Now.plainDateISO()" class="px-2 cursor-pointer rounded hover:bg-neutral-500 transition-all duration-200">
				{{ months[today.month - 1] + " " + today.year + " Week " + today.weekOfYear }}</span
			>
			<span
				@click="today = today.add({ weeks: 1 })"
				class="material-symbols-outlined cursor-pointer hover:font-bold hover:text-primary-500 hover:animate-bounce-right p-1 transition-all duration-200 select-none"
			>
				navigate_next
			</span>
		</div>
		<div class="hidden md:flex flex-row flex-nowrap m-1 items-start justify-start">
			<Day
				v-for="n in 7"
				:key="n"
				class="w-[11vw] lg:w-[12vw] 2xl:w-48 transition-all"
				@alert="emit('alert')"
				:day="today.subtract({ days: today.dayOfWeek - n })"
			></Day>
		</div>
		<div class="md:hidden flex items-center">
			<span
				@click="today = today.subtract({ days: 1 })"
				class="material-symbols-outlined cursor-pointer hover:font-bold hover:text-primary-500 hover:animate-bounce-left p-1 transition-all duration-200 select-none"
			>
				navigate_before
			</span>
			<span @click="today = Temporal.Now.plainDateISO()" class="px-2 cursor-pointer rounded hover:bg-neutral-500 transition-all duration-200">
				{{ days[(today.dayOfWeek ?? 0) - 1].substring(0, 3) + ", " + today.day + ". " + months[today.month - 1] + " " + today.year }}</span
			>
			<span
				@click="today = today.add({ days: 1 })"
				class="material-symbols-outlined cursor-pointer hover:font-bold hover:text-primary-500 hover:animate-bounce-right p-1 transition-all duration-200 select-none"
			>
				navigate_next
			</span>
		</div>
		<div class="absolute md:hidden flex flex-row flex-wrap m-1 items-start justify-start top-12 bottom-16 overflow-auto scrollbar">
			<Day class="w-[80vw] max-w-md" @alert="emit('alert')" :day="today"></Day>
		</div>
	</div>
</template>
