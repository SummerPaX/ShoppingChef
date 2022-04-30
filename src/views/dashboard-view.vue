<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import Week from "../components/dashboard/Week.vue"

const now = computed(() => Date.toString());
</script>

<template>
	<div class="dark:text-white text-center m-auto">
		<div class="flex flex-row justify-evenly items-center bg-gray-300 dark:bg-gray-700 shadow p-5 mb-5">
			<h1 class="text-4xl">Overview</h1>
			<h1 class="text-4xl">{{ new Date().toDateString() }}</h1>
		</div>
		<Week></Week>
	</div>
</template>