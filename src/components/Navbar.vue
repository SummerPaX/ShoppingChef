<script lang="ts" setup>
import { accountStore } from "../stores/accountStore";

const account = accountStore();
</script>

<template>
	<nav class="sidebar-nav">
		<div class="flex justify-center">
			<img src="..\assets\logo.svg" alt="" class="h-12 mt-5 mb-8 hidden md:flex" />
		</div>
		<router-link id="home" to="/" class="sidebar-icon group">
			<span class="material-symbols-outlined"> date_range </span>
			<span class="sidebar-tooltip group-hover:scale-100"> Overview </span>
		</router-link>
		<router-link id="lists" to="/lists" class="sidebar-icon group">
			<span class="material-symbols-outlined"> checklist </span>
			<span class="sidebar-tooltip group-hover:scale-100"> Shopping Lists </span>
		</router-link>
		<router-link id="recipes" to="/recipes" class="sidebar-icon group">
			<span class="material-symbols-outlined"> menu_book </span>
			<span class="sidebar-tooltip group-hover:scale-100"> Recipes </span>
		</router-link>
		<router-link id="favs" to="/favs" class="sidebar-icon group">
			<span class="material-symbols-outlined"> favorite </span>
			<span class="sidebar-tooltip group-hover:scale-100"> Favourites </span>
		</router-link>
		<router-link
			id="log-out"
			@click.prevent="account.signOut"
			to="/logout"
			class="sidebar-icon group hover:bg-red-600 hover:dark:bg-red-800 hidden md:flex text-red-500 md:mt-auto"
		>
			<span class="material-symbols-outlined rotate-180 "> logout </span>
			<span class="sidebar-tooltip group-hover:scale-100 text-red-500"> Log out </span>
		</router-link>
		<router-link id="settings" to="/settings" class="sidebar-icon group">
			<span class="material-symbols-outlined"> settings </span>
			<span class="sidebar-tooltip group-hover:scale-100"> Settings </span>
		</router-link>
	</nav>
</template>
