import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {

    setToken(state, token){
      state.token=token;
    }
  },
  actions: {

    guardarToken({commit}, token){
      // permite almacenar en el local storage
      commit("setToken", token)
      localStorage.setItem("token", token)
    },

    autoLogin(){
      // si tengo una variable en el local storage, que no me pida el token
    },

    salir(){
      // eliminar el token del local storage
    }

   


  },
  modules: {
  }
})
