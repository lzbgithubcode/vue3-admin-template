import { createRouter, createWebHistory } from 'vue-router';
import { getStaticRoutes } from './RouterManager.js';

/**
 * 创建路由
 */
const createRouterFunc = () => {
  return createRouter({
    history: createWebHistory(),
    routes: getStaticRoutes(),
    scrollBehavior: (to, from, savedPosition) => {
      return new Promise((resolve) => {
        if (savedPosition) {
          return savedPosition;
        } else {
          if (from.meta.saveScrollTop) {
            const top = document.documentElement.scrollTop || document.body.scrollTop;
            resolve({ left: 0, top });
          }
        }
      });
    }
  });
};

const router = createRouterFunc();
// 重写路由的push方法 - 解决重复面包屑重复路由问题lzb
const routerPush = router.push;
router.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

/**
 * @description: 重置路由
 * @return {*}
 */
export function resetRouter() {
  const newRouter = createRouterFunc();
  // 重置路由
  router.matcher = newRouter.matcher;
}

export default router;
