import axios from 'axios'

export default class CompraService {

  /**
   * Obtiene la lista de las ordenes de compra
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static baseUrl = 'movimientos/compra'
  static async getCompraListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}${this.baseUrl}?page=${page}&page_size=${page_size}`


    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }

  /**
   * Detalle de compra
   *  @param {id} de compra id
   */
  static async getCompraDetailService (id) {
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
  static async saveCompra (data) {
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
  static async updateCompra (data) {
    return axios.put(`${process.env.VUE_APP_API}${this.baseUrl}/${data.id}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }


  /**
   * Listado de Sexo Choices del backend
   */
  static async getTipoComprobanteListService () {
    let string = `${process.env.VUE_APP_API}movimientos/tipo_comprobante_choices/`

    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }

  /**
   * Listado de impuesto
   */
  static async getImpuestoListService () {
    let string = `${process.env.VUE_APP_API}movimientos/impuesto_choices/`

    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }



}
