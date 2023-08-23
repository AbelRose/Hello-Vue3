import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import router from './router'

const app = createApp(App)
// 完整引用 (打包的文件可能会大一些)
// app.use(ElementPlus)
app.use(router)
app.mount('#app')
