import UnidadMedidaService from "../services/unidad-medida";

export default {
  state: {
    unidad: {
      nombre: null,
      descripcion: null,
      activo: null
    }
  },

  mutations: {
    setNombre: (state, nombre) => state.categoria.nombre = nombre,

    setDescripcion: (state, descripcion) => state.categoria.descripcion = descripcion,

    setActivo: (state, activo) => state.categoria.activo = activo

  },

  actions: {


    setNombre: ({ commit }, nombre) => { commit('setNombre', nombre) },

    setDescripcion: ({ commit }, descripcion) => { commit('setDescripcion', descripcion) },

    setActivo: ({ commit }, activo) => { commit('setActivo', activo) },

    saveUnidadMedida: async (_, categoria) => UnidadMedidaService.saveUnidadMedida(categoria),

    updateUnidadMedida: (_, data) => { return UnidadMedidaService.updateUnidadMedida(data) },

    activateUnidadMedida: (_, {id}) => UnidadMedidaService.activateUnidadMedida(id),

    deactivateUnidadMedida: (_, {id}) => UnidadMedidaService.deactivateUnidadMedida(id),


  },

  getters: {


    getUnidadMedidaListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return UnidadMedidaService.getUnidadMedidaListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },



  }
}
