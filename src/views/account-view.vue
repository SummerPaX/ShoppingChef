<script lang="ts">
import { accountStore } from "../stores/accountStore";
import { User } from "firebase/auth";

export default {
	setup() {
		const account = accountStore();
		const pass = '****************';
		return {
			account, pass
		};
	},
	computed: {
		getUser():User{
			console.log(this.account.getUser)
			return this.account.getUser as User;
		}
	}
};
</script>

<template>
	<div class="flex h-screen flex-col justify-center items-center dark:text-white">
		<img class="mt-20" :src="getUser.photoURL" :alt="getUser.displayName" srcset="">
		<h1 class="mt-5 mb-5 text-4xl">Account</h1>
		<div class="flex flex-col justify-start items-start mb-auto shrink-0">
			<div class="flex flex-row m-2 border-b">
				<h2 class="w-32">Name:</h2>
				<input disabled type="text" v-model="getUser.displayName" class="bg-inherit mr-5 w-56 grow" />
				<button class=" px-1 rounded-md bg-orange-600">Edit</button>
			</div>
			<div class="flex flex-row m-2 border-b">
				<h2 class="w-32">Email:</h2>
				<input disabled type="email"  v-model="getUser.email" class="bg-inherit mr-5 w-56 grow " />
				<button class=" px-1 rounded-md bg-orange-600">Edit</button>
			</div>
			<div class="flex flex-row m-2 border-b">
				<h2 class="w-32">Password:</h2>
				<input disabled type="password" v-model="pass" class="bg-inherit  mr-5 w-56 grow" />
				<button class=" px-1 rounded-md bg-orange-600">Edit</button>
			</div>
		</div>
		<button
			@click="account.deleteUser"
			class="bg-red-600 hover:bg-red-700 p-2 m-4 w-40 text-white rounded-sm focus-visible:bg-red-700 focus-visible-green transition-all ease-in-out duration-200"
		>
			Delete User
		</button>
		<button
			@click="account.signOut"
			class="bg-red-600 hover:bg-red-700 p-2 m-4 w-40 text-white rounded-sm focus-visible:bg-red-700 focus-visible-green transition-all ease-in-out duration-200 mb-20"
		>
			Sign Out
		</button>
	</div>
</template>

<style></style>
