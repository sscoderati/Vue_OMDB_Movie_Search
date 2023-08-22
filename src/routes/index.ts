import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from "vue-router";
import MainView from "./MainView.vue";
import MovieDetail from "./MovieDetail.vue";
import NotFound from "./NotFound.vue";

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: (
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedLoaded,
    savedPosition: NonNullable<unknown> | null,
  ) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.path === "/" && from.path.startsWith("/movie")) {
      return false;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: "/",
      component: MainView,
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
