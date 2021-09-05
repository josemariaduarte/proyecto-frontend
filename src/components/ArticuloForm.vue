<template>
    <v-layout >
        <v-flex>

            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="nombre"
                                        counter="50"
                                        :rules="nombreRules"
                                        label="Nombre">

                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="descripcion"
                                        counter="150"
                                        :rules="descripcionRules"
                                        label="Descripcion">

                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="precio_compra"
                                        type="number"
                                        label="Precio Compra">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="precio_venta"
                                        type="number"
                                        label="Precio Venta">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="cantidad"
                                        type="number"
                                        label="Cantidad">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="cantidad_minima_stock"
                                        type="number"
                                        label="Cantidad Min. Stock">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="proveedor"
                                          :items="proveedorOpciones"
                                          item-text="text"
                                          item-value="value"
                                          label="Proveedor">
                                </v-select>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="deposito"
                                          :items="depositoOpciones"
                                          item-text="text"
                                          item-value="value"
                                          label="Depósito">
                                </v-select>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="subcategoria"
                                          :items="subCategoriaOpciones"
                                          item-text="text"
                                          item-value="value"
                                          label="Sub Categoria">
                                </v-select>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="unidad_medida"
                                          :items="unidadOpciones"
                                          item-text="text"
                                          item-value="value"
                                          label="Unidad Medida">
                                </v-select>
                            </v-flex>
<!--                            <v-flex xs6 sm6 md6>-->
<!--                                <v-select v-model="estado_civil"-->
<!--                                          :items="estadoCivilOpciones"-->
<!--                                          item-text="text"-->
<!--                                          item-value="value"-->
<!--                                          label="Estado Civil">-->
<!--                                </v-select>-->
<!--                            </v-flex>-->

<!--                            <v-flex xs12 sm12 md12>-->
<!--                                <div class="red&#45;&#45;text" v-for="v in validarMensaje" :key="v" v-text="v">-->
<!--                                </div>-->
<!--                            </v-flex>-->
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="guardar"> Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: "ArticuloForm",
    data: () => ({
      editedIndex: 1,
      nombre: '',
      descripcion: '',
      proveedor: '',
      precio_compra: '',
      precio_venta: '',
      cantidad: '',
      cantidad_minima_stock: '',
      subcategoria: '',
      deposito: '',
      unidad_medida: '',
      proveedorOpciones: [],
      depositoOpciones: [],
      subCategoriaOpciones: [],
      unidadOpciones: [],
      nombreRules: [
        (v) => !!v || "Nombre es requerido",
        (v) =>
          (v && v.length < 50) ||
          "Nombre no puede ser superior a 100",
      ],
      descripcionRules: [
        (v) => !!v || "Descripcion es requerido",
        (v) =>
          (v && v.length < 50) ||
          "Descripcion no puede ser superior a 100",
      ]
    }),

    computed: {
      ...mapGetters([
        'getProveedorListFromService',
        'getDepositoListFromService',
        'getSubCategoriaListFromService',
        'getUnidadMedidaListFromService',
        'getArticuloDetailFromService'
      ]),


      formTitle() {
        return this.editedIndex === 1 ? 'Nuevo Articulo' : 'Editar Articulo'
      },
    },

    created() {
      console.log('cliente form');
      this.listarProveedor();
      this.listarDepositos();
      this.listarSubCategoria();
      this.listarUnidadMedida();
      // this.listarEstadoCivil();
      if (this.$route.name === 'articulo_update') {
        // cuando es edicion seteamos editar el editedIndex a 2
        this.editedIndex = 2;
        this.getArticuloDetail(this.$route.params.id);
      }
    },


    methods: {
      ...mapActions([
        'saveArticulo',
        'updateArticulo'
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

      listarProveedor (){
        // obtener en el selector de sexo
        let self = this;
        let proveedorArray = [];
        self.getProveedorListFromService(1, 100).then(res => {
          proveedorArray = res.data.results;
          proveedorArray.map(function(res){
            self.proveedorOpciones.push({text: res.razon_social, value:res.id});
          })
        })
      },

      listarDepositos (){
        // obtener en el selector de estado civil
        let self = this;
        let depositoArray = [];
        self.getDepositoListFromService(1, 100).then(res => {
          depositoArray = res.data.results;
          depositoArray.map(function(resp){
            self.depositoOpciones.push({text: resp.nombre, value:resp.id});
          })
        })
      },

      listarSubCategoria (){
        // obtener en el selector de estado civil
        let self = this;
        let subArray = [];
        self.getSubCategoriaListFromService(1, 100).then(res => {
          subArray = res.data.results;
          subArray.map(function(resp){
            self.subCategoriaOpciones.push({text: resp.nombre, value:resp.id});
          })
        })
      },

      listarUnidadMedida (){
        // obtener en el selector de estado civil
        let self = this;
        let unidadArray = [];
        self.getUnidadMedidaListFromService(1, 100).then(res => {
          unidadArray = res.data.results;
          unidadArray.map(function(resp){
            self.unidadOpciones.push({text: resp.nombre, value:resp.id});
          })
        })
      },

      close () {
        this.$router.push({ name: 'articulo'})
      },


      getArticuloDetail (id) {
        this.getArticuloDetailFromService(id).then(res => {
          this.nombre = res.data.nombre;
          this.descripcion = res.data.descripcion;
          this.precio_compra = res.data.precio_compra;
          this.precio_venta = res.data.precio_venta;
          this.cantidad = res.data.cantidad;
          this.cantidad_minima_stock = res.data.cantidad_minima_stock;
          this.subcategoria = res.data.subcategoria;
          this.deposito = res.data.deposito;
          this.unidad_medida = res.data.unidad_medida;
          this.proveedor = res.data.proveedor;
        })
      },

      guardar(){
        if (this.editedIndex == 2) {
          this.updateArticulo({
            'id': this.$route.params.id,
            'nombre': this.nombre,
            'descripcion': this.descripcion,
            'precio_compra': this.precio_compra,
            'precio_venta': this.precio_venta,
            'cantidad': this.cantidad,
            'cantidad_minima_stock': this.cantidad_minima_stock,
            'subcategoria': this.subcategoria,
            'deposito': this.deposito,
            'unidad_medida': this.unidad_medida,
            'proveedor': this.proveedor,
          }).then(res =>{
            this.$router.push({ name: 'articulo'})
          }).catch(err =>{
            console.log(err);
          });

        } else {
          this.saveArticulo({
            'nombre': this.nombre,
            'descripcion': this.descripcion,
            'precio_compra': this.precio_compra,
            'precio_venta': this.precio_venta,
            'cantidad': this.cantidad,
            'cantidad_minima_stock': this.cantidad_minima_stock,
            'subcategoria': this.subcategoria,
            'deposito': this.deposito,
            'unidad_medida': this.unidad_medida,
            'proveedor': this.proveedor,
          }).then(res =>{
            this.$router.push({ name: 'articulo'})
          }).catch(err =>{
            console.log(err);
          });
        }

      }

    },


  }
</script>

<style scoped>

</style>