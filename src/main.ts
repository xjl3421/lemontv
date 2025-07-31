import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router' 
import { lazy } from './plugins/lazy.ts' 

import './style.css'

const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err, info)
}

// 全局警告处理
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Global warning:', msg, trace)
}

app.use(router).use(lazy)

app.mount('#app')
