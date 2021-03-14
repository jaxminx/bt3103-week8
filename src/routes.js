// Import the components you want to define routes for.
import Orders from "./components/Orders.vue";
import Home from "./components/Home.vue";
import Modify from "./components/Modify.vue";
import Dashboard from "./components/Dashboard.vue";

export default [
  { path: "/", component: Home },
  { path: "/orders", name: "orders", component: Orders },
  { path: "/modify/:id", name: "modify", component: Modify, props: true },
  { path: "/dashboard", name: "dashboard", component: Dashboard },
];
