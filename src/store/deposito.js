import DepositoService from '@/services/deposito'

export default {
  state: {
    deposito: {
      nombre: null,
      descripcion: null,
      direccion: null,
      activo: null
    }
  },

  mutations: {
    setNombre: (state, nombre) => state.deposito.nombre = nombre,

    setDescripcion: (state, descripcion) => state.deposito.descripcion = descripcion,

    setDireccion: (state, direccion) => state.deposito.direccion = direccion,

    setActivo: (state, activo) => state.deposito.activo = activo,


  },

  actions: {


    setNombre: ({ commit }, nombre) => { commit('setNombre', nombre) },

    setDescripcion: ({ commit }, descripcion) => { commit('setDescripcion', descripcion) },

    setDireccion: ({ commit }, direccion) => { commit('setDireccion', direccion) },

    setActivo: ({ commit }, activo) => { commit('setActivo', activo) },

    saveDeposito: async (_, deposito) => DepositoService.saveDeposito(deposito),

    updateDeposito: (_, data) => { return DepositoService.updateDeposito(data) },

    activateDeposito: (_, {id}) => DepositoService.activateDeposito(id),

    deactivateDeposito: (_, {id}) => DepositoService.deactivateDeposito(id),


  },

  getters: {

    getNombreDeposito: (state) => state.deposito.nombre,

    getDescripcionDeposito: (state) => state.deposito.descripcion,

    getDireccion: (state) => state.deposito.direccion,

    getDepositoListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return DepositoService.getDepositoListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },



  }
}
