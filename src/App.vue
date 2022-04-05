<script lang="ts">
import Navbar from "./components/Navbar.vue";
import Login from './components/account/Login.vue'
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
  <router-view  v-if="account.authenticated" class="md:ml-20"/>
  <Navbar v-if="account.authenticated" />
  <Login v-if="!account.authenticated"/>
</template>

<style>

</style>
