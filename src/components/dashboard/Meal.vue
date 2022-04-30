<script lang="ts" setup>
const props = defineProps({
  mealType: String,
});
</script>

<template>
  <div class="h-24  bg-gray-300 dark:bg-gray-600 hover:bg-green-500 transition-colors duration-200 hover:text-white p-2 my-1 flex flex-col items-center justify-center rounded group  cursor-pointer">
    <div class="group-hover:font-medium">{{ mealType }}</div>
    <span class="material-symbols-outlined text-5xl text-white opacity-0 group-hover:opacity-100 h-0 group-hover:h-12 transition-all font-bold duration-200"> add </span>
  </div>
</template>
