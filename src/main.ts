import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

// 先初始化 Pinia
app.use(pinia)
// 再初始化其他插件
app.use(router)
app.use(Antd)

app.mount('#app')
