<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";
import Login from "./components/account/LoginRegister.vue";
import { accountStore } from "./stores/accountStore";

const account = accountStore();
</script>

<template>
	<router-view v-if="account.authenticated" class="md:ml-20" />
	<Navbar v-if="account.authenticated" />
	<Login v-if="!account.authenticated" />
</template>

<style></style>
