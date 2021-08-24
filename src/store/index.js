import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import categoria from "./categoria";

// export default auth

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    categoria
  },
});


export default store
