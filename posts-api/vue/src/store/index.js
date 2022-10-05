import Vue from 'vue'
import Vuex from 'vuex'
import {postModule} from "@/store/postModule";

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    post: postModule
  }
})
