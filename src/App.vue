<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";
import Login from "./components/account/LoginRegister.vue";
import { accountStore } from "./stores/accountStore";
import { recipeStore } from "./stores/recipeStore";
import Alert from "./components/Alert.vue";
import { alertType } from "./types/constants";
import { ref } from "vue";

const account = accountStore();
const recipe = recipeStore();

let alerts = ref([] as any[]);

function close(index: number) {
	alerts.value.splice(index, 1);
}
const addAlert = (message: string, type: string) => {
	alerts.value.push({
		message: message,
		type: type,
	});
};

account.sendAlert = addAlert;
recipe.sendAlert = addAlert;
</script>

<template>
	<div v-if="account.authenticated">
		<router-view @alert="addAlert" class="md:ml-20 overflow-clip" />
		<Navbar />
	</div>
	<Login v-else />
	<div class="absolute bottom-10 w-screen left-0 flex flex-col justify-center items-center">
		<Alert v-for="(alert, index) in alerts" @close="close(index)" :key="index" :message="alert.message" :type="alert.type"></Alert>
	</div>
</template>

<style></style>
