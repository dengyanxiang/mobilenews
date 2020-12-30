import axios from 'axios'
import JSONbig from 'json-bigint'
// 在非组件模块中获取store必须通过单独加载这种方式加载  与在组件中的this.$store相同
import store from '@/store/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  // axios 在内部会默认使用 JSONbig.parse 进行转换
  transformResponse: [function (data) {
    // 后端返回的数据可能不是JSON格式的数据，若果不是，使用JSONbig.parse会报错
    try {
      // 如果转换成功，则直接将结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转化失败，则原封不动的把数据进行返回
      return data
    }
  }]
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
