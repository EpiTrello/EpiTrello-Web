<template>
  <v-layout>
    <v-container>
      <Alert :message="alert.message" :type="alert.type" v-if="alert.message" />
      <v-text-field v-model="username" placeholder="Username"></v-text-field>
      <v-text-field v-model="password" placeholder="Password"></v-text-field>
      <v-btn @click="sendForm()">Login</v-btn>
    </v-container>
  </v-layout>
</template>

<script>
import Alert from "~/components/Alert";

export default {
  name: "Login",
  components: {
    Alert
  },
  data() {
    return {
      username: "",
      password: "",
      alert: {
        message: null,
        type: null
      }
    };
  },
  methods: {
    async sendForm() {
      this.alert.message = "Création de compte en cours";
      this.alert.type = "is-warning";
      try {
        await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        this.alert.message = "Création de compte réussie";
        this.alert.type = "is-success";
        this.$router.push({ path: "/dashboard" });
      } catch (e) {
        this.alert.message = e.message;
        this.alert.type = "is-danger";
      }
    }
  }
};
</script>