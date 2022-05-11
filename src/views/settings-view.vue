<script lang="ts" setup>
import { User } from "firebase/auth";
import { accountStore } from "../stores/accountStore";
import { ref } from "vue";
import { alertType } from "../types/constants";


const account = accountStore();
const pass = ref("****************");
const getUser = ref(account.getUser as User);

const emit = defineEmits(["alert"]);

const deleteUser = () => {
	account.deleteUser();
	emit('alert', 'User Deleted', alertType.ERROR)
}

</script>

<template>
	<div class="flex h-screen flex-col justify-center items-center dark:text-white">
		<img class="mt-20 rounded-full" :src="getUser.photoURL ?? ''" :alt="'Profile Picture'"/>
		<h1 class="mt-5 mb-5 text-4xl">Account</h1>
		<div class="flex flex-col justify-start items-start mb-auto shrink-0">
			<div class="flex flex-row m-2 border-b">
				<h2 class="w-32">Name:</h2>
				<input disabled type="text" v-model="getUser.displayName" class="bg-inherit mr-5 w-56 grow" />
			</div>
			<div class="flex flex-row m-2 border-b">
				<h2 class="w-32">Email:</h2>
				<input disabled type="email" v-model="getUser.email" class="bg-inherit mr-5 w-56 grow" />
			</div>
			<div class="flex flex-row m-2 border-b">
				<h2 class="w-32">Password:</h2>
				<input disabled type="password" v-model="pass" class="bg-inherit mr-5 w-56 grow" />
			</div>
		</div>
			<!-- @click="account.deleteUser" -->
		<button
			@click="deleteUser"
			class="bg-red-600 hover:bg-red-700 p-2 m-4 w-40 text-white rounded-sm focus-visible:bg-red-700 focus-visible-primary transition-all ease-in-out duration-200"
		>
			Delete User
		</button>
		<button
			@click="account.signOut"
			class="bg-red-600 hover:bg-red-700 p-2 m-4 w-40 text-white rounded-sm focus-visible:bg-red-700 focus-visible-primary transition-all ease-in-out duration-200 mb-20"
		>
			Sign Out
		</button>
	</div>
</template>