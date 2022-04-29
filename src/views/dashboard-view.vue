<script lang="ts" setup>
import { computed } from "@vue/reactivity";

const now = computed(() => Date.toString());
</script>

<template>
	<div class="dark:text-white text-center m-auto">
		<div class="flex flex-row justify-evenly items-center bg-gray-700 p-5">
			<h1 class="text-4xl">Wochenübersicht</h1>
			<h1 class="text-4xl">{{ new Date().toDateString() }}</h1>
		</div>
		<div class="h-screen flex flex-row flex-wrap items-start justify-center">
			<div class="flex flex-col justify-center m-1">
				<header class="w-48">Monday</header>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Breakfast</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Lunch</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Dinner</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Snacks</div>
			</div>
			<div class="flex flex-col justify-center m-1">
				<header class="w-48">Tuesday</header>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Breakfast</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Lunch</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Dinner</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Snacks</div>
			</div>
			<div class="flex flex-col justify-center m-1">
				<header class="w-48">Wednesday</header>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Breakfast</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Lunch</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Dinner</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Snacks</div>
			</div>
			<div class="flex flex-col justify-center m-1">
				<header class="w-48">Thursday</header>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Breakfast</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Lunch</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Dinner</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Snacks</div>
			</div>
			<div class="flex flex-col justify-center m-1">
				<header class="w-48">Friday</header>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Breakfast</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Lunch</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Dinner</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Snacks</div>
			</div>
			<div class="flex flex-col justify-center m-1">
				<header class="w-48">Saturday</header>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Breakfast</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Lunch</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Dinner</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Snacks</div>
			</div>
			<div class="flex flex-col justify-center m-1">
				<header class="w-48">Sunday</header>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Breakfast</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Lunch</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Dinner</div>
				<div class="h-24 w-full bg-gray-600 p-2 m-1 flex items-center justify-center rounded">Snacks</div>
			</div>
		</div>
	</div>
</template>
