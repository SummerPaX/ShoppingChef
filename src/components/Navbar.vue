<script lang="ts" setup>
import { accountStore } from "../stores/accountStore";

const account = accountStore();

</script>

<template>
	<nav class="sidebar-nav">    
			<div class="flex justify-center">
				<img src="..\assets\logo.png" alt="" class="h-12 mb-8" />
			</div>
		<router-link id="home" to="/" class="sidebar-icon material-symbols-outlined font-bold"> date_range </router-link>
		<router-link id="lists" to="/lists" class="sidebar-icon material-symbols-outlined font-bold"> checklist </router-link>
		<router-link id="recipes" to="/recipes" class="sidebar-icon material-symbols-outlined font-bold"> menu_book </router-link>
		<router-link id="log-out" @click.prevent="account.signOut"  to="/logout" class="sidebar-icon hover:bg-red-800 text-red-500 rotate-180 md:mt-auto material-symbols-outlined font-bold"> logout </router-link>
		<router-link id="settings" to="/settings" class="sidebar-icon material-symbols-outlined font-bold"> settings </router-link>
	</nav>
</template>
