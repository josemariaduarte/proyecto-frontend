<template>
    <v-layout >
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Reporte de Compras</v-toolbar-title>
                <v-divider class="mx-2" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search"
                              label="Búsqueda" single-line hide-details></v-text-field>
            </v-toolbar>
            <v-data-table
                    :headers="headers"
                    :items="compras"
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
        compras: [],
        headers: [
          {text: 'Fecha', value: 'fecha', sortable: true},
          {text: 'Proveedor', value: 'proveedor_name', sortable: true},
          {text: 'Condicion', value: 'condicion_choices', sortable: true},
          {text: 'Total Gs', value: 'total', sortable: true},
        ],
        addModal: 0,
        addNombre: "",
        addId: 0,
        addAccion: 1
      }
    },

    computed: {
      ...mapGetters([
        'getCompraListFromService',
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
        this.getCompraListFromService(1, 1000).then(res => {
          this.compras = Object.assign([], res.data.results)
        })
      },
    },
  }
</script>

