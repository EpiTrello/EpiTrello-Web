<template>
  <v-container fill-height fluid>
    <v-col>
    <Alert style="text-align: center;" :message="alert.message" :type="alert.type" v-if="alert.message" />
    <h1 style="text-align: center;">Inscription</h1>
    <v-layout column class="register-box pa-5 ma-auto">
      <v-text-field v-model="username" placeholder="Identifiant"></v-text-field>
      <v-text-field v-model="password" placeholder="Mot de passe"></v-text-field>
      <v-text-field v-model="passwordc" placeholder="Confirmez le mot de passe"></v-text-field>
      <v-btn @click="sendForm()">Inscrition</v-btn>
    </v-layout>
    </v-col>
  </v-container>
</template>


<script>
import Alert from "~/components/Alert";

export default {
  name: "Register",
  components: {
    Alert
  },
  data() {
    return {
      username: "",
      password: "",
      passwordc: "",
      alert: {
        message: null,
        type: null
      }
    };
  },
  methods: {
    async sendForm() {
      this.alert.message = "Connexion en cours";
      this.alert.type = "is-warning";
      if (this.password !== this.passwordc) {

      this.alert.message = "Les mots de passes de correspondent pas.";
      this.alert.type = "is-danger";
      }
      try {
        await this.$store.dispatch("register", {
          username: this.username,
          password: this.password
        });
        this.alert.message = "Connexion réussie";
        this.alert.type = "is-success";
        this.$router.push({ path: "/auth/login" });
      } catch (e) {
        this.alert.message = e.message;
        this.alert.type = "is-danger";
      }
    }
  }
};
</script>

<style>
.register-box {
  max-width: 350px;
  max-height: 300px;
  border: 1px solid white;
}
</style>
