import OrdenCompraService from '@/services/orden-compra'

export default {
  state: {

  },

  mutations: {


  },

  actions: {

    saveOrdenCompra: async (_, orden) => OrdenCompraService.saveOrdenCompra(orden),

  },

  getters: {


    getOrdenCompraListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return OrdenCompraService.getOrdenCompraListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },

    getOrdenCompraDetailFromService: () => async (id) => {
      if (localStorage.getItem('access')) {
        return OrdenCompraService.getOrdenCompraDetailService(id)
          .then(res => res)
          .catch(err => err)
      }
    },





  }
}
