import axios from 'axios'

export default class SubCategoriaService {

  /**
   * Obtiene la lista de todas las revisiones y aprobaciones, solo puede ver el superusuario
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static async getSubCategoriaListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}productos/sub_categoria?page=${page}&page_size=${page_size}`


    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }


  /**
   * Registra una nueva sub categoria
   * @param {*} data Categoria a guardar
   */
  static async saveSubCategoria (data) {
    return axios.post(`${process.env.VUE_APP_API}productos/sub_categoria/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * Modificar una categoria
   * @param {*} data Categoria a modificar
   */
  static async updateSubCategoria (data) {
    return axios.put(`${process.env.VUE_APP_API}productos/sub_categoria/${data.id}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * Activar Categoria
   * @param {id} data categoria
   */

  static async activateSubCategoria (id) {
    return axios.post(`${process.env.VUE_APP_API}productos/sub_categoria/${id}/activar/`, null, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }

  /**
   * DesaActivar Categoria
   * @param {id} data categoria
   */

  static async deactivateSubCategoria (id) {
    return axios.post(`${process.env.VUE_APP_API}productos/sub_categoria/${id}/inactivar/`, null,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
  }



}
