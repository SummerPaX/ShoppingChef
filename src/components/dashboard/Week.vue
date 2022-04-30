<script lang="ts" setup>
import Day from "./Day.vue";
import { computed } from 'vue'

const now = computed(() => {
  return Temporal.Now;
});
</script>

<template>
  <div class="flex items-center justify-start flex-col">
    <div class="flex items-center">
      <span class="material-symbols-outlined cursor-pointer hover:bg-gray-300 hover:rounded-full p-2 transition-all duration-200 select-none">
        date_range
      </span>
      <span class="px-2"> April 2022</span>
    </div>
    <div class="h-full flex flex-row flex-wrap m-1 items-start justify-start">
      <Day :day="now"></Day>
      <Day :day="now"></Day>
      <Day :day="now"></Day>
      <Day :day="now"></Day>
      <Day :day="now"></Day>
      <Day :day="now"></Day>
      <Day :day="now"></Day>
    </div>
  </div>
</template>
