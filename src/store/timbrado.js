import TimbradoService from '@/services/timbrado'

export default {
  state: {

  },

  mutations: {


  },

  actions: {


  },

  getters: {


    getTimbradoListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return TimbradoService.getTimbradoListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },

  }
}
