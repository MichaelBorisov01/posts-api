import Vue from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import store from './store'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

/*components.forEach(component => {
    Vue.component(component.name, component)
})*/

new Vue({
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')






