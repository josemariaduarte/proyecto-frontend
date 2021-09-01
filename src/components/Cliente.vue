<template>
    <v-layout >
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Clientes</v-toolbar-title>
                <v-divider class="mx-2" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search"
                              label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="nro_doc" label="Numero Documento"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="nombres" label="Nombres"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="apellidos" label="Apellidos"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="direccion" label="Direccion"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <div class="red--text" v-for="v in validarMensaje" :key="v" v-text="v">
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
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
                    :items="clientes"
                    :search="search"
                    class="elevation-1">
                <template v-slot:item.opciones="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        edit
                    </v-icon>
                    <v-icon v-if="item.activo" small class="mr-2" @click="activarDesactivarMostrar(2, item)">
                        block
                    </v-icon>
                    <v-icon v-if="!item.activo" small class="mr-2" @click="activarDesactivarMostrar(1, item)">
                        check
                    </v-icon>
                </template>

                <template v-slot:item.activo="{ item }">

                    <div v-if="item.activo">
                        <span class="blue--text">Activo</span>
                    </div>
                    <div v-else>
                        <span class="red--text">Inactivo</span>
                    </div>
                </template>

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
        clientes: [],
        headers: [
          {text: 'Opciones', value: 'opciones', sortable: false},
          {text: 'Documento', value: 'nro_doc', sortable: true},
          {text: 'Nombres', value: 'nombres', sortable: true},
          {text: 'Apellidos', value: 'apellidos', sortable: true},
          {text: 'Estado', value: 'activo', sortable: false},
        ],
        editedIndex: -1,
        _id: '',
        nro_doc: '',
        nombres: '',
        apellidos: '',
        direccion: '',
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
        'getClienteListFromService'
      ]),
      formTitle() {
        return this.editedIndex === -1 ? 'Nuevo Cliente' : 'Editar Cliente'
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
    },

    methods: {
      ...mapActions([
        'saveProveedor',
        'updateProveedor',
        'activateProveedor',
        'deactivateProveedor'
      ]),
      listar () {
        this.getClienteListFromService(
          this.pagination.currentPage,
          this.pagination.perPage,

        ).then(res => {
          this.clientes = Object.assign([], res.data.results)
        })
      },

      limpiar () {
        // limpiamos los atributos del formulario
        this._id='';
        this.razon_social='';
        this.direccion='';
        this.ruc='';
        // limpiamos los elementos de validacion
        this.valida=0;
        this.validarMensaje=[];
        //
        this.editedIndex = -1;
      },

      validar () {
        this.valida = 0;
        this.validarMensaje = [];
        if (this.razon_social.length <1 || this.razon_social.length >100) {
          this.validarMensaje.push('Razon social debe tener entre 1-100 caracteres')
        }
        if (this.ruc.length <1 || this.ruc.length > 20) {
          this.validarMensaje.push('RUC debe tener entre 1-20 caracteres')
        }
        if (this.direccion.length <1 || this.direccion.length > 100) {
          this.validarMensaje.push('Dirección debe tener entre 1-100 caracteres')
        }
        //
        if (this.validarMensaje.length) {
          this.valida = 1;
        }
        return this.valida;
      },

      guardar () {
        if (this.validar()){
          return;
        }

        if (this.editedIndex > -1) {
          // codigo para editar
          this.updateProveedor({
            'id': this._id,
            'razon_social': this.razon_social,
            'direccion': this.direccion,
            'ruc': this.ruc
          }).then(res =>{
            this.limpiar();
            this.close();
            this.listar();
          }).catch(err =>{
            console.log(err);
          });
        } else {
          // codigo para guardar
          this.saveProveedor({
            'razon_social': this.razon_social,
            'direccion': this.direccion,
            'ruc': this.ruc
          }).then(res =>{
            this.limpiar();
            this.close();
            this.listar();
          }).catch(err =>{
            console.log(err);
          });
        }
      },

      editItem(item) {
        console.log(item.id);
        this._id = item.id;
        this.razon_social = item.razon_social;
        this.direccion = item.direccion;
        this.ruc = item.ruc;
        //
        this.dialog = true;
        this.editedIndex = 1; // cuando esta variable es 1 significa que es para la edicion
      },

      activarDesactivarMostrar(action, item) {
        this.addModal = 1;   // controla para que se muestre el modal
        this.addNombre = item.razon_social;
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
        self.activateProveedor({
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

      desactivar () {
        let self=this;
        self.deactivateProveedor({
          'id': self.addId
        }).then(res =>{
          self.addModal=0;
          self.addAccion=0;
          self.addNombre='';
          self.addId='';
          self.listar();
        }).catch(err =>{
          console.log(err);
        });

      },


      close() {
        this.dialog = false
        // setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // }, 300)
      }
    },
  }
</script>

