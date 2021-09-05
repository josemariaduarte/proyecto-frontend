import axios from 'axios'

export default class DepositoService {

  /**
   * Obtiene la lista de todas las revisiones y aprobaciones, solo puede ver el superusuario
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static async getDepositoListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}productos/deposito?page=${page}&page_size=${page_size}`


    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }


  /**
   * Registra una nueva categoria
   * @param {*} data Categoria a guardar
   */
  static async saveDeposito (data) {
    return axios.post(`${process.env.VUE_APP_API}productos/deposito/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * Modificar una categoria
   * @param {*} data Categoria a modificar
   */
  static async updateDeposito (data) {
    return axios.put(`${process.env.VUE_APP_API}productos/deposito/${data.id}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * Activar Categoria
   * @param {id} data categoria
   */

  static async activateDeposito (id) {
    return axios.post(`${process.env.VUE_APP_API}productos/deposito/${id}/activar/`, null, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * DesaActivar Categoria
   * @param {id} data categoria
   */

  static async deactivateDeposito (id) {
    return axios.post(`${process.env.VUE_APP_API}productos/deposito/${id}/inactivar/`, null,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }



}
