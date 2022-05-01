<script lang="ts" setup>
const props = defineProps({
	mealType: String,
});
</script>

<template>
	<div
		class="h-24 bg-gray-300 dark:bg-gray-600 hover:bg-green-500 transition-all duration-200 hover:text-white p-2 mt-1 flex flex-col items-center justify-center group cursor-pointer overflow-clip"
	>
		<div class="group-hover:font-medium transition-all duration-200">{{ mealType }}</div>
		<span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 text-xs group-hover:text-5xl translate-y-10 group-hover:translate-y-0 transition-all font-bold duration-200">
			add
		</span>
	</div>
</template>
