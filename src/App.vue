<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";
import Login from "./components/account/LoginRegister.vue";
import { accountStore } from "./stores/accountStore";

const account = accountStore();
</script>

<template>
  <div v-if="account.authenticated">
    <router-view class="md:ml-20" />
    <Navbar />
  </div>
  <Login v-else />
</template>

<style></style>
