<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import Week from "../components/dashboard/Week.vue";

const now = computed(() => Date.toString());
</script>

<template>
	<div class="dark:text-white text-center m-auto h-screen pt-5 overflow-clip">
		<Week></Week>
	</div>
</template>
