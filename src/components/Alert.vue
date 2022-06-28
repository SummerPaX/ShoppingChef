<script lang="ts" setup>
import { computed, ref } from "vue";
import { alertType } from "../types/constants";

const props = defineProps({
	message: String,
	type: String,
});

const emit = defineEmits(["close"]);

const closingStyle = ref(' ');
const closeAfter = setTimeout(() => close(), 6000);

const close = () => {
	closingStyle.value = ' opacity-0 -translate-y-10' ;
	clearTimeout(closeAfter);
	setTimeout(() => emit("close"), 1100);
}

// muss mit switch case sein weil sonst tailwind die css Komponenten nicht generiert!
// const bgColor = computed(()=>`bg-${props.type ?? 'neutral'}-300`)
const bgColor = computed<string>(() => {
	switch (props.type) {
		case alertType.SUCCESS:
			return "bg-primary-300";
		case alertType.INFO:
			return "bg-blue-300";
		case alertType.WARN:
			return "bg-yellow-300";
		case alertType.ERROR:
			return "bg-red-300";
		default:
			return "bg-neutral-300";
	}
});
const hoverColor = computed<string>(() => {
	switch (props.type) {
		case alertType.SUCCESS:
			return "hover:bg-primary-500/50";
		case alertType.INFO:
			return "hover:bg-blue-500/50";
		case alertType.WARN:
			return "hover:bg-yellow-500/50";
		case alertType.ERROR:
			return "hover:bg-red-500/50";
		default:
			return "hover:bg-neutral-500/50";
	}
});
</script>

<template>
	<div
		:class="bgColor + closingStyle"
		class="h-12 m-1 py-5 px-2 rounded flex items-center transition-all ease-in-out duration-1000 animate-slide-up"
	>
		<span class="mx-5"> {{ message }} </span>
		<button 
			@click="close" 
			:class="hoverColor" 
			class="material-symbols-outlined rounded-full p-1 transition-all ease-in-out"
		>close</button>
	</div>
</template>

<style></style>
