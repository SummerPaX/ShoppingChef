<script lang="ts">
import Navbar from "./components/Navbar.vue";
import Login from './components/account/login.vue'
import { accountStore } from "./stores/accountStore";

export default {
  setup() {
    const account = accountStore();

    return {
      account,
    };
  },
  components: { Navbar, Login },
};
</script>

<template>

  <router-view />
  <Login v-if="!account.authenticated" />
  <Navbar v-if="account.authenticated" />
</template>

<style></style>
