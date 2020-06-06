import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/global.css'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 导入切换路由时的进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入axios
import axios from 'axios'
// 配置请求的根路径
// axios.defaults.baseURL = '/api/'     //baseURL 的运行层级高于代理URL,如果存在baseURL,则不运行代理服务

// 为每一次请求添加请求拦截器
// 在request拦截器中 展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在response拦截器中 隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios
Vue.config.productionTip = false
// 注册为全局组件
Vue.component('tree-table', TreeTable)
// 注册为全局组件
Vue.use(VueQuillEditor)

Vue.filter('dateFormate', function(originVal) {
  var date = new Date(originVal)
  var y = date.getFullYear()
  var m = (date.getMonth() + 1).toString().padStart(2, '0') // 获取的月份范围是1-11
  var d = date.getDate().toString().padStart(2, '0') // what day is it today? getDay() 是获取星期几， what date... getDate()才是获取几号
  var h = date.getHours().toString().padStart(2, '0')
  var i = date.getMinutes().toString().padStart(2, '0')
  var s = date.getSeconds().toString().padStart(2, '0')

  // padStart从头补 padEnd从尾补
  return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
