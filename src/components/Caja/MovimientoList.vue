<template>
    <v-layout >
        <v-flex>
            <v-alert
                    dense
                    text
                    type="success"
            >
                Monto acumulado del dia: <strong>{{ monto_acumulado_dia }} Gs.</strong> Para realizar el cierre presione el botón Cierre de Caja
            </v-alert>
            <v-toolbar flat color="white">
                <v-toolbar-title>Movimientos de Caja</v-toolbar-title>
                <v-divider class="mx-2" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search"
                              label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ on }">
                        <v-btn color="warning" dark class="mb-2" @click.native="redirectToCajaView()">Volver</v-btn>
                    </template>
                </v-dialog>
                <v-spacer/>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Cierre de Caja</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Cierre de Caja</span>
                        </v-card-title>
                        <v-card-text>
                            Monto Acumulado para cerrar: <strong>{{ monto_acumulado_dia }} Gs.</strong>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
                            <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog
                        v-model="addModal"
                        max-width="290">
                    <v-card>
                        <v-card-title class="headline">
                            {{ actionTitle }}
                        </v-card-title>
                        <v-card-text>
                            Estas a punto de {{ getAction }} el item {{ addNombre }}
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="activarDesactivarCerrar" color="green darken-1" text="text">
                                Cancelar
                            </v-btn>
                            <v-btn v-if="addAccion===1" @click="activar" color="orange darken-4" text="text">
                                Activar
                            </v-btn>
                            <v-btn v-if="addAccion===2" @click="desactivar" color="orange darken-4" text="text">
                                Desactivar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-toolbar>
            <v-data-table
                    :headers="headers"
                    :items="movimientos"
                    :search="search"
                    class="elevation-1">

                <template v-slot:no-data>
                    <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  // import axios from 'axios';
  export default {
    data() {
      return {
        pagination: {
          currentPage: parseInt(this.$route.query.page) || 1,
          perPage: parseInt(this.$route.query.page_size) || 10,
          perPageOptions: [10, 20, 30],
          total: 0
        },
        dialog: false,
        search: '',
        movimientos: [],
        monto_acumulado_dia: 0,
        headers: [
          {text: 'Fecha', value: 'fecha', sortable: true},
          {text: 'Monto', value: 'monto', sortable: true},
          {text: 'Tipo', value: 'tipo_name', sortable: false},
          {text: 'Comprobante', value: 'comprobante', sortable: false},
        ],
        editedIndex: -1,
        _id: '',
        monto: 0,
        nombre: '',
        descripcion: '',
        valida: 0,
        validarMensaje: [],
        addModal:0,
        addAccion:0,
        addNombre: '',
        addId: ''
      }
    },

    computed: {
      ...mapGetters([
        'getMovimientoCajaListFromService',
        'getFondosDiaFromService'
      ]),
      formTitle() {
        return this.editedIndex === -1 ? 'Nueva Caja' : 'Editar Caja'
      },

      actionTitle() {
        return this.addAccion === 1 ? 'Activar Item' : 'Desactivar Item'
      },
      getAction() {
        return this.addAccion === 1 ? 'activar' : 'desactivar'
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

    created() {
      this.listar()
      this.getFondosDelDia()
    },

    methods: {
      ...mapActions([
        'cierreCaja'
      ]),
      listar () {
        this.getMovimientoCajaListFromService(
          this.pagination.currentPage,
          this.pagination.perPage,
        ).then(res => {
          this.movimientos = Object.assign([], res.data.results)
        })
      },

      getFondosDelDia (){
        // obtener el monto en caja del dia
        let self = this;
        self.getFondosDiaFromService().then(res => {
          self.monto_acumulado_dia = res.data.acumulado
        })
      },

      limpiar () {
        // limpiamos los atributos del formulario
        this._id='';
        this.monto=0;
        // limpiamos los elementos de validacion
        this.valida=0;
        this.validarMensaje=[];
        //
        this.editedIndex = -1;
      },

      validar () {
        this.valida = 0;
        this.validarMensaje = [];
        if (parseFloat(this.monto) <=0) {
          this.validarMensaje.push('El monto debe ser mayor a cero')
        }
        if (this.validarMensaje.length) {
          this.valida = 1;
        }
        return this.valida;
      },

      guardar () {
        this.cierreCaja().then(res =>{
          this.redirectToCajaView();
        }).catch(err =>{
          console.log(err);
        });

      },

      activarDesactivarMostrar(action, item) {
        this.addModal = 1;   // controla para que se muestre el modal
        this.addNombre = item.nombre;
        this.addId = item.id;
        if (action === 1) {
          this.addAccion = 1;
        } else if (action === 2){
          this.addAccion = 2;
        } else{
          this.addModal = 0;
        }
      },

      activarDesactivarCerrar(){
        this.addModal=0;
      },

      activar () {
        let self=this;
        self.activateUnidadMedida({
          'id': self.addId
        }).then(res =>{
          self.addModal=0;
          self.addAccion=0;
          self.addNombre='';
          self.addId='';
          self.listar();
        }).catch(err =>{
          console.log(err);
        })
      },



      close() {
        this.dialog = false
        this.limpiar()

      },

      redirectToCajaView () {
        this.$router.push({ name: 'caja'})
      },
    },
  }
</script>

