import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import categoria from "./categoria";
import subCategoria from './sub-categoria'
import Proveedor from './proveedor'
import Cliente from './cliente'

// export default auth

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    categoria,
    subCategoria,
    Proveedor,
    Cliente
  },
});


export default store
