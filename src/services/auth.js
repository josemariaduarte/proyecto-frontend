import axios from 'axios'

export default class AuthService {
  static  async login (payload) {
    /**
     * Función que realiza una llamada al backend para obtener
     * el acceso del usuario.
     */
    return axios({
        method: 'POST',
        url: 'token/',
        data: payload,
        json: true,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
        },
      })
  }

  static async logout () {
    /**
     * Función para finalizar la sesión del usuario.
     */
    return await axios.post('logout/')
  }

  static async getUserPermissionsToken () {
    return await axios.get('/permission')
  }
}
