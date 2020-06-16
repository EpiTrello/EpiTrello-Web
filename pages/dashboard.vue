<template>
  <v-layout>
    <v-container>
      <v-layout class="mycontainer mx-auto" column>
        <h1 v-if="error">{{ error }}</h1>
        <span class="info-user"
          >Vous êtes connecté en tant que <strong class="user">{{ $store.state.user.username }}</strong></span
        >
        <h1>Vos tableaux</h1>
        <v-layout row ma-0 mt-5>
          <v-card class="my-card mr-2 mb-2 px-5" v-for="tab in tabs" :key="tab.id">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                <nuxt-link class="card-title" :to="tabLink(tab.id)">{{ tab.title }} </nuxt-link></v-list-item-title
              >
            </v-list-item-content>
            <v-card-actions class="ma-0 pa-0 pt-3 ml-1">
              <v-spacer />
              <v-btn @click="deleteTab(tab.id)" color="error" fab small dark>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="my-card">
            <v-layout column class="pb-5 px-5">
              <v-text-field v-model="title" placeholder="Nom du tableau"></v-text-field>
              <v-btn @click="createTab(title)">Créer un nouveau tableau</v-btn>
            </v-layout>
          </v-card>
        </v-layout>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  middleware: 'authenticated',
  data() {
    return {
      error: false,
      tabs: [],
      title: '',
    }
  },
  created() {
    this.getTabs()
  },
  methods: {
    tabLink(id) {
      return '/tab/' + id
    },
    getTabs() {
      axios({
        method: 'get',
        url: '/api/getTabs',
      })
        .then(data => {
          this.tabs = data.data
        })
        .catch(error => {
          this.error = error.message
        })
    },
    createTab(title) {
      if (title === '') return
      axios({
        method: 'post',
        url: '/api/createTab',
        data: {
          title: title,
        },
      })
        .then(data => {
          this.tabs.push({
            id: data.data.id,
            title: title,
          })
        })
        .catch(error => {
          this.error = error.message
        })
    },
    deleteTab(id) {
      axios({
        method: 'post',
        url: '/api/deleteTab',
        data: {
          tabID: id,
        },
      })
        .then(data => {
          this.getTabs()
        })
        .catch(error => {
          this.error = error.message
        })
    },
  },
}
</script>

<style scoped>
.mycontainer {
  max-width: 1250px;
}

.info-user {
  font-style: italic;
}

strong.user {
  color: gold !important;
  font-weight: bold;
}

.my-card {
  width: 300px;
  height: 125px;
}

.card-title {
  text-decoration: none;
  color: white;
}
</style>
