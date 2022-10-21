import Vue from 'vue'
import Vuex from 'vuex'
import {postModule} from "@/store/postModule";
import {userModule} from "@/store/userModule";

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    post: postModule,
    user: userModule
  }
})
