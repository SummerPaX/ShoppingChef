<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import Week from "../components/dashboard/Week.vue";
const emit = defineEmits(["alert"]);
</script>

<template>
	<div class="relative dark:text-white text-center m-auto h-screen">
		<Week @alert="emit('alert')"></Week>
	</div>
</template>
