import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/question',
        name: 'question',
        component: () => import('@/views/question/')
      },
      {
        path: '/tv',
        name: 'tv',
        component: () => import('@/views/tv/')
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine/')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/views/article/')
  }

]
const router = new VueRouter({
  routes
})

export default router
