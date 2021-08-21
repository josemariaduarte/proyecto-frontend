<template>
    <v-layout align-center justify-center> <v-flex xs12 sm8 md6 lg5 xl4>
        <v-card>
            <v-toolbar dark color="blue darken-3">
                <v-toolbar-title>
                    Acceso al Sistema
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field 
                  autofocus color="accent"
                  label="Nombre Usuario"
                  v-model="username"
                  required>
                </v-text-field>
                <v-text-field v-model="password" type="password" color="accent" label="Contraseña" required>
                </v-text-field>
                <v-flex class="red--text" v-if="errorLogin">
                  {{errorLogin}}
                </v-flex>
            </v-card-text>
            <v-card-actions class="px-3 pb-3">
                <v-flex text-xs-right>
                    <v-btn @click="ingresar" color="primary">Ingresar</v-btn>
                </v-flex>
            </v-card-actions>
        </v-card>
    </v-flex>
    </v-layout>
</template>
<script>
    import { mapActions, mapMutations } from 'vuex'
    import { HTTP } from '@/utils/constants'
    export  default {
      name: 'Login',
      data () {
        return {
          username: null,
          password: null,
          errorLogin:'',
        }
      },
      methods: {
        ...mapActions(['login']),
     
          
          async ingresar () {
            // this.setOverlay(true)

            let self = this;
            try {
              const { status, data } = await self.login({ username: self.username, password: self.password })
              if (status && status === HTTP.SUCCESS.OK) {
                await self.$router.push({name: 'home'})
              } else {
                // this.setErrorMessage(data.message)
                self.errorLogin = 'Ocurrio un error con el servidor';
              }
              // this.setOverlay(false)
            }catch {
              self.errorLogin = 'Ocurrio un error con el servidor';

            }
              
          },
      

    },
    }
</script>
