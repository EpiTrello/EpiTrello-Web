<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <h1>Bienvenue sur EpiTrello !</h1>
        <h2><nuxt-link class="link" to="/auth/login">Connectez-vous</nuxt-link> ou <nuxt-link class="link" to="/auth/register">inscrivez-vous</nuxt-link> pour commencer</h2>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  middleware: 'home',
  components: {
    Logo,
    VuetifyLogo,
  },
}
</script>

<style scoped>
.link {
  text-decoration: none;
  color: gold;
}

.link:hover {
  text-decoration: underline;
}
</style>