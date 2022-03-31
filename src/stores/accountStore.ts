import { defineStore } from "pinia";

export const accountStore = defineStore("accountStore", {
  state: () => ({
    authenticated: true,
    benis: "blue"
  })
});