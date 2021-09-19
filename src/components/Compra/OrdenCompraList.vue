<template>
    <v-layout >
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Órdenes de Compra</v-toolbar-title>
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
                    :items="clientes"
                    :search="search"
                    class="elevation-1">
                <template v-slot:item.opciones="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        open_in_new
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
  import {  mapGetters } from 'vuex'
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
        clientes: [],
        headers: [
          {text: 'Opciones', value: 'opciones', sortable: false},
          {text: 'Proveedor', value: 'proveedor_name', sortable: true},
          {text: 'Fecha', value: 'fecha', sortable: true},
          {text: 'Estado', value: 'estado', sortable: false},
        ],

      }
    },

    computed: {
      ...mapGetters([
        'getOrdenCompraListFromService'
      ]),

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

      listar () {
        this.getOrdenCompraListFromService(
          this.pagination.currentPage,
          this.pagination.perPage,

        ).then(res => {
          this.clientes = Object.assign([], res.data.results)
        })
      },

      redirectToAddView () {
        this.$router.push({ name: 'orden_compra_create'})
      },


      editItem(item) {
        // permite redirigir a la vista de edicion
        this.$router.push({ path: `/orden_compra/${item.id}`}, () => {})

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

