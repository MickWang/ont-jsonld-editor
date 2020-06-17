import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './../styles/index.scss'
// 导入组件库
import SButton from './../packages/button/index'
import JsonLdViewer from './../packages/JsonLDViewer/index'
import JsonLdEditor from './../packages/JsonLdEditor'


// 注册组件库
Vue.use(SButton)
Vue.use(JsonLdViewer)
Vue.use(JsonLdEditor)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')