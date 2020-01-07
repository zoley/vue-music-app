import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index'
import Recommend from '../views/recommend/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: () => import('../views/error/index'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/recommend',
    component: Layout,
    name: 'layout',
    children: [
      {
        path: '/recommend',
        name: 'recommend',
        component: Recommend
      },
      {
        path: '/ranking',
        name: 'ranking',
        component: () => import('../views/ranking/index')
      },
      {
        path: '/singer',
        name: 'singer',
        component: () => import('../views/singer/index')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('../views/search/index')
      }
    ]
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine/index')
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
