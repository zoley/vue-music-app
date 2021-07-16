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
    name: 'Layout',
    children: [
      {
        path: '/recommend',
        name: 'Recommend',
        component: Recommend
      },
      {
        path: '/ranking',
        name: 'Ranking',
        component: () => import('../views/ranking/index')
      },
      {
        path: '/singer',
        name: 'Singer',
        component: () => import('../views/singer/index')
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('../views/search/index')
      }
    ]
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/mine/index')
  },
  {
    path: '/singer/detail/:mid',
    name: 'SingerDetail',
    component: () => import('../views/singer/detail/index')
  },
  {
    path: '/recommend/detail/:discId',
    name: 'RecommendDetail',
    component: () => import('../views/recommend/detail/index')
  },
  {
    path: '/ranking/detail/:topId',
    name: 'RankingDetail',
    component: () => import('../views/ranking/detail/index')
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
