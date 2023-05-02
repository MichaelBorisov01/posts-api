import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import AppPost from './pages/Posts.vue'
import store from './store'
import vuetify from './plugins/vuetify'


const AppUser = resolve => {
  require.ensure(['./pages/Users'], () => {
    resolve(
      require('./pages/Users')
    )
  })
}

Vue.use(VueRouter)

const routes = [
  { path: '/post', component: AppPost, alias: '/' },
  { path: '/user', component: AppUser },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
