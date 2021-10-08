import axios from 'axios'

export default class VentaService {

  /**
   * Obtiene la lista de las ventas
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static baseUrl = 'movimientos/venta'
  static async getVentaListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}${this.baseUrl}?page=${page}&page_size=${page_size}`


    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }

  /**
   * Detalle de venta
   *  @param {id} de compra id
   */
  static async getVentaDetailService (id) {
    let string = `${process.env.VUE_APP_API}${this.baseUrl}/${id}`


    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }


  /**
   * Registra una nueva venta
   * @param {*} data Venta a guardar
   */
  static async saveVenta(data) {
    return axios.post(`${process.env.VUE_APP_API}${this.baseUrl}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * Registra una nueva orden de compra
   * @param {*} data Orden Compra a guardar
   */
  static async updateVenta(data) {
    return axios.put(`${process.env.VUE_APP_API}${this.baseUrl}/${data.id}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }




  /**
   * DesaActivar Venta
   * @param {id} data venta
   */

  static async deactivateVenta (id) {
    return axios.post(`${process.env.VUE_APP_API}${this.baseUrl}/${id}/inactivar/`, null,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }




}
