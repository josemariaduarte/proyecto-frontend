import axios from 'axios'

export default class OrdenCompraService {

  /**
   * Obtiene la lista de las ordenes de compra
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static baseUrl = 'movimientos/orden_compra'
  static async getOrdenCompraListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}${this.baseUrl}?page=${page}&page_size=${page_size}`


    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }

  /**
   * Detalle de orden de compra
   *  @param {id} orden de compra id
   */
  static async getOrdenCompraDetailService (id) {
    let string = `${process.env.VUE_APP_API}${this.baseUrl}/${id}`


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
  static async saveOrdenCompra (data) {
    return axios.post(`${process.env.VUE_APP_API}${this.baseUrl}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }


}
