<script lang="ts" setup>
const props = defineProps({
	loading: {
		type: Boolean,
		default: true,
	},
	color: {
		type: String,
		default: "bg-primary-500",
	},
});

console.log(props.color);
</script>

<template>
	<div v-show="loading" class="flex relative w-20 h-3">
		<div :class="color" class="absolute w-3 h-3 rounded-full left-2 first"></div>
		<div :class="color" class="absolute w-3 h-3 rounded-full left-2 moving"></div>
		<div :class="color" class="absolute w-3 h-3 rounded-full left-8 moving"></div>
		<div :class="color" class="absolute w-3 h-3 rounded-full left-14 last"></div>
	</div>
</template>

<style scoped>
.first {transition-timing-function: ease;
	animation: appear 0.6s infinite;
}
.moving {
	transition-timing-function: ease;
	animation: move-right 0.6s infinite;
}
.last {transition-timing-function: ease;
	animation: dissappear 0.6s infinite;
}
@keyframes appear {
	0% {
		transform: scale(0);
	}
	100% {
		transform: scale(1);
	}
}
@keyframes dissappear {
	0% {
		transform: scale(1);
	}
	100% {
		transform: scale(0);
	}
}
@keyframes move-right {
	0% {
		transform: translate(0, 0);
	}
	100% {
		transform: translate(24px, 0);
	}
}
</style>
