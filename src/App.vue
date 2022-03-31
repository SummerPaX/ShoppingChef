<script lang="ts">
import Navbar from "./components/Navbar.vue";
import { accountStore } from "./stores/accountStore";

export default {
  setup() {
    const account = accountStore();

    return {
      account,
    };
  },
  components: { Navbar },
};
</script>

<template>

  <router-view />
  <Navbar v-if="account.authenticated" />
</template>

<style></style>
