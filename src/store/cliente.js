import ClienteService from '@/services/cliente'

export default {
  state: {
    cliente: {
      nro_doc: null,
      nombres: null,
      apellidos: null,
      fecha_nacimiento: null,
      telefono: null,
      sexo: null,
      direccion: null,
      estado_civil: null,
      correo: null,
      activo: null
    },
    clienteList: []
  },

  mutations: {
    setNroDoc: (state, nro_doc) => state.cliente.nro_doc = nro_doc,

    setNombres: (state, nombres) => state.cliente.nombres = nombres,

    setApellidos: (state, apellidos) => state.cliente.apellidos = apellidos,

    setFechaNacimiento: (state, fecha_nacimiento) => state.cliente.fecha_nacimiento = fecha_nacimiento,

    setTelefono: (state, telefono) => state.cliente.telefono = telefono,

    setSexo: (state, sexo) => state.cliente.sexo = sexo,

    setDireccion: (state, direccion) => state.cliente.direccion = direccion,

    setEstadoCivil: (state, estado_civil) => state.cliente.estado_civil = estado_civil,

    setCorreo: (state, correo) => state.cliente.correo = correo,

    setActivo: (state, activo) => state.cliente.activo = activo,

    setClienteList: (state, clienteList) => state.clienteList = clienteList

  },

  actions: {


    setNroDoc: ({ commit }, nro_doc) => { commit('setNroDoc', nro_doc) },

    setNombres: ({ commit }, nombres) => { commit('setNombres', nombres) },

    setApellidos: ({ commit }, apellidos) => { commit('setApellidos', apellidos) },

    setFechaNacimiento: ({ commit }, fecha_nacimiento) => { commit('setFechaNacimiento', fecha_nacimiento) },


    setTelefono: ({ commit }, telefono) => { commit('setTelefono', telefono) },

    setSexo: ({ commit }, sexo) => { commit('setSexo', sexo) },

    setDireccion: ({ commit }, direccion) => { commit('setDireccion', direccion) },

    setEstadoCivil: ({ commit }, estado_civil) => { commit('setEstadoCivil', estado_civil) },

    setCorreo: ({ commit }, correo) => { commit('setCorreo', correo) },


    setActivo: ({ commit }, activo) => { commit('setActivo', activo) },

    saveCliente: async (_, proveedor) => ClienteService.saveCliente(proveedor),

    updateCliente: (_, data) => { return ClienteService.updateCliente(data) },

    activateCliente: (_, {id}) => ClienteService.activateCliente(id),

    deactivateCliente: (_, {id}) => ClienteService.deactivateCliente(id),


  },

  getters: {


    getClienteList: state => state.clienteList,

    getClienteListFromService: () => async (page, page_size) => {
      if (localStorage.getItem('access')) {
        return ClienteService.getClienteListService(page, page_size)
          .then(res => res)
          .catch(err => err)
      }
    },



  }
}
