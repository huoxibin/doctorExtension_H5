import Vue from "vue";
import Router from "vue-router";
import routes from "./router";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/index",
      name: "home",
      // component: () => import("../views/index/index")
      component: () => import("../views/layout/index"),
      children: routes
    },
    // {
    //   path: "/moreVideo",
    //   name: "moreVideo",
    //   component: () => import("../views/moreVideo/index")
    // }
  ]
});
