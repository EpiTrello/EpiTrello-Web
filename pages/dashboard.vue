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
          <v-card class="my-card mr-2 mb-2 px-5" v-for="board in boards" :key="board.id">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                <nuxt-link class="card-title" :to="boardLink(board.id)">{{ board.title }} </nuxt-link></v-list-item-title
              >
            </v-list-item-content>
            <v-card-actions class="ma-0 pa-0 pt-3 ml-1">
              <v-spacer />
              <v-btn @click="deleteBoard(board.id)" color="error" fab small dark>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="my-card">
            <v-layout column class="pb-5 px-5">
              <v-text-field v-model="title" placeholder="Nom du tableau"></v-text-field>
              <v-btn @click="createBoard(title)">Créer un nouveau tableau</v-btn>
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
      boards: [],
      title: '',
    }
  },
  created() {
    this.getBoards()
  },
  methods: {
    boardLink(id) {
      return '/board/' + id
    },
    getBoards() {
      axios({
        method: 'get',
        url: '/api/getBoards',
      })
        .then(data => {
          this.boards = data.data
        })
        .catch(error => {
          this.error = error.message
        })
    },
    createBoard(title) {
      if (title === '') return
      axios({
        method: 'post',
        url: '/api/createBoard',
        data: {
          title: title,
        },
      })
        .then(data => {
          this.boards.push({
            id: data.data.id,
            title: title,
          })
        })
        .catch(error => {
          this.error = error.message
        })
    },
    deleteBoard(id) {
      axios({
        method: 'post',
        url: '/api/deleteBoard',
        data: {
          boardID: id,
        },
      })
        .then(data => {
          this.getBoards()
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
