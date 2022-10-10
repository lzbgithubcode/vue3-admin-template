import { createRouter, createWebHistory } from "vue-router";
import RouterManager from "./RouterManager.js";

const createRouterFunc = () => {
  return createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: RouterManager.getStaticRoutes(),
  });
};
const router = createRouterFunc();
// 重写路由的push方法 - 解决重复面包屑重复路由问题lzb
const routerPush = router.push;
router.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};
export function resetRouter() {
  const newRouter = createRouterFunc();
  // 重置路由
  router.matcher = newRouter.matcher;
}

export default router;
