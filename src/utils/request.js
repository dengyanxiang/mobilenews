import axios from 'axios'
// 在非组件模块中获取store必须通过单独加载这种方式加载  与在组件中的this.$store相同
import store from '@/store/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'// 基础路径
//   baseURL: 'http://3argj9.natappfree.cc/'
})
// 请求拦截
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 如果用户已经登录，同意设置token信息
  if (user) {
    config.headers.authorizations = `Bearer ${user.token}`
  }
  // 处理完以后要把config返回，否则请求就会停止
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截
export default request
