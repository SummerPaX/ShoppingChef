<script>
import Login from "../components/account/Login.vue";
import {accountStore} from "../stores/accountStore"

export default {
	setup() {
		const account = accountStore();
		return {
			account,
		};
	},
};
</script>

<template>
<div class="flex h-screen flex-col justify-center items-center">
				<button @click="account.deleteUser"
					class="bg-red-600 hover:bg-red-700 p-2 m-4 w-40  text-white rounded-sm focus-visible:bg-red-700 focus-visible-green transition-all ease-in-out duration-200"
				>
					Delete User
				</button>
				<button @click="account.signOut"
					class="bg-red-600 hover:bg-red-700 p-2 m-4 w-40  text-white rounded-sm focus-visible:bg-red-700 focus-visible-green transition-all ease-in-out duration-200"
				>
					Sign Out
				</button>
</div>
</template>

<style></style>
