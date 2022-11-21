import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import AppPost from './pages/Posts.vue'
import AppUser from './pages/Users.vue'
import store from './store'
import vuetify from './plugins/vuetify'


Vue.use(VueRouter)

const routes = [
    {path: '/post', component: AppPost, alias: '/'},
    {path: '/user', component: AppUser},
]

const router = new VueRouter({
    routes
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app')






