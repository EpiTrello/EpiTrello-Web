<template>
  <v-layout>
    <v-container>
      <Alert :message="alert.message" :type="alert.type" v-if="alert.message" />
      <v-text-field v-model="username" placeholder="Username"></v-text-field>
      <v-text-field v-model="password" placeholder="Password"></v-text-field>
      <v-btn @click="sendForm()">Register</v-btn>
    </v-container>
  </v-layout>
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