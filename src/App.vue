<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";
import Login from "./components/account/LoginRegister.vue";
import { accountStore } from "./stores/accountStore";
import { recipeStore } from "./stores/recipeStore";
import Alert from "./components/Alert.vue";
import { ref } from "vue";
import { alertType } from "./types/constants";

const account = accountStore();
const recipe = recipeStore();

let alerts = ref([] as any[]);

function close(index: number) {
	alerts.value.splice(index, 1);
}
const addAlert = (message: string, type: string) => {
	console.error(message);

	alerts.value.push({
		message: message,
		type: type,
	});
};

account.sendAlert = addAlert;
recipe.sendAlert = addAlert;

// setTimeout(() => addAlert("Das ist ein Erfolg", alertType.SUCCESS), 2000);
// setTimeout(() => addAlert("Das ist ein Error", alertType.ERROR), 4000);
// setTimeout(() => addAlert("Das ist eine Warnung", alertType.WARN), 6000);
// setTimeout(() => addAlert("Das ist eine Information", alertType.INFO), 8000);
</script>

<template>
	<div v-if="account.authenticated">
		<router-view @alert="addAlert" class="md:ml-20 overflow-clip" />
		<Navbar />
	</div>
	<Login v-else />
	<div id="modalspace"></div>
	<div class="absolute bottom-10 w-screen left-0 flex flex-col justify-center items-center">
		<Alert v-for="(alert, index) in alerts" @close="close(index)" :key="index" :message="alert.message" :type="alert.type"></Alert>
	</div>
</template>
