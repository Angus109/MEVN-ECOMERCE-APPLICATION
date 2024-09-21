import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies'
import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App)
app.use(router)
app.use(Vuex)
app.use(Vue3Toastify, {
    autoClose: 3000,
  })
app.use(VueCookies, { expires: '7d'})
app.use(VueAxios, axios)
app.mount('#app')
