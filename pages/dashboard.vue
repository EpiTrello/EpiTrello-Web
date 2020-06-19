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
          <v-card class="my-card mr-2 mb-2" v-for="board in boards" :key="board.id">
            <v-list-item-content class=" px-5">
              <v-list-item-title class="headline mb-1">
                <nuxt-link class="card-title" :to="boardLink(board.id)">{{ board.title }} </nuxt-link></v-list-item-title
              >
              <span class="show-members" @click="getUsers($store.state.user.id, board.id)">
                Voir les membres
              </span>
              <v-dialog v-model="dialogUsers" max-width="290">
                <v-card>
                  <v-card-title class="headline">Membres de {{ board.title }}</v-card-title>
                  <v-card-text>
                    <div class="pb-2" v-for="user in users" :key="user.id">
                      <v-icon class="mr-1" style="font-size: 7.5px;margin-top: -1px;">mdi-circle</v-icon>
                      <span class="user-username">{{ user.username }}</span>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialogUsers = false">
                      Fermer
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-content>
            <v-card-actions class="ma-0 pa-0 mb-2 mr-2">
              <v-spacer />
              <v-btn @click="deleteBoard(board.id)" color="error" fab small dark>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="add-tab">
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
      dialogUsers: false,
      users: [],
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
        url: '/api/board/getBoards',
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
        url: '/api/board/createBoard',
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
        url: '/api/board/deleteBoard',
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
    getUsers(user_id, board_id) {
      axios({
        method: 'post',
        url: '/api/board/getUsers',
        data: {
          userID: user_id,
          boardID: board_id,
        },
      })
        .then(data => {
          this.users = data.data
        })
        .catch(error => {
          this.error = error.message
        })
      this.dialogUsers = true
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
}
.add-tab {
  width: 300px;
  height: 125px;
}

.card-title {
  text-decoration: none;
  color: white;
}

.user-username {
  font-size: 16px;
}

.show-members {
  cursor: pointer;
  font-style: italic;
}

.show-members:hover {
  text-decoration: underline;
}
</style>
