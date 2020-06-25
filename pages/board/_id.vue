<template>
  <v-layout>
    <div v-if="error">{{ error }}</div>
    <!-- {{ columns }} -->
    <h1></h1>
    <v-layout column class="mycontainer mx-auto">
      <h1>{{boardName}}</h1>
      <div class="my-2">
        Membres du tableau : <strong class="user" v-for="user in users" :key="user.id">{{ user.username }} </strong>
      </div>
      <v-layout row>
        <!-- each column -->
        <div v-for="column in columns" :key="column.id">
          <v-card class="mylist mr-2 mb-2 px-5" :color="column.color">
            <v-card-title class="px-0">{{ column.title }}</v-card-title>
            <!-- each cards -->
            <v-card class="my-custom-card mb-3" v-for="card in column.cards" :key="card.id" :color="card.color">
              <v-layout column class="pa-4 ma-0">
                <h3>{{ card.title }}</h3>
                <v-card-actions class="ma-0 pa-0">
                  <v-spacer />
                  <!-- <v-btn @click="cardColorSwitcher()" color="brown" fab x-small dark>
                  <v-icon>mdi-invert-colors</v-icon>
                </v-btn>-->
                  <v-btn @click="deleteCard(card.id)" color="#561705" fab x-small dark>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-layout>
            </v-card>
            <!-- /each cards -->
            <!-- create Card -->
            <v-card class="my-card" color="#272727">
              <v-layout column class="pb-5 px-5 my-3">
                <v-text-field v-model="column.newCardTitle" placeholder="Nom de la carte"></v-text-field>
                <v-btn color="#363636" @click="createCard(column.newCardTitle, column.id, '#272727', '#ffffff')">Créer une carte</v-btn>
              </v-layout>
            </v-card>

            <!-- /create Card -->
            <v-card-actions class="ma-0 pa-0 py-4">
              <v-spacer />
              <v-btn @click="columnColorSwitcher(column.id, column.color, column.position)" color="warning" fab x-small dark>
                <v-icon>mdi-invert-colors</v-icon>
              </v-btn>
              <v-btn @click="deleteColumn(column.id)" color="error" fab x-small dark>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>

            <div v-if="colorPickerColumn" max-width="300">
              <v-layout column class="pa-0">
                <v-color-picker
                  value="#fff"
                  hide-canvas
                  hide-inputs
                  hide-mode-switch
                  style="margin-left: -20px; width: 300px; border-radius: 0;"
                  dark
                  :swatches="swatches"
                  show-swatches
                  v-model="column.color"
                  flat
                ></v-color-picker>
              </v-layout>
            </div>
          </v-card>
        </div>
        <!-- /each column -->
        <!-- create column -->
        <v-layout column>
          <v-card class="my-card">
            <v-layout column class="pb-5 px-5">
              <v-text-field v-model="columnTitle" placeholder="Nom de la liste"></v-text-field>
              <v-btn @click="createColumn(columnTitle, '#1E1E1E', '#ffffff')">Ajouter une liste</v-btn>
            </v-layout>
          </v-card>
          <v-card class="my-card mt-2">
            <v-layout column class="pb-5 px-5">
              <v-text-field v-model="userToAdd" placeholder="Nom de l'utilsateur"></v-text-field>
              <v-btn @click="addUser(userToAdd)">Ajouter un utilisateur</v-btn>
            </v-layout>
          </v-card>
        </v-layout>
        <!-- /create column -->
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ app, params, redirect }) {
    return {
      id: params.id,
    }
  },
  data() {
    return {
      error: false,
      boardName: '',
      userToAdd: '',
      users: [],
      colorPickerColumn: false,
      // colorPickerCard: false,
      columnTitle: '',
      columns: [],
      swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055'],
      ],
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: this.id,
      channel: '/board',
    })
    this.socket.emit('join', this.id)
    this.socket.on('refresh', (msg, cb) => {
      this.refresh()
    })
  },
  created() {
    this.refresh()
  },
  methods: {
    emitSocket(method) {
      this.socket.emit(method, this.id, resp => {
        /* Handle response, if any */
      })
    },
    refresh() {
      this.columns = []
      this.getBoardName(this.id)
      this.getUsers(this.$store.state.user.id, this.id)
      axios({
        method: 'post',
        url: '/api/board/getID',
        data: {
          boardID: this.id,
        },
      })
        .then(data => {
          this.columns = data.data
        })
        .catch(error => {
          this.error = error.message
        })
    },
    createColumn(title, color, textColor) {
      axios({
        method: 'post',
        url: '/api/column/create',
        data: {
          boardID: this.id,
          title: title,
          color: color,
          textColor: textColor,
          position: 0, // A MODIFIER
        },
      })
        .then(data => {
          this.emitSocket('refresh')
          // this.refresh();
        })
        .catch(error => {
          this.error = error.message
        })
    },
    deleteColumn(id) {
      axios({
        method: 'post',
        url: '/api/column/delete',
        data: {
          columnID: id,
        },
      })
        .then(data => {
          this.emitSocket('refresh')
          // this.refresh();
        })
        .catch(error => {
          this.error = error.message
        })
    },
    createCard(title, columnID, color, textColor) {
      axios({
        method: 'post',
        url: '/api/card/create',
        data: {
          title: title,
          columnID: columnID,
          color: color,
          textColor: textColor,
          position: 0, // A MODIFIER
        },
      })
        .then(data => {
          this.emitSocket('refresh')
          // this.refresh();
        })
        .catch(error => {
          this.error = error.message
        })
    },
    deleteCard(cardID) {
      axios({
        method: 'post',
        url: '/api/card/delete',
        data: {
          cardID: cardID,
        },
      })
        .then(data => {
          this.emitSocket('refresh')
          // this.refresh();
        })
        .catch(error => {
          this.error = error.message
        })
    },
    columnColorSwitcher(id, color, position) {
      if (this.colorPickerColumn) {
        this.colorPickerColumn = false
        this.modifyColumn(id, color)
      } else {
        this.colorPickerColumn = true
      }
    },
    cardColorSwitcher() {
      if (this.colorPickerCard) {
        this.colorPickerCard = false
      } else {
        this.colorPickerCard = true
      }
    },
    async search(user) {
      var data = await axios({
        method: 'post',
        url: '/api/user/search',
        data: {
          username: user,
        },
      })
      return data.data[0].id
    },
    async addUser(username) {
      var id = await this.search(username)
      axios({
        method: 'post',
        url: '/api/board/addUser',
        data: {
          userID: id,
          boardID: this.id,
        },
      })
        .then(data => {})
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
    },
    getBoardName(id) {
      axios({
        method: 'post',
        url: '/api/board/getName',
        data: {
          boardID: id,
        },
      })
        .then(data => {
          this.boardName = data.data.title
        })
        .catch(error => {
          this.error = error.message
        })
    },
    modifyColumn(id, color, position) {
      axios({
        method: 'post',
        url: '/api/column/modify',
        data: {
          columnID: id,
          color: color,
          position: position,
        },
      })
        .then(data => {
          this.refresh()
        })
        .catch(error => {
          this.error = error.message
        })
    },
  },
}
</script>

<style scoped>
strong.user {
  color: gold !important;
  font-weight: bold;
}

.v-color-picker__input input {
  color: white !important;
}

.mycontainer {
  max-width: 1600px;
}

.info-user {
  font-style: italic;
}

strong.user {
  color: gold !important;
  font-weight: bold;
}

.mylist {
  width: 300px;
  /* min-height: 500px; */
}

.my-custom-card {
  width: 300px;
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
