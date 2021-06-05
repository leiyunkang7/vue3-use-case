import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(Router).use(ElementPlus).mount('#app')
