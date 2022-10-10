import loginApi from "../../api/loginApi";
import TokenUtil from "../../utils/helper/TokenUtil";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
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
    M_setToken(token) {
      this.$patch((state) => {
        state.token = token;
      });
    },

    // 设置角色
    M_setRoles(roles) {
      this.$patch((state) => {
        state.roles = roles;
      });
    },
    //设置权限
    M_setPermissions(permissions) {
      this.$patch((state) => {
        state.permissions = permissions;
      });
    },
    // 设置用户数据
    M_setUserData(userData) {
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
              this.M_setUserData(userData);
            }

            // 保存token 信息
            if (userData && userData.token) {
              this.M_setToken(userData.token);
              TokenUtil.setToken(userData.token);
            }

            // 必须要有角色信息, 没有角色默认角色
            this.M_setRoles(userData.roles || []);

            // 权限
            if (userData && userData.permissions) {
              this.M_setPermissions(userData.permissions);
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
        this.M_setToken("");
        this.M_setRoles([]);
        this.M_setPermissions([]);
        this.M_setUserData({});
        TokenUtil.removeToken();
        resolve(null);
      });
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
