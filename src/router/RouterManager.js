import Layout from "@/layout/index.vue";
import { BaseRoute } from "../utils/constants/RoutePathConstants";
export default {
  /**
   * 获取静态路由
   */
  getStaticRoutes() {
    return [
      {
        path: BaseRoute.REDIRECT_PATH,
        component: Layout,
        hidden: true,
        children: [
          {
            path: "/redirect/:path*",
            name: "Redirect",
            component: () => import("@/views/redirect/index"),
          },
        ],
      },
      {
        path: BaseRoute.LOGIN_PATH,
        name: "Login",
        component: () => import("@/views/login/Login.vue"),
        hidden: true,
      },
      {
        path: BaseRoute.ERROR.NO_PERMISSIONS_PATH,
        name: "401",
        component: () => import("@/views/error-page/401.vue"),
        hidden: true,
      },
      {
        path: BaseRoute.ERROR.NO_SOURCE_PATH,
        name: "404",
        component: () => import("@/views/error-page/404.vue"),
        hidden: true,
      },
    ];
  },
  /**
   * 获取动态路由
   */
  getAsyncRoutes() {
    return [
      {
        path: BaseRoute.ROOT_PATH,
        redirect: BaseRoute.FIX_PATH,
        component: Layout,
        children: [
          {
            path: "/home",
            name: "Home",
            component: () => import("@/views/home/Home.vue"),
            meta: { title: "控制台", elIcon: "House" },
          },
        ],
      },
      {
        path: "/nested",
        component: Layout,
        redirect: "/nested/menu1",
        name: "Nested",
        meta: {
          title: "Nested",
          elIcon: "ChatRound",
        },
        children: [
          {
            path: "menu1",
            component: () => import("@/views/nested/menu1/index.vue"), // Parent router-view
            name: "Menu1",
            redirect: "/nested/menu1/menu1-1",
            meta: { title: "Menu1" },
            children: [
              {
                path: "menu1-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-1/index.vue"),
                name: "Menu1-1",
                meta: { title: "Menu1-1" },
              },
              {
                path: "menu1-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/index.vue"),
                name: "Menu1-2",
                meta: { title: "Menu1-2" },
                // children: [
                //   {
                //     path: "menu1-2-1",
                //     component: () =>
                //       import(
                //         "@/views/nested/menu1/menu1-2/menu1-2-1/index.vue"
                //       ),
                //     name: "Menu1-2-1",
                //     meta: { title: "Menu1-2-1" },
                //   },
                //   {
                //     path: "menu1-2-2",
                //     component: () =>
                //       import(
                //         "@/views/nested/menu1/menu1-2/menu1-2-2/index.vue"
                //       ),
                //     name: "Menu1-2-2",
                //     meta: { title: "Menu1-2-2" },
                //   },
                // ],
              },
              {
                path: "menu1-3",
                component: () =>
                  import("@/views/nested/menu1/menu1-3/index.vue"),
                name: "Menu1-3",
                meta: { title: "Menu1-3" },
              },
            ],
          },
          {
            path: "menu2",
            component: () => import("@/views/nested/menu2/index.vue"),
            name: "Menu2",
            meta: { title: "menu2" },
          },
        ],
      },
    ];
  },
};
