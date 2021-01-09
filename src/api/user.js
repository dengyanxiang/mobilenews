/**
 * 用户注册请求模块页面
 */
import request from '@/utils/request'
// // 在非组件模块中获取store必须通过单独加载这种方式加载  与在组件中的this.$store相同
// import store from '@/store/'
/**
 * 登录注册
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 发送短信验证码
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取登录用户信息
 */
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: { // 设置请求头
    //   authorizations: `Bearer ${store.state.user.token}`// 获取vuex容器中store中的state数据中的user的token数据
    // }
  })
}

/**
 * 获取文章列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
/**
 * 关注用户
 */
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId // 要关注的用户ID
    }
  })
}
/**
 * 获取消关注用户
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
/**
 * 获取用户个人资料
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
/**
 * 修改用户个人资料
 */
export const updataUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
