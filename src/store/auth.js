import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import router from '../router/index'
import { HTTP } from '@/utils/constants'
import AuthService from '../services/auth'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access: null,
    user: {},
    rol: null
  },
  mutations: {

    SET_USER (state, payload) {
      state.user = payload
    },

    SET_ACCESS_TOKEN (state, payload) {
      state.access = payload
    },

    SET_ROL (state, payload) {
      state.rol = payload
    },

  },
  actions: {

    login: async ({ commit, state }, payload) => {
      // eliminamos datos viejos de la cabecera en Authorization
      delete axios.defaults.headers.common.Authorization

      const res = await AuthService.login(payload)
      if (res.status && res.status === HTTP.SUCCESS.OK) {
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.access}`

        const decode = jwtDecode(res.data.access)
        commit('SET_USER', {
          id: decode.user_id,
          username: decode.username,
        })
        if (decode.is_superuser) {
          commit ('SET_ROL', 'ADMINISTRADOR')
        } 
        // 
        if (decode.groups) {
          commit('SET_ROL', decode.groups)
        }
        commit('SET_ACCESS_TOKEN', res.data.access)
        localStorage.setItem('access', res.data.access)
      }
      return res
    },

    guardarToken({commit}, token){
      // permite almacenar en el local storage
      commit("setToken", token)
      localStorage.setItem("token", token)
    },

    autoLogin(){
      // si tengo una variable en el local storage, que no me pida el token
      let token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token)
      }
      // redireccionamos al home
      router.push({name: 'home'});
    },

    salir(){
      // eliminar el token del local storage
      commit("setToken", null)
      localStorage.removeItem("token");
      router.push({name: 'login'});
    }

   


  },
  modules: {
  }
})
