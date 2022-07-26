/*
 * @Author: lzb
 * @Date: 2022-07-01 15:10:52
 */

import RouterManager from "../../router/RouterManager";
import { defineStore } from "pinia";

export function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  }
  return true;
}

export function filterAsyncRoutes(routes, roles) {
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

export const usePermissionStore = defineStore("permission", {
  state: () => {
    return {
      routes: [], // 角色过滤之后的动态路由 + 静态路由
      addRoutes: [], // 角色过滤之后的动态路由
    };
  },
  actions: {
    generateRoutes(roles) {
      return new Promise((resolve) => {
        const asyncRoutes = RouterManager.getAsyncRoutes();

        // 通过角色过滤路由
        let accessedRoutes;
        if (roles.includes("admin")) {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }

        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        resolve(accessedRoutes);
      });
    },
    M_concatRoutes: (routes) => {
      this.$patch((state) => {
        const constantRoutes = RouterManager.getStaticRoutes();
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
      });
    },
  },
  getters: {
    permissionAllRoutes: (state) => state.routes,
    permissionAddRoutes: (state) => state.addRoutes,
  },
});
