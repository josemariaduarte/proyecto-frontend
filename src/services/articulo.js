import axios from 'axios'

export default class ArticuloService {

  /**
   * Obtiene la lista de todas las revisiones y aprobaciones, solo puede ver el superusuario
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static async getArticuloListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}productos/articulo?page=${page}&page_size=${page_size}`


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
  static async saveArticulo (data) {
    return axios.post(`${process.env.VUE_APP_API}productos/articulo/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * Modificar una categoria
   * @param {*} data Categoria a modificar
   */
  static async updateArticulo (data) {
    return axios.put(`${process.env.VUE_APP_API}productos/articulo/${data.id}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * Activar Categoria
   * @param {id} data categoria
   */

  static async activateArticulo (id) {
    return axios.post(`${process.env.VUE_APP_API}productos/articulo/${id}/activar/`, null, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * DesaActivar Categoria
   * @param {id} data categoria
   */

  static async deactivateArticulo (id) {
    return axios.post(`${process.env.VUE_APP_API}productos/articulo/${id}/inactivar/`, null,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }


  /**
   * Detalle de un cliente
   *  @param {id} cliente id
   */
  static async getArticuloDetailService (id) {
    let string = `${process.env.VUE_APP_API}productos/articulo/${id}`


    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }



}
