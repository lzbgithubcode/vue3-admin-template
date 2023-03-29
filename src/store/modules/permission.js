import { getAsyncRoutes, getStaticRoutes } from '../../router/RouterManager';
import { defineStore } from 'pinia';
const key = 'permission';
export const usePermissionStore = defineStore(key, {
  state: () => {
    return {
      routes: [], // 角色过滤之后的动态路由 + 静态路由
      addRoutes: [] // 角色过滤之后的动态路由
    };
  },
  actions: {
    /**
     * 根据角色过滤动态路由
     */
    generateRoutes(roles) {
      return new Promise((resolve) => {
        // 所有异步路由
        const asyncRoutes = getAsyncRoutes();

        // 通过角色过滤路由
        let accessedRoutes;
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        console.log('动态路由======', accessedRoutes);
        resolve(accessedRoutes);
      });
    },
    /**
     * 合并路由
     */
    concatRoutes(routes) {
      this.$patch((state) => {
        const constantRoutes = getStaticRoutes();
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
      });
    }
  },
  getters: {
    permissionAllRoutes: (state) => state.routes,
    permissionAddRoutes: (state) => state.addRoutes
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: key,
        storage: localStorage
      }
    ]
  }
});

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  }
  return true;
}

function filterAsyncRoutes(routes, roles) {
  const res = [];
  if (!routes || routes.length == 0) {
    return [];
  }
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}
