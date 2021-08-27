import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store/auth'

import categoria from './store/categoria'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    overlay: false,
    alert: {
      type: null,
      message: null,
      show: false,
    },
  },


  modules: {
    auth,
    categoria
  },
})
