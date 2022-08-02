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
            component: () => import("@/views/redirect/index"),
          },
        ],
      },
      {
        path: BaseRoute.LOGIN_PATH,
        component: () => import("@/views/login/Login.vue"),
        hidden: true,
      },
    ];
  },
  /**
   * 获取动态路由
   */
  getAsyncRoutes() {
    return [];
  },
};
