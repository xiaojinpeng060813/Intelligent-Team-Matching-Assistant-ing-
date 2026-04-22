import { createApp } from 'vue'
import App from './App.vue'
import './style/global.css'
import './style/style.css'
import 'font-awesome/css/font-awesome.min.css'

const app = createApp(App)

app.mount('#app')

if (import.meta.env.DEV) {
  console.log('Vue 应用已成功挂载 🚀')
}