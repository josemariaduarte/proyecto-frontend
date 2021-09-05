import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import categoria from "./categoria";
import subCategoria from './sub-categoria'
import Proveedor from './proveedor'
import Cliente from './cliente'
import Deposito from './deposito'
import UnidadMedida from './unidad-medida'
import Articulo from './articulo'

// export default auth

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    categoria,
    subCategoria,
    Proveedor,
    Cliente,
    Deposito,
    UnidadMedida,
    Articulo
  },
});


export default store
