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
                            <v-flex xs6 sm6 md6 v-if="viewTimbrado">
                                <v-select v-model="timbrado"
                                          :items="timbradoOpciones"
                                          item-text="text"
                                          item-value="value"
                                          item-factura="factura"
                                          label="Timbrado">
                                </v-select>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="numero_comprobante"
                                        counter="150"
                                        :readonly="viewTimbrado"
                                        :rules="numeroComprobanteRules"
                                        label="Numero Comprobante">

                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="condicion"
                                          :items="condicionOpciones"
                                          item-text="text"
                                          item-value="value"
                                          :rules="condicionRules"
                                          label="Condición">
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
                                <v-select v-model="cliente"
                                          :items="clienteOpciones"
                                          item-text="text"
                                          item-value="value"
                                          label="Cliente">
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm2 md2 xl2>
                                <v-btn small fab dark color="teal" @click="mostrarModalDetalle">
                                    <v-icon dark>list</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex xs12 sm12 md12 lg12 xl12>
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
                                                      readonly
                                                      label="Producto">
                                            </v-select>
<!--                                            <v-text-field v-model="item.producto.value" readonly></v-text-field>-->
                                        </template>
                                        <template v-slot:item.cantidad="{ item }">
                                            <v-text-field type="number" v-model="item.cantidad" :readonly="item.id"></v-text-field>
                                        </template>
                                        <template v-slot:item.precio="{ item }">
                                            <v-text-field type="number" v-model="item.precio" readonly></v-text-field>
                                        </template>
                                        <template v-slot:item.impuesto="{ item }">
                                            <v-select v-model="item.impuesto"
                                                      :items="impuestoOpciones"
                                                      item-text="text"
                                                      item-value="value"
                                                      :readonly="true"
                                                      label="Impuesto">
                                            </v-select>
                                            <!--                                            <v-text-field v-model="item.product.nombre" readonly></v-text-field>-->
                                        </template>

                                        <template v-slot:no-data>
                                            <h3>No hay Registros</h3>
                                        </template>
                                    </v-data-table>
                                </template>
                            </v-flex>
                            <v-flex xs12 sm12 md12 lg12 xl12>
                                <!--                                <v-flex class="text-xs-right">-->
                                <!--                                    <strong> Total Parcial:{{ totalParcial=calcularTotalParcial}}</strong>-->
                                <!--                                </v-flex>-->
                                <v-flex class="text-xl-end">
                                    <strong> Total IVA Excenta: {{ totalImpuestoExcenta=calcularTotalExcenta }} Gs.</strong>
                                </v-flex>
                                <v-flex class="text-xl-end">
                                    <strong> Total IVA 5%: {{ totalImpuesto5=calcularTotalIva5 }} Gs.</strong>
                                </v-flex>
                                <v-flex class="text-xl-end">
                                    <strong> Total IVA 10%: {{ totalImpuesto10=calcularTotalIva10 }} Gs.</strong>
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
                                            <v-text-field type="number" v-model="precio" label="Precio" readOnly></v-text-field>
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
    name: "VentaForm",
    data: () => ({
      editedIndex: 1,
      fromDateMenu: false,
      fromDateVal: null,
      valid: true,
      fecha: '',
      cliente: '',
      tipo_comprobante: '',
      numero_comprobante: '',
      cantidad_maxima_stock: 0,
      viewTimbrado: false,
      condicion: {'text': 'CONTADO', value: "CONTADO"},
      condicionOpciones: [],
      timbrado: '',
      timbradoOpciones: [],
      impuesto: {'text': '10%', value: 10},
      clienteOpciones: [],
      tipoComprobanteOpciones: [],
      impuestoOpciones: [],
      cabeceraDetalles: [
        {text: 'Borrar', value: 'borrar', sortable: false},
        {text: 'Articulo', value: 'producto', sortable: true},
        {text: 'Cantidad', value: 'cantidad', sortable: true},
        {text: 'Impuesto', value: 'impuesto', sortable: true},
        {text: 'Precio', value: 'precio', sortable: true},
      ],
      detalles: [],
      cantidad: 0,
      precio: 0,
      producto: '',
      productos: [],
      total: 0,
      totalParcial: 0,
      totalImpuesto10: 0,
      totalImpuesto5: 0,
      totalImpuestoExcenta: 0,
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
      condicionRules: [
        (v) => !!v || "Condición es requerido"
      ],
      validateMensaje: [],
      viewMessageForm: false,
    }),

    computed: {
      ...mapGetters([
        'getClienteListFromService',
        'getArticuloDetailFromService',
        'getTipoComprobanteListFromService',
        'getCondicionListFromService',
        'getImpuestoListFromService',
        'getArticuloListFromService',
        'getVentaDetailFromService',
        'getTimbradoListFromService',
      ]),
      fromDateDisp() {
        return this.fecha;
      },

      formTitle() {
        return this.editedIndex === 1 ? 'Nueva Venta' : 'Editar Venta'
      },

      calcularTotalExcenta: function () {
        //permite realizar el calculo del excenta
        let total = 0;
        for(var i=0;i<this.detalles.length; i++){
          if (this.detalles[i].impuesto == 0) {
            total = total + (this.detalles[i].cantidad*this.detalles[i].precio)
          }
        }
        return total
      },

      calcularTotalIva5: function () {
        //permite realizar el calculo del iva10
        let total = 0;
        for(var i=0;i<this.detalles.length; i++){
          if (this.detalles[i].impuesto == 5) {
            total = total + ((this.detalles[i].cantidad*this.detalles[i].precio)*(5/100))
          }
        }
        return total
      },

      calcularTotalIva10: function () {
        //permite realizar el calculo del iva10
        let total = 0;
        for(var i=0;i<this.detalles.length; i++){
          if ( this.detalles[i].impuesto== 10) {
            total = total + ((this.detalles[i].cantidad*this.detalles[i].precio)*(10/100))
          }
        }
        return total
      },



      calcularTotal: function () {
        let resultado = 0;
        for(var i=0;i<this.detalles.length; i++){
          resultado = resultado + (this.detalles[i].cantidad*this.detalles[i].precio)

        }
        return resultado
      },



    },

    created() {
      this.listarCliente();
      this.listarProductos();
      this.listarImpuestoChoices();
      this.listarTipoComprobanteChoices();
      this.listarCondicionChoices();
      this.listarTimbrados();
      if (this.$route.name === 'venta_update') {
        // cuando es edicion seteamos editar el editedIndex a 2
        this.editedIndex = 2;
        this.getVentaDetail(this.$route.params.id);
      }
    },


    methods: {
      ...mapActions([
        'saveVenta',
        'updateVenta'
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

      listarCondicionChoices (){
        // obtener en el selector de condicion de compra
        let self = this;
        let condArray = [];
        self.getCondicionListFromService().then(res => {
          condArray = res.data.condicion;
          condArray.map(function(resp){
            self.condicionOpciones.push({text: resp.text, value:resp.id});
          })
        })
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
            self.tipo_comprobante = {'text': res.data.tipo_comprobante[1].text, value:res.data.tipo_comprobante[1].id}
            self.viewTimbrado = true;
          })
        })
      },

      listarCliente (){
        // obtener en el selector de orden de compra
        let self = this;
        let clienteArray = [];
        self.getClienteListFromService(1, 100).then(res => {
          clienteArray = res.data.results;
          clienteArray.map(function(resp){
            self.clienteOpciones.push({text: resp.nombres + ' ' + resp.apellidos, value:resp.id});
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
            self.productos.push({text: resp.id + " - " +resp.nombre, value:resp.id});
          })
        })
      },

      listarTimbrados (){
        // obtener en el selector de orden de compra

        let self = this;
        let timbradoArray = [];
        self.getTimbradoListFromService(1, 100).then(res => {
          timbradoArray = res.data.results;
          timbradoArray.map(function(resp){
            self.timbradoOpciones.push({
              text: " Nro " +resp.numero,
              value:resp.id,
              codigo_establecimiento: resp.codigo_establecimiento,
              punto_expedicion: resp.punto_expedicion,
              secuencia: resp.secuencia_actual
            });
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
        let impuesto = 10
        if(this.impuesto.hasOwnProperty('value')) {
          impuesto = this.impuesto.value
        } else {
          impuesto = this.impuesto
        }
        // permite agregar al detalle
        this.detalles.push(
          {
            producto: this.producto,
            cantidad: this.cantidad,
            precio: this.precio,
            impuesto: impuesto
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
        } else {
          if (this.cantidad > this.cantidad_maxima_stock) {
            this.validarMensajeDetalle.push('La cantidad debe ser igual o inferior al stock del producto ' +  this.cantidad_maxima_stock)
          }
        }

        let productoBandera = false;
        for(var i=0; i < this.detalles.length; i++){
          if (this.detalles[i].producto==this.producto){
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


      getVentaDetail (id) {
        // traemos data de la compra seleccionada
        this.getVentaDetailFromService(id).then(res => {
          this.tipo_comprobante = res.data.tipo_comprobante;
          this.timbrado = res.data.timbrado;
          this.numero_comprobante = res.data.numero_comprobante;
          this.condicion = res.data.condicion;
          this.cliente = res.data.cliente;
          this.fecha = res.data.fecha;
          this.detalles = res.data.detalles;
        })
      },

      validar(){
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
        if (!this.condicion){
          this.validateMensaje.push('Debe ingresar la condicion de venta')
        }
        if (!this.cliente){
          this.validateMensaje.push('Debe ingresar el cliente')
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
            this.updateVenta({
              'id': this.$route.params.id,
              'cliente': this.cliente,
              'timbrado': this.timbrado,
              'tipo_comprobante': this.tipo_comprobante,
              'numero_comprobante': this.numero_comprobante,
              'condicion': this.condicion,
              'fecha': this.fecha,
              'detalles': this.detalles
            }).then(res => {
              this.volerListado()
            }).catch(err => {
              console.log(err);
            });
          } else {
            this.saveVenta({
              'cliente': this.cliente,
              'timbrado': this.timbrado,
              'tipo_comprobante': this.tipo_comprobante.value,
              'numero_comprobante': this.numero_comprobante,
              'condicion': this.condicion,
              'fecha': this.fecha,
              'detalles': this.detalles
            }).then(res => {
              this.volerListado()
            }).catch(err => {
              console.log(err);
            });
          }


        }

      },

      volerListado(){
        this.$router.push({name: 'venta'})
      },

      padLeadingZeros(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
      }


    },

    watch: {
      producto (value) {
        console.log('entramos al watch del producto', value)
        // debemos traer los datos del producto
        this.cantidad_maxima_stock = 0;
        this.getArticuloDetailFromService(value).then(res => {
            this.precio = res.data.precio_venta;
            this.cantidad_maxima_stock = res.data.cantidad
            this.impuesto = res.data.impuesto

        })
      },

      tipo_comprobante (obj) {
        console.log('entramos al watch del tipo de comprobante', obj.value)
        // debemos traer los datos del producto
        if (obj.hasOwnProperty('value')) {
          obj = obj.value
        }

        if (parseInt(obj) == 2) {
            this.viewTimbrado = true;
        } else {
          this.viewTimbrado = false;
          this.numero_comprobante = null;
          this.timbrado = null;

        }
      },

      timbrado (value) {
        function padLeadingZeros(num, size) {
          var s = num+"";
          while (s.length < size) s = "0" + s;
          return s;
        }
        if (this.editedIndex != 2) {
          for (let i = 0; i < this.timbradoOpciones.length; i++) {
            if (this.timbradoOpciones[i].value == value ) {
              this.numero_comprobante = this.timbradoOpciones[i].codigo_establecimiento + "-" + this.timbradoOpciones[i].punto_expedicion + "-" + padLeadingZeros(this.timbradoOpciones[i].secuencia + 1,7)
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>