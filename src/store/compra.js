import CompraService from '@/services/compra'

export default {
  state: {

  },

  mutations: {


  },

  actions: {

    saveCompra: async (_, compra) => CompraService.saveCompra(compra),

    updateCompra: (_, data) => {
      return CompraService.updateCompra(data)
    },

    deactivateCompra: (_, {id}) => CompraService.deactivateCompra(id),

  },

  getters: {


    getCompraListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return CompraService.getCompraListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },

    getCompraDetailFromService: () => async (id) => {
      if (localStorage.getItem('access')) {
        return CompraService.getCompraDetailService(id)
          .then(res => res)
          .catch(err => err)
      }
    },

    getTipoComprobanteListFromService: () => async () => {
      if (localStorage.getItem('access')) {
        return CompraService.getTipoComprobanteListService()
          .then(res => res)
          .catch(err => err)
      }
    },

    getImpuestoListFromService: () => async () => {
      if (localStorage.getItem('access')) {
        return CompraService.getImpuestoListService()
          .then(res => res)
          .catch(err => err)
      }
    },





  }
}
