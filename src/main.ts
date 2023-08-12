import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import './main.scss'
import App from './App.vue'

createApp(App).use(createPinia()).use(router).mount('#app')
