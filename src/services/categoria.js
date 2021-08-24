import axios from 'axios'

export default class CategoriaService {


  /**
   * Obtiene la lista de todas las revisiones y aprobaciones, solo puede ver el superusuario
   * @param {*} page pagina
   * @param {*} page_size parametro que debe de traer por pagina el listado
   */
  static async getCategoriaListService (page, page_size) {
    let string = `${process.env.VUE_APP_API}productos/categoria?page=${page}&page_size=${page_size}`


    return axios.get(string, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })

  }


}
