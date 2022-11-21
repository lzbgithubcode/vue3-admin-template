import axios from 'axios'
const baseURL = import.meta.env.VITE_BASE_API
const http = axios.create({
  timeout: 5000,
  baseURL: baseURL
})

// 请求拦截 - 请求头增加token
http.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(error)
  }
)

// 响应拦截 - 通用处理
http.interceptors.response.use(
  (response) => {
    if (response.status == 200 && response.data) {
      return response.data
    } else {
      return Promise.reject(new Error(response.status))
    }
  },
  (error) => {
    return Promise.reject(error.response.data)
  }
)

export default http
