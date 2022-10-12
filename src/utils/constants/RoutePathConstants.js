/**
 * 基础路由
 */
export const BaseRoute = {
  /**
   * 根路由
   */
  ROOT_PATH: "/",
  /**
   *  固定路由- 默认路由-不删除-比如控制台
   */
  FIX_PATH: "/home",
  /**
   * 登录
   */
  LOGIN_PATH: "/login",

  /**
   * 中间路由
   */
  REDIRECT_PATH: "/redirect",

  /**
   * 错误路由
   */
  ERROR: {
    NO_SOURCE_PATH: "/404", // 没有资源
    NO_PERMISSIONS_PATH: "/401", // 没权限
  },
};
