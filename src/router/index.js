import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: { requiresAuth: false } // 表示是否路由需要登录 // 给路由添加额外的自定义数据
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/question',
        name: 'question',
        component: () => import('@/views/question/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/tv',
        name: 'tv',
        component: () => import('@/views/tv/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine/'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat/'),
    meta: { requiresAuth: true }
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 校验登录状态，提示用户
  if (to.meta.requiresAuth) {
    // 如果已登录，则直接通过
    if (store.state.user) {
      return next()
    }
    // 如果未登录，则提示登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能使用，确认是否登录'
    })
      .then(() => {
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRouter.fullPath
          }
        })
      })
      .catch(() => {
        // 取消就需要停止路由导航
        next(false)
      })
  } else {
    // 不需要登录的直接获取页面
    next()
  }
})
export default router
