import Vue from 'vue'
import Vuex from 'vuex'
import {storeModule} from "@/store/storeModule";

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    post: storeModule,
  }
})
