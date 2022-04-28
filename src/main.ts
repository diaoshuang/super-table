import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhLocale from 'element-plus/lib/locale/lang/zh-CN'
import { createPinia } from 'pinia'
const vue = createApp(App)
vue.use(ElementPlus, {locale: zhLocale})
vue.use(router)
vue.use(createPinia())
vue.mount('#app')
