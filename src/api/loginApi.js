import http from './http'

const baseURL = import.meta.env.VITE_BASE_API

export default {
  login(param) {
    return http.post(`${baseURL}/api/login`, param)
  },
  logout(param) {
    return http.post(`${baseURL}/api/logout`, param)
  }
}
