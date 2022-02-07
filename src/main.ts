import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
const vue = createApp(App)
vue.use(ElementPlus)
vue.use(router)
vue.mount('#app')
