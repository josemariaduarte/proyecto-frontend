import SubCategoriaService from '@/services/sub-categoria'

export default {
  state: {
    subCategoria: {
      nombre: null,
      descripcion: null,
      categoria_producto: null,
      activo: null
    },
    categoriaList: []
  },

  mutations: {
    setNombre: (state, nombre) => state.subCategoria.nombre = nombre,

    setDescripcion: (state, descripcion) => state.subCategoria.descripcion = descripcion,

    setCategoriaProducto: (state, categoria_producto) => state.subCategoria.categoria_producto = categoria_producto,

    setActivo: (state, activo) => state.subCategoria.activo = activo,

    setCategoriaList: (state, categoriaList) => state.categoriaList = categoriaList

  },

  actions: {


    setNombre: ({ commit }, nombre) => { commit('setNombre', nombre) },

    setDescripcion: ({ commit }, descripcion) => { commit('setDescripcion', descripcion) },

    setActivo: ({ commit }, activo) => { commit('setActivo', activo) },

    setCategoriaProducto: ({ commit }, categoria_producto) => { commit('setCategoriaProducto', categoria_producto) },

    saveSubCategoria: async (_, categoria) => SubCategoriaService.saveSubCategoria(categoria),
    //
    updateSubCategoria: (_, data) => { return SubCategoriaService.updateSubCategoria(data) },
    //
    activateSubCategoria: (_, {id}) => SubCategoriaService.activateSubCategoria(id),
    //
    deactivateSubCategoria: (_, {id}) => SubCategoriaService.deactivateSubCategoria(id),


  },

  getters: {

    getNombreSubCategoria: (state) => state.subCategoria.nombre,

    getDescripcionSubCategoria: (state) => state.subCategoria.descripcion,


    getSubCategoriaListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return SubCategoriaService.getSubCategoriaListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },



  }
}
