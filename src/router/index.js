import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/login.vue')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/home.vue')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/welcome.vue')
const Users = () => import(/* webpackChunkName: "user_charcters_role" */ '../components/user/users.vue')
const Charcters = () => import(/* webpackChunkName: "user_charcters_role" */ '../components/rights/charcters.vue')
const Roles = () => import(/* webpackChunkName: "user_charcters_role" */ '../components/rights/roles.vue')
const Lists = () => import(/* webpackChunkName: "lists_goods_goodlists" */ '../components/goods/lists.vue')
const Goods = () => import(/* webpackChunkName: "lists_goods_goodlists" */ '../components/goods/goods.vue')
const AddGoods = () => import(/* webpackChunkName: "lists_goods_goodlists" */ '../components/goods/addGoods.vue')
const GoodLists = () => import(/* webpackChunkName: "lists_goods_goodlists" */ '../components/goods/goodLists.vue')
const Orders = () => import(/* webpackChunkName: "orders_reports" */ '../components/orders/orders.vue')
const Reports = () => import(/* webpackChunkName: "orders_reports" */ '../components/reports/reports.vue')

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
