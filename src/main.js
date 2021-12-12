import Vue from 'vue'
import App from './App.vue'
import router from './router'
import global_ from './views/global.vue'
Vue.prototype.GLOBAL = global_
Vue.config.productionTip = false
import ElementPlus from 'element-plus'
 import 'element-plus/dist/index.css'
 import { createApp } from 'vue'

createApp(App).use(router).use(ElementPlus).mount('#app')
new Vue({
  
  router,
  render: h => h(App)
}).$mount('#app')