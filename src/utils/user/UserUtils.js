import { useUserStore } from "../../store/modules/user";
import { usePermissionStore } from "../../store/modules/permission";
/**
 * 登录
 */
export function login(param) {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore();
    userStore
      .login(param)
      .then((res) => {
        if (res.success && res.code === 0) {
          handleLoginSuccessData(res);
        }
        resolve && resolve(res);
      })
      .catch((error) => {
        reject && reject(error);
      });
  });
}

/**
 * 退出登录
 */
export function logout(param) {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore();
    userStore
      .logout(param)
      .then((res) => {
        if (res.success && res.code === 0) {
          handleLogOutSuccessData(res);
        }
        resolve && resolve(res);
      })
      .catch((error) => {
        reject && reject(error);
      });
  });
}

/**
 * 登录成功处理
 */
function handleLoginSuccessData(res) {
  console.log("登录成功------", res);
}

/**
 * 退出登录处理
 */
function handleLogOutSuccessData(res) {
  console.log("退出登录-------");
}
