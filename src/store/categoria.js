import CategoriaService from '@/services/categoria'

export default {
  state: {
    categoria: {
      nombre: null,
      descripcion: null,
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


    saveCategoria: async (_, categoria) => CategoriaService.saveCategoria(categoria),


  },

  getters: {

    getNombre: (state) => state.categoria.nombre,

    getDescripcion: (state) => state.categoria.descripcion,

    getCategoriaList: state => state.categoriaList,

    getCategoriaListFromService: () => async (page, page_size) => {
      console.log('al service');
      if (localStorage.getItem('access')) {
        return CategoriaService.getCategoriaListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },



  }
}
