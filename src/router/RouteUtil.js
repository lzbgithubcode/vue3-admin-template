import router from "./index.js";

export default {
  /**
   * 检测路由是否存在
   */
  routeIsLoaded(name) {
    // 检测有路由是否存在
    let existsName = name;
    if (!existsName || existsName.length == 0) {
      return false;
    } else {
      return router.hasRoute(name);
    }
  },
  reloadRoutes() {
    debugger;
  },
};
