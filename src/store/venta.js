import VentaService from '@/services/venta'

export default {
  state: {

  },

  mutations: {


  },

  actions: {

    saveVenta: async (_, data) => VentaService.saveVenta(data),

    updateVenta: (_, data) => {
      return VentaService.updateVenta(data)
    },

    deactivateVenta: (_, {id}) => VentaService.deactivateVenta(id),

  },

  getters: {

    getVentaListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return VentaService.getVentaListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },

    getVentaDetailFromService: () => async (id) => {
      if (localStorage.getItem('access')) {
        return VentaService.getVentaDetailService(id)
          .then(res => res)
          .catch(err => err)
      }
    },


  }
}
