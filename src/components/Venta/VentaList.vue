<template>
    <v-layout >
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Ventas</v-toolbar-title>
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

            </v-toolbar>
            <v-data-table
                    :headers="headers"
                    :items="ventas"
                    :search="search"
                    class="elevation-1">
                <template v-slot:item.opciones="{ item }">
<!--                    <v-icon small class="mr-2" @click="editItem(item)">-->
<!--                        open_in_new-->
<!--                    </v-icon>-->
                    <v-icon v-if="item.activo" small class="mr-2" @click="activarDesactivarMostrar(1, item)">
                        block
                    </v-icon>
                </template>



                <template v-slot:no-data>
                    <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>

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
                        <v-btn v-if="addAccion===1" @click="desactivar" color="orange darken-4" text="text">
                            Eliminar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
</template>
<script>
  import {  mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        pagination: {
          currentPage: parseInt(this.$route.query.page) || 1,
          perPage: parseInt(this.$route.query.page_size) || 100,
          perPageOptions: [10, 20, 30],
          total: 0
        },
        dialog: false,
        search: '',
        ventas: [],
        headers: [
          {text: 'Opciones', value: 'opciones', sortable: false},
          {text: 'Fecha', value: 'fecha', sortable: true},
          {text: 'Cliente', value: 'cliente_name', sortable: true},
          {text: 'Activo', value: 'activo', sortable: true},
          {text: 'Total', value: 'total', sortable: true},
        ],
        addModal: 0,
        addNombre: "",
        addId: 0,
        addAccion: 1
      }
    },

    computed: {
      ...mapGetters([
        'getVentaListFromService',
      ]),

      actionTitle() {
        return this.addAccion === 1 ? 'Eliminar Compra' : 'Habilitar Item'
      },
      getAction() {
        return this.addAccion === 1 ? 'eliminar' : 'habilitar'
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
        'deactivateCompra'
      ]),

      listar () {
        this.getVentaListFromService(
          this.pagination.currentPage,
          this.pagination.perPage,

        ).then(res => {
          this.ventas = Object.assign([], res.data.results)
        })
      },

      redirectToAddView () {
        this.$router.push({ name: 'venta_create'})
      },



      editItem(item) {
        // permite redirigir a la vista de edicion
        this.$router.push({ path: `/compra/${item.id}`}, () => {})

      },

      activarDesactivarMostrar(action, item) {
        this.addModal = 1;   // controla para que se muestre el modal
        this.addNombre = "Estas seguro que desea eliminar esta compra";
        this.addId = item.id;
        if (action === 1) {
          this.addAccion = 1;
        } else if (action === 2){
          this.addAccion = 2;
        } else{
          this.addModal = 0;
        }
      },

      close() {
        this.dialog = false
        // setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // }, 300)
      },

      activarDesactivarCerrar(){
        this.addModal=0;
      },


      desactivar () {
        let self=this;
        self.deactivateCompra({
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

    },
  }
</script>

