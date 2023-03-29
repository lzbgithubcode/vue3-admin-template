/*
 * @Author: lzb
 * @Date: 2022-06-30 21:58:02
 */

import Cookies from 'js-cookie';

const TokenKey = 'template-Token';

export default {
  /**
   * 保存token
   */
  setToken(token) {
    if (token) {
      localStorage.setItem(TokenKey, token);
      Cookies.set(TokenKey, token);
    }
  },

  /**
   * 获取token
   */
  getToken() {
    let token = Cookies.get(TokenKey);
    if (!token) {
      token = localStorage.getItem(TokenKey);
    }
    return token;
  },

  /**
   * 移除token
   */
  removeToken() {
    localStorage.removeItem(TokenKey);
    Cookies.remove(TokenKey);
  }
};
