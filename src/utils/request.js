import axios from 'axios'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
// 在非组件模块中获取store必须通过单独加载这种方式加载  与在组件中的this.$store相同
import store from '@/store/'
import router from '@/router'
const refleshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
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
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 响应请求成功进入这里
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // 请求失败进入这里
  const status = error.reject.status
  if (status === 400) {
    // 客户端参数异常
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    // token 无效
    // 如果没有user 或者 user.token,直接去登录
    const { user } = store.state
    if (!user || user.token) {
      // 则直接跳转到登录页面
      return redirectLogin()
    }
    // 使用refresh_token重新获取新的token
    try {
      const { data } = await refleshTokenReq({
        url: '/app/v1_0/authorizations',
        method: 'PUT',
        headers: {
          Authorizations: `Bearer ${user.reflesh_token}`
        }
      })
      // 把新拿到的token更新到容器中
      user.token = data.data.token
      store.commit('setUser', user)
      // 把错误的请求发出去
      // error.config 本次请求的相关配置对象
      return request(error.config)
    } catch (err) {
      // 当刷新token失败了，则直接跳转到登录页
      redirectLogin()
    }
  } else if (status === 403) {
    // 没有权限操作
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    // 服务器端问题
    Toast.fail('服务器异常，请稍后重试')
  }
  // 超过2XX的状态码进入这里 例如，30几。40及。。。。
  return Promise.reject(error)
})
function redirectLogin () {
  router.replace({
    name: 'login',
    // 传递查询参数，查询参数会以 ？ 形式添加到URL的后面
    query: {
      // redirect 是自己起的参数名   router.currentRouter与组件内部的 this.$route 是同一个东西
      redirect: router.currentRouter.fullPath // 当前的路路径
    }
  })
}
export default request
