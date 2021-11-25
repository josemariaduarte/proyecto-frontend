import axios from 'axios'

export default class CompraService {

  /**
   * Obtiene la lista de las ordenes de compra
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static baseUrl = 'movimientos/timbrado'
  static async getTimbradoListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}${this.baseUrl}?page=${page}&page_size=${page_size}`

    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }

}
