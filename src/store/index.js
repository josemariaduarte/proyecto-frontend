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
import OrdenCompra from './orden-compra'
import Compra from './compra'
import Venta from './venta'

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
    Articulo,
    OrdenCompra,
    Compra,
    Venta
  },
});


export default store
