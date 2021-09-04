<template>
    <v-layout >
        <v-flex>

            <v-card>
                <v-card-title>
                    <span class="headline">Nuevo Cliente</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                        v-model="nro_doc"
                                        counter="50"
                                        :rules="organizationRules"
                                        label="Numero Documento">

                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="nombres"
                                        counter="150"
                                        :rules="nombresRules"
                                        label="Nombres">

                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="apellidos"
                                        counter="150"
                                        :rules="apellidosRules"
                                        label="Apellidos">
                                </v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field v-model="direccion" label="Direccion"></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field v-model="telefono" label="Telefono"></v-text-field>
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
                                                label="Fecha Nacimiento"
                                                readonly
                                                :value="fromDateDisp"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                <v-date-picker
                                        v-model="fecha_nacimiento"
                                        no-title
                                        @input="fromDateMenu = false"
                                ></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="correo"
                                        :rules="emailRules"
                                        label="Correo Electronico"
                                ></v-text-field>

                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="sexo"
                                          :items="sexoOpciones"
                                          item-text="text"
                                          item-value="value"
                                          label="Sexo">
                                </v-select>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="estado_civil"
                                          :items="estadoCivilOpciones"
                                          item-text="text"
                                          item-value="value"
                                          label="Estado Civil">
                                </v-select>
                            </v-flex>

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
    name: "ClienteForm",
    data: () => ({
      fromDateMenu: false,
      fromDateVal: null,
      valid: true,
      nro_doc: '',
      nombres: '',
      apellidos: '',
      fecha_nacimiento: null,
      direccion: '',
      correo: '',
      telefono: '',
      sexo: '',
      estado_civil: '',
      sexoOpciones: [],
      estadoCivilOpciones: [],
      organizationRules: [
        (v) => !!v || "Numero de Documento es requerido",
        (v) =>
          (v && v.length < 50) ||
          "Numero de Documento no puede ser superior a 50",
      ],
      nombresRules: [
        (v) => !!v || "Nombres es requerido",
        (v) =>
          (v && v.length < 50) ||
          "Nombres no puede ser superior a 150",
      ],
      apellidosRules: [
        (v) => !!v || "Apellidos es requerido",
        (v) =>
          (v && v.length < 50) ||
          "Apellidos no puede ser superior a 150",
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,

      checkbox: false,
    }),

    computed: {
      ...mapGetters([
        'getSexoListFromService',
        'getEstadoCivilListFromService'
      ]),
      fromDateDisp() {
        return this.fecha_nacimiento;
        // format date, apply validations, etc. Example below.
        // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
      },
    },

    created() {
      this.listarSexo();
      this.listarEstadoCivil();
    },


    methods: {
      ...mapActions([
        'saveCliente'
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

      listarSexo (){
        // obtener en el selector de sexo
        let self = this;
        let sexoArray = [];
        self.getSexoListFromService().then(res => {
          sexoArray = res.data.sexo;
          sexoArray.map(function(resp){
            self.sexoOpciones.push({text: resp.text, value:resp.id});
          })
        })
      },

      listarEstadoCivil (){
        // obtener en el selector de estado civil
        let self = this;
        let estadoCivilArray = [];
        self.getEstadoCivilListFromService().then(res => {
          estadoCivilArray = res.data.estado_civil;
          estadoCivilArray.map(function(resp){
            self.estadoCivilOpciones.push({text: resp.text, value:resp.id});
          })
        })
      },

      close () {
        this.$router.push({ name: 'cliente'})
      },

      guardar(){
        this.saveCliente({
          'nro_doc': this.nro_doc,
          'nombres': this.nombres,
          'apellidos': this.apellidos,
          'direccion': this.direccion,
          'telefono': this.telefono,
          'fecha_nacimiento': this.fecha_nacimiento,
          'correo': this.correo,
          'sexo': this.sexo,
          'estado_civil': this.estado_civil
        }).then(res =>{
          this.$router.push({ name: 'cliente'})
        }).catch(err =>{
          console.log(err);
        });
      }

    },


  }
</script>

<style scoped>

</style>