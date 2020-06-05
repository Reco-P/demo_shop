import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/users.vue'
import Charcters from '../components/rights/charcters.vue'
import Roles from '../components/rights/roles.vue'
import Lists from '../components/goods/lists.vue'
import Goods from '../components/goods/goods.vue'
import GoodLists from '../components/goods/goodLists.vue'
import Orders from '../components/orders/orders.vue'
import Reports from '../components/reports/reports.vue'

import AddGoods from '../components/goods/addGoods.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      // 首页
      { path: '/welcome', component: Welcome },
      // 用户管理
      { path: '/users', component: Users },
      // 权限管理
      { path: '/charcters', component: Charcters },
      { path: '/roles', component: Roles },
      // 商品管理
      { path: '/lists', component: Lists },
      { path: '/goods', component: Goods },
      { path: '/addGoods', component: AddGoods },
      { path: '/goodLists', component: GoodLists },
      // 订单管理
      { path: '/orders', component: Orders },
      // 数据统计
      { path: '/reports', component: Reports }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数, 表示放行
  // 如果是登录页,直接放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token,强制跳转到登录页
  if (!tokenStr) return '/login'
  next()
})

export default router
