import { createRouter, createWebHashHistory } from "vue-router";
import HomeTab from "../components/HomeTab.vue";
import ProfileTab from "../components/ProfileTab.vue";
import SellTab from "../components/SellTab.vue";
import PayPage from "../components/PayPage.vue";
import WithdrawPage from "../components/WithdrawPage.vue";

const routes = [
  { path: "/", name: "home", component: HomeTab },
  { path: "/profile", name: "profile", component: ProfileTab },
  { path: "/sell", name: "sell", component: SellTab },
  { path: "/pay", name: "pay", component: PayPage },
  { path: "/with", name: "withdraw", component: WithdrawPage },
];

const router = createRouter({
  history: createWebHashHistory(), // Hash для GitHub Pages
  routes,
});

export default router;
