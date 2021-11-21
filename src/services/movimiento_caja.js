import axios from 'axios'

export default class MovimientoCajaService {

  /**
   * Obtiene la lista de los movimientos de caja
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static baseUrl = 'movimientos/movimiento_caja'

  static async getMovimientoCajaListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}${this.baseUrl}?page=${page}&page_size=${page_size}`

    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }

  /**
   * cierre de caja
   */
  static async cierreCaja () {
    let string = `${process.env.VUE_APP_API}movimientos/update_movimientos_by_cierre/`

    return axios.post(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }



}
