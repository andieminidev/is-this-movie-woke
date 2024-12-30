import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

console.log('Starting app initialization...')

const app = createApp(App)
app.mount('#app')

console.log('App mounted!')