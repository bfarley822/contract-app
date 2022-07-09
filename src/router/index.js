import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Buy from "../views/Buy.vue";
import Sell from "../views/Sell.vue";
import Account from "../views/Account.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/buy",
    name: "Buy",
    component: Buy,
  },
  {
    path: "/sell",
    name: "Sell",
    component: Sell,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
