import axios from 'axios'

export default class CajaService {

  /**
   * Obtiene la lista de las cajas
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static baseUrl = 'movimientos/caja'
  static async getCajaListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}${this.baseUrl}?page=${page}&page_size=${page_size}`


    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }

  /**
   * Registra una nueva orden de compra
   * @param {*} data Orden Compra a guardar
   */
  static async saveCaja (data) {
    return axios.post(`${process.env.VUE_APP_API}${this.baseUrl}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }


  /**
   * DesaActivar Compra
   * @param {id} data compra
   */

  static async deactivateCaja (id) {
    return axios.post(`${process.env.VUE_APP_API}${this.baseUrl}/${id}/inactivar/`, null,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }
}
