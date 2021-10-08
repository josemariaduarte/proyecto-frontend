<template>
    <v-layout >
        <v-flex>
            <v-alert v-if="viewMessageForm"
                    border="right"
                    color="red lighten-2"
                    dark
            >
                <div v-for="v in validateMensaje" :key="v" v-text="v">
                </div>
            </v-alert>
            <v-card>
                <v-card-title>
                    <span class="headline">{{formTitle}}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="tipo_comprobante"
                                          :items="tipoComprobanteOpciones"
                                          item-text="text"
                                          item-value="value"
                                          :rules="tipoComprobanteRules"
                                          label="Tipo Comprobante">
                                </v-select>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="numero_comprobante"
                                        counter="150"
                                        :rules="numeroComprobanteRules"
                                        label="Numero Comprobante">

                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="impuesto"
                                          :items="impuestoOpciones"
                                          item-text="text"
                                          item-value="value"
                                          label="Impuesto">
                                </v-select>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-menu
                                        v-model="fromDateMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                label="Fecha"
                                                readonly
                                                :value="fromDateDisp"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                            v-model="fecha"
                                            no-title
                                            @input="fromDateMenu = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="proveedor"
                                          :items="proveedorOpciones"
                                          item-text="text"
                                          item-value="value"
                                          label="Proveedor">
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm2 md2 xl2>
                                <v-btn small fab dark color="teal" @click="mostrarModalDetalle">
                                    <v-icon dark>list</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex xs12 sm2 md12 lg12 xl2>
                                <template>
                                    <v-data-table
                                            :headers="cabeceraDetalles"
                                            :items="detalles"
                                            :hide-default-footer="true"
                                            class="elevation-1">
                                        <template v-slot:item.borrar="{ item }">
                                            <v-icon v-if="!item.borrar" small class="mr-2" @click="eliminarDetalle(detalles, item)">
                                                delete
                                            </v-icon>
                                        </template>
                                        <template v-slot:item.producto="{ item }">
                                            <v-select v-model="item.producto"
                                                      :items="productos"
                                                      item-text="text"
                                                      item-value="value"
                                                      label="Producto">
                                            </v-select>
<!--                                            <v-text-field v-model="item.product.nombre" readonly></v-text-field>-->
                                        </template>
                                        <template v-slot:item.cantidad="{ item }">
                                            <v-text-field type="number" v-model="item.cantidad"></v-text-field>
                                        </template>
                                        <template v-slot:item.precio="{ item }">
                                            <v-text-field type="number" v-model="item.precio"></v-text-field>
                                        </template>

                                        <template v-slot:no-data>
                                            <h3>No hay Registros</h3>
                                        </template>
                                    </v-data-table>
                                </template>
                            </v-flex>
                            <v-flex xs12 sm12 md12 lg12 xl12>
                                <v-flex class="text-xs-right">
                                    <strong> Total Parcial:{{ totalParcial=calcularTotalParcial}}</strong>
                                </v-flex>
                                <v-flex class="text-xl-end">
                                    <strong> Total Impuesto:{{ totalImpuesto=calcularTotalImpuesto }}</strong>
                                </v-flex>
                                <v-flex class="text-xs-left">
                                    <strong> Total Neto:{{ total=calcularTotal }}</strong>
                                </v-flex>
                            </v-flex>


                            <!--                            <v-flex xs12 sm12 md12>-->
                            <!--                                <div class="red&#45;&#45;text" v-for="v in validarMensaje" :key="v" v-text="v">-->
                            <!--                                </div>-->
                            <!--                            </v-flex>-->
                        </v-layout>
                    </v-container>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Detalle</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>

                                        <v-flex xs12 sm12 md12>


                                            <v-select v-model="producto"
                                                      :items="productos"
                                                      item-text="text"
                                                      item-value="value"
                                                      label="Producto">
                                            </v-select>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field type="number" v-model="cantidad" label="Cantidad"></v-text-field>
                                        </v-flex>

                                        <v-flex xs12 sm6 md6>
                                            <v-text-field type="number" v-model="precio" label="Precio"></v-text-field>
                                        </v-flex>



                                        <v-flex xs12 sm12 md12>
                                            <div class="red--text" v-for="v in validarMensajeDetalle" :key="v" v-text="v">
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
                                <v-btn color="blue darken-1"  text @click="agregarDetalle">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="volerListado">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="guardar"> Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: "OrdenCompraForm",
    data: () => ({
      editedIndex: 1,
      fromDateMenu: false,
      fromDateVal: null,
      valid: true,
      fecha: '',
      proveedor: '',
      tipo_comprobante: '',
      numero_comprobante: '',
      impuesto: {'text': '10%', value: 10},
      proveedorOpciones: [],
      tipoComprobanteOpciones: [],
      impuestoOpciones: [],
      cabeceraDetalles: [
        {text: 'Borrar', value: 'borrar', sortable: false},
        {text: 'Articulo', value: 'producto', sortable: true},
        {text: 'Cantidad', value: 'cantidad', sortable: true},
        {text: 'Precio', value: 'precio', sortable: true},
      ],
      detalles: [],
      cantidad: 0,
      precio: 0,
      producto: '',
      productos: [],
      total: 0,
      totalParcial: 0,
      totalImpuesto: 0,
      dialog: false,
      validarMensajeDetalle: [],
      tipoComprobanteRules: [
        (v) => !!v || "Tipo Comprobante es requerido"
      ],
      numeroComprobanteRules: [
        (v) => !!v || "Numero Comprobante es requerido",
        (v) =>
          (v && v.length < 100) ||
          "Numero de Comprobante no puede ser superior a 100",
      ],
      validateMensaje: [],
      viewMessageForm: false,
    }),

    computed: {
      ...mapGetters([
        'getProveedorListFromService',
        'getTipoComprobanteListFromService',
        'getImpuestoListFromService',
        'getArticuloListFromService',
        'getCompraDetailFromService'
      ]),
      fromDateDisp() {
        return this.fecha;
        // format date, apply validations, etc. Example below.
        // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
      },

      formTitle() {
        return this.editedIndex === 1 ? 'Nueva Compra' : 'Editar Compra'
      },

      calcularTotal: function () {
        let resultado = 0;
        for(var i=0;i<this.detalles.length; i++){
          resultado = resultado + (this.detalles[i].cantidad*this.detalles[i].precio)
        }
        return resultado
      },

      calcularTotalImpuesto: function () {
        console.log('impuesto')
        return ((this.total*(this.impuesto/100))/(1+(this.impuesto/100))).toFixed(2);
      },

      calcularTotalParcial: function () {
        console.log('total parcial')
        return this.total - this.totalImpuesto
      }
    },

    created() {
      this.listarProveedor();
      this.listarProductos();
      this.listarImpuestoChoices();
      this.listarTipoComprobanteChoices();
      if (this.$route.name === 'compra_update') {
        // cuando es edicion seteamos editar el editedIndex a 2
        this.editedIndex = 2;
        this.getCompraDetail(this.$route.params.id);
      }
    },


    methods: {
      ...mapActions([
        'saveCompra',
        'updateCompra'
      ]),
      validate() {
        this.$refs.form.validate()
      },
      reset() {
        this.$refs.form.reset()
      },
      resetValidation() {
        this.$refs.form.resetValidation()
      },

      listarImpuestoChoices (){
        // obtener en el selector de sexo
        let self = this;
        let impuestoArray = [];
        self.getImpuestoListFromService().then(res => {
          impuestoArray = res.data.impuesto;
          impuestoArray.map(function(resp){
            self.impuestoOpciones.push({text: resp.text, value:resp.id});
          });
          //tomamos el 10 % por defecto
          self.impuesto = {'text': res.data.impuesto[1].text, value:res.data.impuesto[1].id}
        })
      },


      listarTipoComprobanteChoices (){
        // obtener en el selector de sexo
        let self = this;
        let tipoArray = [];
        self.getTipoComprobanteListFromService().then(res => {
          tipoArray = res.data.tipo_comprobante;
          tipoArray.map(function(resp){
            self.tipoComprobanteOpciones.push({text: resp.text, value:resp.id});
          })
        })
      },

      listarProveedor (){
        // obtener en el selector de orden de compra
        let self = this;
        let proveedorArray = [];
        self.getProveedorListFromService(1, 100).then(res => {
          proveedorArray = res.data.results;
          proveedorArray.map(function(resp){
            self.proveedorOpciones.push({text: resp.razon_social, value:resp.id});
          })
        })
      },

      listarProductos (){
        // obtener en el selector de orden de compra

        let self = this;
        let productoArray = [];
        self.getArticuloListFromService(1, 100).then(res => {
          console.log('ok')
          productoArray = res.data.results;
          productoArray.map(function(resp){
            self.productos.push({text: resp.nombre, value:resp.id});
          })
        })
      },

      eliminarDetalle(arr, item){
        let i = arr.indexOf(item);
        if (i!= -1) {
          arr.splice(i, 1);
        }
      },

      limpiar () {
        // limpiamos los atributos del formulario
        this.producto='';
        this.precio=0;
        this.cantidad=0;
        //
        // limpiamos los elementos de validacion
        this.validaDetalle=0;
        this.validarMensajeDetalle=[];
        //
        this.viewMessageForm = false;
        this.validateMensaje = [];
      },

      agregarDetalle() {
        if (this.validarDetalle()) {
          return;
        }
        // permite agregar al detalle
        this.detalles.push(
          {
            producto: this.producto,
            cantidad: this.cantidad,
            precio: this.precio
          }
        );
        // luego vaciamos el campo de codigo
        this.close()


      },


      mostrarModalDetalle() {
        this.dialog = 1;
      },

      validarDetalle() {
        //  recorremos los detalles para ver si el producto ya se encuentra registrado
        this.validaDetalle = 0;
        this.validarMensajeDetalle = [];
        if (!this.precio){
          this.validarMensajeDetalle.push('Debe ingresar el precio unitario')
        }
        if (!this.cantidad){
          this.validarMensajeDetalle.push('Debe ingresar la cantidad')
        }
        let productoBandera = false;
        for(var i=0; i < this.detalles.length; i++){
          if (this.detalles[i].producto.value==this.producto.value){
            productoBandera=true;
          }
        }
        if(productoBandera) {
          this.validarMensajeDetalle.push('El articulo ya se encuentra en el Detalle')
        }
        if (this.validarMensajeDetalle.length) {
          this.validaDetalle = 1;
        }
        return this.validaDetalle;
      },

      close () {
        this.dialog = false;
        this.limpiar();
      },


      getCompraDetail (id) {
        // traemos data de la compra seleccionada
        this.getCompraDetailFromService(id).then(res => {
          this.tipo_comprobante = res.data.tipo_comprobante;
          this.numero_comprobante = res.data.numero_comprobante;
          this.impuesto = res.data.impuesto;
          this.proveedor = res.data.proveedor;
          this.fecha = res.data.fecha;
          this.detalles = res.data.detalles;
        })
      },

      validar(){
        console.log('validando')
        this.validateMensaje = [];
        if (!this.tipo_comprobante){
          this.validateMensaje.push('Debe ingresar el Tipo Comprobante')
        }
        if (!this.numero_comprobante){
          this.validateMensaje.push('Debe ingresar el Numero Comprobante')
        }
        if (!this.fecha){
          this.validateMensaje.push('Debe ingresar la fecha')
        }
        if (!this.impuesto){
          this.validateMensaje.push('Debe ingresar el impuesto')
        }
        if (!this.proveedor){
          this.validateMensaje.push('Debe ingresar el proveedor')
        }
        if(this.detalles.length == 0) {
          this.validateMensaje.push('Debe ingresar al menos un Detalle')
        }

        if (this.validateMensaje.length > 0) {
          this.viewMessageForm = true
          return false
        } else {
          return true
        }
      },

      guardar() {
        if (this.validar()) {
          if (this.editedIndex == 2) {
            this.updateCompra({
              'id': this.$route.params.id,
              'proveedor': this.proveedor,
              'tipo_comprobante': this.tipo_comprobante,
              'numero_comprobante': this.numero_comprobante,
              'impuesto': this.impuesto.value,
              'fecha': this.fecha,
              'detalles': this.detalles
            }).then(res => {
              this.$router.push({name: 'compra'})
            }).catch(err => {
              console.log(err);
            });
          } else {
            this.saveCompra({
              'proveedor': this.proveedor,
              'tipo_comprobante': this.tipo_comprobante,
              'numero_comprobante': this.numero_comprobante,
              'impuesto': this.impuesto.value,
              'fecha': this.fecha,
              'detalles': this.detalles
            }).then(res => {
              this.$router.push({name: 'compra'})
            }).catch(err => {
              console.log(err);
            });
          }


        }

      },

      volerListado(){
        this.$router.push({name: 'compra'})
      }


    },


  }
</script>

<style scoped>

</style>