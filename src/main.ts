//import './assets/main.css'
import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {inject} from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
inject()
injectSpeedInsights()

const app = createApp(App)
window.addEventListener('pagehide', () => {
  sessionStorage.setItem('scrollY', String(window.scrollY));
  console.log('saving scrollY:', window.scrollY);
});
app.use(createPinia())
app.use(router)

app.mount('#app')
