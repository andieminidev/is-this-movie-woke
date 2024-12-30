import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

console.log('Starting app initialization...')

const app = createApp(App)
app.use(router)
app.mount('#app')

console.log('App mounted!')