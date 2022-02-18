import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css'
import zhLocale from 'element-plus/lib/locale/lang/zh-CN'
const vue = createApp(App)
vue.use(ElementPlus, {locale: zhLocale})
vue.use(router)
vue.mount('#app')
