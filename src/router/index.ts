import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/dashboard-view.vue";
import Lists from "../views/lists-view.vue";
import Recipes from "../views/recipes-view.vue";
import Favourites from "../views/favs-view.vue";
import Settings from "../views/settings-view.vue";

const routes = [
  { path: "/lists", name: "Lists", component: Lists },
  { path: "/recipes", name: "Recipes", component: Recipes },
  { path: "/favs", name: "Favouritess", component: Favourites },
  { path: "/settings", name: "Settings", component: Settings },
  { path: '/logout', redirect: '/' },
  { path: "/:pathMatch(.*)*", name: "Dashboard", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
