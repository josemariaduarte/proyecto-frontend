<template>
    <v-layout >
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Compras</v-toolbar-title>
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
                    :items="compras"
                    :search="search"
                    class="elevation-1">
                <template v-slot:item.opciones="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        open_in_new
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
        compras: [],
        headers: [
          {text: 'Opciones', value: 'opciones', sortable: false},
          {text: 'Fecha', value: 'fecha', sortable: true},
          {text: 'Proveedor', value: 'proveedor_name', sortable: true},
          {text: 'Total', value: 'total', sortable: true},
        ],

      }
    },

    computed: {
      ...mapGetters([
        'getCompraListFromService'
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
        this.getCompraListFromService(
          this.pagination.currentPage,
          this.pagination.perPage,

        ).then(res => {
          this.compras = Object.assign([], res.data.results)
        })
      },

      redirectToAddView () {
        this.$router.push({ name: 'compra_create'})
      },


      editItem(item) {
        // permite redirigir a la vista de edicion
        this.$router.push({ path: `/compra/${item.id}`}, () => {})

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

