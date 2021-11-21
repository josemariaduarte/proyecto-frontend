import MovimientoCajaService from '@/services/movimiento_caja'

export default {
  state: {

  },

  mutations: {


  },

  actions: {

    cierreCaja: (_, ) => MovimientoCajaService.cierreCaja(),

  },

  getters: {

    getMovimientoCajaListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return MovimientoCajaService.getMovimientoCajaListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },

  }
}
