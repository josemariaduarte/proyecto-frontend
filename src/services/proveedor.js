import axios from 'axios'

export default class ProveedorService {

  /**
   * Obtiene la lista de todas las revisiones y aprobaciones, solo puede ver el superusuario
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static async getProveedorListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}personas/proveedor?page=${page}&page_size=${page_size}`


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
  static async saveProveedor (data) {
    return axios.post(`${process.env.VUE_APP_API}personas/proveedor/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * Modificar una categoria
   * @param {*} data Categoria a modificar
   */
  static async updateProveedor (data) {
    return axios.put(`${process.env.VUE_APP_API}personas/proveedor/${data.id}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * Activar Categoria
   * @param {id} data categoria
   */

  static async activateProveedor (id) {
    return axios.post(`${process.env.VUE_APP_API}personas/proveedor/${id}/activar/`, null, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * DesaActivar Categoria
   * @param {id} data categoria
   */

  static async deactivateProveedor (id) {
    return axios.post(`${process.env.VUE_APP_API}personas/proveedor/${id}/inactivar/`, null,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }



}
