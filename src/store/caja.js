import CajaService from '@/services/caja'

export default {
  state: {

  },

  mutations: {


  },

  actions: {

    saveCaja: async (_, caja) => CajaService.saveCaja(caja),

    deactivateCompra: (_, {id}) => CajaService.deactivateCaja(id),

  },

  getters: {


    getCajaListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return CajaService.getCajaListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },

  }
}
