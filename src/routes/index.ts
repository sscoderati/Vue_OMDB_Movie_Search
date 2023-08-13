import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import MovieDetail from "./MovieDetail.vue";
import NotFound from "./NotFound.vue";

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/movie/:id",
      component: MovieDetail,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
});
