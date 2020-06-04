<template>
  <v-container fill-height fluid>
    <v-col>
    <Alert style="text-align: center;" :message="alert.message" :type="alert.type" v-if="alert.message" />
    <v-layout column class="login-box pa-5 ma-auto">
      <v-text-field v-model="username" placeholder="Identifiant"></v-text-field>
      <v-text-field v-model="password" placeholder="Mot de passe"></v-text-field>
      <v-btn @click="sendForm()">Connexion</v-btn>
    </v-layout>
    </v-col>
  </v-container>
</template>

<script>
import Alert from '~/components/Alert'

export default {
  name: 'Login',
  components: {
    Alert,
  },
  data() {
    return {
      username: '',
      password: '',
      alert: {
        message: null,
        type: null,
      },
    }
  },
  methods: {
    async sendForm() {
      this.alert.message = 'Création de compte en cours'
      this.alert.type = 'is-warning'
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
        })
        this.alert.message = 'Création de compte réussie'
        this.alert.type = 'is-success'
        this.$router.push({ path: '/dashboard' })
      } catch (e) {
        this.alert.message = e.message
        this.alert.type = 'is-danger'
      }
    },
  },
}
</script>

<style>
.login-box {
  max-width: 350px;
  max-height: 225px;
  border: 1px solid white;
}
</style>
