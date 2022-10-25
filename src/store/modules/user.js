import loginApi from "../../api/loginApi";
import TokenUtil from "../../utils/helper/TokenUtil";
import { defineStore } from "pinia";
const key = "user";
export const useUserStore = defineStore(key, {
  state: () => {
    return {
      token: TokenUtil.getToken(),
      roles: [],
      permissions: [],
      userData: {},
    };
  },

  actions: {
    // 设置token
    setToken(token) {
      this.$patch((state) => {
        state.token = token;
      });
    },

    // 设置角色
    setRoles(roles) {
      this.$patch((state) => {
        state.roles = roles;
      });
    },
    //设置权限
    setPermissions(permissions) {
      this.$patch((state) => {
        state.permissions = permissions;
      });
    },
    // 设置用户数据
    setUserData(userData) {
      this.$patch((state) => {
        state.userData = userData;
      });
    },

    /**
     * 登录
     */
    login(requestParam) {
      return new Promise((resolve, reject) => {
        loginApi
          .login(requestParam)
          .then((res) => {
            const userData = res.data;

            // 保存用户数据
            if (userData) {
              this.setUserData(userData);
            }

            // 保存token 信息
            if (userData && userData.token) {
              this.setToken(userData.token);
              TokenUtil.setToken(userData.token);
            }

            // 必须要有角色信息, 没有角色默认角色
            this.setRoles(userData.roles || []);

            // 权限
            if (userData && userData.permissions) {
              this.setPermissions(userData.permissions);
            }

            resolve && resolve(res);
          })
          .catch((error) => {
            reject && reject(error);
          });
      });
    },

    /**
     * 退出
     */
    logout() {
      return new Promise((resolve, reject) => {
        const param = {
          userId: this.userData.userId,
        };
        loginApi
          .logout(param)
          .then((res) => {
            this.removeAllUserData();
            resolve && resolve(res);
          })
          .catch((error) => {
            reject && reject(error);
          });
      });
    },
    /**
     * 移除用户数据
     */
    resetUserStore() {
      return new Promise((resolve) => {
        this.setToken("");
        this.setRoles([]);
        this.setPermissions([]);
        this.setUserData({});
        TokenUtil.removeToken();
        resolve(null);
      });
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: key,
        storage: localStorage,
      },
    ],
  },
});
