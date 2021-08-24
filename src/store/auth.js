import axios from 'axios'
import router from '../router/index'
import { HTTP } from '@/utils/constants'
import AuthService from '../services/auth'
import jwtDecode from 'jwt-decode'



export default {
  state: {
    access: null,
    user: {},
    rol: null
  },
  mutations: {

    SET_USER (state, payload) {
      state.user = payload
    },

    SET_ACCESS_TOKEN(state, payload) {
      state.access = payload
    },

    SET_ROL (state, payload) {
      state.rol = payload
    },

  },
  actions: {

    login: async ({ commit, state }, payload) => {
      // eliminamos datos viejos de la cabecera en Authorization
      // delete axios.defaults.headers.common.Authorization

      const res = await AuthService.login(payload)
      if (res.status && res.status === HTTP.SUCCESS.OK) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`

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

    autoLogin({commit, dispatch}){
      // si tengo una variable en el local storage, que no me pida el token
      let token = localStorage.getItem("access");
      if (token) {
        commit("SET_ACCESS_TOKEN", token);
        router.push({name: 'home'});
      } else {
        dispatch('redirectToLogin')
      }
    },


    redirectToLogin: async () => {
      await router.push({ name: 'login' })
    },

    salir({commit}){
      // eliminar el token del local storage
      commit("SET_ACCESS_TOKEN", null);
      commit("SET_USER", null);
      commit('SET_ROL', null);
      localStorage.removeItem("access");
      router.push({name: 'login'});
    }

   


  }
}
