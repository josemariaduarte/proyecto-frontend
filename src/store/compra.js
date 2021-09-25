import CompraService from '@/services/compra'

export default {
  state: {

  },

  mutations: {


  },

  actions: {

    saveOrdenCompra: async (_, orden) => OrdenCompraService.saveOrdenCompra(orden),

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
