import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storeage'

Vue.use(Vuex)
const USER_KEY = 'toutiao_user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY), // 装storeage.js用法
    // 当前登录用户的状态
    // user: JSON.parse(window.localStorage.getItem('user'))  未封装storeage.js之前的用法
    cachePages: ['LayoutIndex']
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, state.user)// 装storeage.js用法
      // 为了防止数据丢失，需要把数据放到本地进行存储，以便数据的长久使用
      // window.localStorage.setItem('user', JSON.stringify(state.user))  未封装storeage.js之前的用法
    },
    // 添加缓存页面
    addCachePages (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 清除缓存页面
    removeCachePages (state, pageName) {
      const index = state.cachePages.includes(pageName)
      if (index !== -1) {
        state.cachePages.splice(pageName)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
