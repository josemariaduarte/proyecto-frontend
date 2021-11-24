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
                <v-dialog v-model="comprobanteModal" max-width="1000px">
                    <v-card>
                        <v-card-title class="headline">
                            <v-btn>
                                <v-icon>print</v-icon>
                            </v-btn> <v-spacer/>Factura de Venta
                        </v-card-title>
                        <v-card-text>
                            <div id="factura">
                                <header>
                                    <div id="logo">
                                        <img src="@/assets/logo.svg" id="imagen">

                                    </div>
                                    <div id="datos">
                                        <p id="encabezado">
                                            <b>Negocio</b><br>Doctor Montanaro, Asuncion, Paraguay<br>Telefono:(0981)467-987<br>Email:negocio@prueba.com
                                        </p>
                                    </div>
                                    <div id="fact">
                                        <p>{{ tipo_comprobante }}<br>
                                            {{ numero_comprobante }}<br>
                                            {{ fecha }}</p>
                                    </div>
                                </header>
                                <br>
                                <section>
                                    <div>
                                        <table id="facliente">
                                            <tbody>
                                            <tr>
                                                <td id="cliente">
                                                    <strong>Nombre o Razon Social: </strong>{{ cliente }}<br>
                                                    <strong>Documento:</strong> {{ cliente_documento }}<br>
                                                    <strong>Dirección:</strong> {{ cliente_direccion }}<br>
                                                    <strong>Teléfono:</strong> {{ cliente_telefono }}<br>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                                <br>
                                <section>
                                    <div>
                                        <table id="facarticulo">
                                            <thead>
                                            <tr id="fa">
                                                <th>CANT</th>
                                                <th>DESCRIPCION</th>
                                                <th>PRECIO UNIT</th>
                                                <th>IVA </th>
                                                <th>PRECIO TOTAL</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="det in detalles" :key="det.id">
                                                <td style="text-align:center;">{{ det.cantidad }}</td>
                                                <td>{{ det.producto_name }}</td>
                                                <td style="text-align:right;">{{ det.producto_precio_venta }}</td>
                                                <td style="text-align:right;">{{ det.impuesto }}</td>
                                                <td style="text-align:right;">{{ det.total }}</td>
                                            </tr>
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th style="text-align:right;">IVA 5 %</th>
                                                <th style="text-align:right;">{{ total_iva5 }}</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th style="text-align:right;">IVA 10 %</th>
                                                <th style="text-align:right;">{{ total_iva10 }}</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th style="text-align:right;">TOTAL</th>
                                                <th style="text-align:right;">{{ total }} Gs</th>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </section>
                                <br>
                                <br>
                                <footer>
                                    <div id="gracias">
                                        <p><b>Gracias por su compra!</b></p>
                                    </div>
                                </footer>
                            </div>

                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="blue darken-1" flat>Cancelar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-toolbar>
            <v-data-table
                    :headers="headers"
                    :items="ventas"
                    :search="search"
                    class="elevation-1">
                <template v-slot:item.opciones="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        open_in_new
                    </v-icon>
                    <v-icon small class="mr-2" @click="mostrarComprobante(item)">
                        print
                    </v-icon>
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
                         {{ addNombre }}
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
          {text: 'Tipo Comprobante', value: 'tipo_comprobante_name', sortable: true},
          {text: 'Total', value: 'total', sortable: true},
        ],
        addModal: 0,
        addNombre: "",
        addId: 0,
        addAccion: 1,
        comprobanteModal: 0,
        tipo_comprobante: '',
        numero_comprobante: '',
        cliente: '',
        fecha: '',
        cliente_documento: '',
        cliente_direccion: '',
        cliente_telefono: '',
        total: 0,
        total_iva5: 0,
        total_iva10: 0,
        detalles: [],
      }
    },

    computed: {
      ...mapGetters([
        'getVentaListFromService',
      ]),

      actionTitle() {
        return this.addAccion === 1 ? 'Eliminar Venta' : 'Habilitar Venta'
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
        'deactivateVenta'
      ]),
      mostrarComprobante(item) {
        this.tipo_comprobante=item.tipo_comprobante_name;
        this.numero_comprobante=item.numero_comprobante;
        this.cliente=item.cliente_name;
        this.cliente_documento=item.cliente_documento;
        this.cliente_direccion=item.cliente_direccion;
        this.cliente_telefono=item.cliente_telefono;
        this.fecha=item.fecha;
        this.total=item.total;
        this.total_iva5=item.total_iva5;
        this.total_iva10=item.total_iva10;
        this.detalles=item.detalles;
        this.comprobanteModal=1;
      },
      ocultarComprobante(item) {
        this.comprobanteModal=0;
      },
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
        this.$router.push({ path: `/venta/${item.id}`}, () => {})

      },

      activarDesactivarMostrar(action, item) {
        this.addModal = 1;   // controla para que se muestre el modal
        this.addNombre = "Estas seguro que desea eliminar esta venta";
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
        self.deactivateVenta({
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
<style>
    #factura {
        padding: 20px;
        font-family: Arial, sans-serif;
        font-size: 16px ;
    }

    #logo {
        float: left;
        margin-left: 2%;
        margin-right: 2%;
    }
    #imagen {
        width: 80px;
    }

    #fact {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
    }

    #datos {
        float: left;
        margin-top: 0%;
        margin-left: 2%;
        margin-right: 2%;
        /*text-align: justify;*/
    }

    #encabezado {
        text-align: center;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 16px;
    }

    section {
        clear: left;
    }

    #cliente {
        text-align: left;
    }

    #facliente {
        width: 40%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 15px;
    }

    #fa {
        color: #FFFFFF;
        font-size: 14px;
    }

    #facarticulo {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        padding: 20px;
        margin-bottom: 15px;
    }

    #facarticulo thead {
        padding: 20px;
        background: #2183E3;
        text-align: center;
        border-bottom: 1px solid #FFFFFF;
    }

    #gracias {
        text-align: center;
    }
</style>
