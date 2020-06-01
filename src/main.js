import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/global.css'
// 导入axios
import axios from 'axios'
// 配置请求的根路径
// axios.defaults.baseURL = '/api/'     //baseURL 的运行层级高于代理URL,如果存在baseURL,则不运行代理服务
/*
// 为每一次请求添加请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后return config
  return config
})
*/
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
