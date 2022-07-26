export default {
  /**
   * 路由是否已经被加载
   */
  routeIsLoaded(path) {
    // 检测有路由是否加入, 没有则加入;
    let existsPath = path;
    if (!existsPath) {
      console.log("111");
    }
    return true;
  },
  reloadRoutes() {},
};
