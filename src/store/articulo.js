import ArticuloService from '@/services/articulo'

export default {
  state: {
    categoria: {
      nombre: null,
      descripcion: null,
      proveedor: null,
      activo: null
    },
    categoriaList: []
  },

  mutations: {
    setNombre: (state, nombre) => state.categoria.nombre = nombre,

    setDescripcion: (state, descripcion) => state.categoria.descripcion = descripcion,

    setActivo: (state, activo) => state.categoria.activo = activo,

    setCategoriaList: (state, categoriaList) => state.categoriaList = categoriaList

  },

  actions: {


    setNombre: ({ commit }, nombre) => { commit('setNombre', nombre) },

    setDescripcion: ({ commit }, descripcion) => { commit('setDescripcion', descripcion) },

    setActivo: ({ commit }, activo) => { commit('setActivo', activo) },

    saveArticulo: async (_, articulo) => ArticuloService.saveArticulo(articulo),

    updateArticulo: (_, data) => { return ArticuloService.updateArticulo(data) },

    activateArticulo: (_, {id}) => ArticuloService.activateArticulo(id),

    deactivateArticulo: (_, {id}) => ArticuloService.deactivateArticulo(id),


  },

  getters: {

    getArticuloListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return ArticuloService.getArticuloListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },


    getArticuloDetailFromService: () => async (id) => {
      if (localStorage.getItem('access')) {
        return ArticuloService.getArticuloDetailService(id)
          .then(res => res)
          .catch(err => err)
      }
    },



  }
}
