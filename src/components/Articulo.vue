<template>
    <v-layout >
        <v-flex>
            <v-toolbar flat color="white">
                <v-btn @click="crearPdf()">
                    <v-icon>print</v-icon>
                </v-btn>
                <v-toolbar-title>Articulos</v-toolbar-title>
                <v-divider class="mx-2" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search"
                              label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" @click.native="redirectToAddView()">Nuevo</v-btn>
                    </template>

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
                    :items="articulos"
                    :search="search"
                    class="elevation-1">
                <template v-slot:item.opciones="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        edit
                    </v-icon>

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
  import jsPDF from 'jspdf'
  import autoTable from 'jspdf-autotable'
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
        articulos: [],
        headers: [
          {text: 'Opciones', value: 'opciones', sortable: false},
          {text: 'Codigo', value: 'id', sortable: true},
          {text: 'Nombre', value: 'nombre', sortable: true},
          {text: 'Cantidad', value: 'cantidad', sortable: true},
          {text: 'Precio Venta', value: 'precio_venta', sortable: true},
          {text: 'Descripcion', value: 'descripcion', sortable: true},
        ],
        editedIndex: -1,
        _id: '',
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
        'getArticuloListFromService'
      ]),
      formTitle() {
        return this.editedIndex === -1 ? 'Nueva Categoria' : 'Editar Categoria'
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
        'saveCategoria',
        'updateCategoria',
        'activateCategoria',
        'deactivateCategoria'
      ]),
      crearPdf() {
        // permite exportar en pdf
        var columns = [
          {title:"Codigo", dataKey: "codigo"},
          {title: "Nombre", dataKey: "nombre"},
          {title: 'Cantidad', dataKey: 'cantidad'},
          {title: 'Precio Venta', dataKey: 'precio_venta'},
          {title: 'Descripcion', dataKey: 'descripcion'},
        ];
        var rows = [];
        this.articulos.map(function (x) {
          rows.push({
            codigo: x.id,
            nombre: x.nombre,
            cantidad: x.cantidad,
            precio_venta: x.precio_venta,
            precio_venta: x.precio_venta,
            descripcion: x.descripcion
          })
        })
        const doc = new jsPDF('p', 'pt');
        doc.autoTable(columns,rows,{
          margin: {top:60},
          addPageContent: function (data) {
            doc.text("Listado de Articulo", 40, 30);
          }
        })

        doc.save("Articulos.pdf");
      },
      listar () {
        this.getArticuloListFromService(
          1,
          100,
        ).then(res => {
          this.articulos = Object.assign([], res.data.results)
        })
      },

      redirectToAddView () {
        this.$router.push({ name: 'articulo_form'})
      },

      limpiar () {
        // limpiamos los atributos del formulario
        this._id='';
        this.nombre='';
        this.descripcion='';
        // limpiamos los elementos de validacion
        this.valida=0;
        this.validarMensaje=[];
        //
        this.editedIndex = -1;
      },

      validar () {
        this.valida = 0;
        this.validarMensaje = [];
        if (this.nombre.length <1 || this.nombre.length > 50) {
          this.validarMensaje.push('El nombre de la Categoria debe tener entre 1-50 caracteres')
        }
        if (this.descripcion.length > 255) {
          this.validarMensaje.push('La descripcion de la Categoria no debe tener mas de 250 caracteres')
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
          this.updateCategoria({
            'id': this._id,
            'nombre': this.nombre,
            'descripcion': this.descripcion
          }).then(res =>{
            this.limpiar();
            this.close();
            this.listar();
          }).catch(err =>{
            console.log(err);
          });
        } else {
          // codigo para guardar
          this.saveCategoria({
            'nombre': this.nombre,
            'descripcion': this.descripcion
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
        // permite redirigir a la vista de edicion
        this.$router.push({ path: `/articulo/${item.id}`}, () => {})

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
        self.activateCategoria({
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
        console.log('id ', self.addId);
        self.deactivateCategoria({
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

