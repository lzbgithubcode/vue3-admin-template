/*
 * @Author: lzb
 * @Date: 2022-06-30 21:24:22
 */
import router from './router';
import ProgressUtil from './utils/helper/ProgressUtil';
import { getPageTitle } from './utils/helper/PageUtil';
import TokenUtil from './utils/helper/TokenUtil';
import RouteUtil from './router/RouteUtil.js';
import { BaseRoute } from './utils/constants/RoutePathConstants';
import { useUserStore } from './store/modules/user';

// 进度条配置
ProgressUtil.initProgress();

// 不验证token的白名单
const whiteNoTokenList = [BaseRoute.LOGIN_PATH, BaseRoute.ERROR.NO_SOURCE_PATH];

router.beforeEach(async (to) => {
  // console.log("路由守卫=======", to, router.getRoutes());
  // 开始进度条
  ProgressUtil.startProgress();

  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

  // 1. 不用校验token的白名单 + 路由存在
  if (whiteNoTokenList.indexOf(to.path) !== -1) {
    ProgressUtil.stopProgress();
    return true;
  }

  // 2.检测是否有token 检测是否登录, 存储于cookie中
  const token = TokenUtil.getToken();
  if (!token) {
    // 无token 跳转到登录
    ProgressUtil.stopProgress();
    return `/login?redirect=${to.path}`;
  }

  // 3. 有token -> 判断路由加载
  const isLoaded = RouteUtil.routeIsLoaded(to.name);

  // 判断是否有角色
  const useStore = useUserStore();
  const hasRoles = useStore.roles && useStore.roles.length > 0;

  // 4. 有角色  且路由已经增加
  const isHas = hasRoles && isLoaded;
  if (isHas) {
    return true;
  } else {
    // 路由没有加载
    try {
      // 动态获取路由
      await RouteUtil.generateRoutes(useStore.roles);
      //  加载完成还是有路由
      if (!RouteUtil.routeIsLoaded(to.name)) {
        return { ...to, replace: true };
      } else {
        // 加载完成还是没有 - 找不到资源
        return BaseRoute.ERROR.NO_SOURCE_PATH;
      }
    } catch (error) {
      // 移除登录数据
      await useStore.resetUserStore();
      ProgressUtil.stopProgress();
      console.log('路由加载失败', error);
      return `/login?redirect=${to.path}`;
    }
  }
});

router.afterEach(() => {
  // 跳转结束
  ProgressUtil.stopProgress();
});

router.onError((error) => {
  console.log('监听到导航出错了啦-----', error);
});
