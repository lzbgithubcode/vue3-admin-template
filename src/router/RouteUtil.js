import { usePermissionStore } from '../store/modules/permission.js'
import router from './index.js'

export default {
  /**
   * 检测路由是否存在
   */
  routeIsLoaded(name) {
    // 检测有路由是否存在
    let existsName = name
    if (!existsName || existsName.length == 0) {
      return false
    } else {
      return router.hasRoute(name)
    }
  },

  /**
   * 通过角色获取路由
   */
  async generateRoutes(roles) {
    const permissionStore = usePermissionStore()

    // 动态路由
    const accessRoutes = await permissionStore.generateRoutes(roles)

    // 保存动态路由
    permissionStore.concatRoutes(accessRoutes)

    // 动态增加路由到导航中
    accessRoutes.forEach((route) => {
      router.addRoute(route)
    })

    console.log('加载的路由=========', router)

    return accessRoutes
  }
}
