import ProveedorService from '@/services/proveedor'

export default {
  state: {
    proveedor: {
      razon_social: null,
      ruc: null,
      direccion: null,
      activo: null
    },
    proveedorList: []
  },

  mutations: {
    setRazonSocial: (state, razon_social) => state.proveedor.razon_social = razon_social,

    setDireccion: (state, direccion) => state.proveedor.direccion = direccion,

    setRuc: (state, ruc) => state.proveedor.ruc = ruc,

    setActivo: (state, activo) => state.proveedor.activo = activo,

    setProveedorList: (state, proveedorList) => state.proveedorList = proveedorList

  },

  actions: {


    setRazonSocial: ({ commit }, razon_social) => { commit('setRazonSocial', razon_social) },

    setDireccion: ({ commit }, direccion) => { commit('setDireccion', direccion) },

    setRuc: ({ commit }, ruc) => { commit('setRuc', ruc) },

    setActivo: ({ commit }, activo) => { commit('setActivo', activo) },

    saveProveedor: async (_, proveedor) => ProveedorService.saveProveedor(proveedor),

    updateProveedor: (_, data) => { return ProveedorService.updateProveedor(data) },

    activateProveedor: (_, {id}) => ProveedorService.activateProveedor(id),

    deactivateProveedor: (_, {id}) => ProveedorService.deactivateProveedor(id),


  },

  getters: {

    getRazonSocial: (state) => state.proveedor.razon_social,


    getProveedorList: state => state.proveedorList,

    getProveedorListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return ProveedorService.getProveedorListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },



  }
}
