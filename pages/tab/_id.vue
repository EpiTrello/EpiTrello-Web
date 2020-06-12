<template>
  <v-layout>
    <div v-if="error">{{ error }}</div>
    <h1></h1>
    <v-layout row class="mycontainer mx-auto">
      <!-- each column -->
      <div v-for="column in columns" :key="column.id">
        <v-card class="mylist mr-2 mb-2 px-5">
          <v-card-title class="px-0">{{ column.title }}</v-card-title>
          <!-- each cards -->
          <v-card class="my-custom-card mb-3" v-for="card in column.cards" :key="card.id" color="#272727">
            <v-layout column class="pa-4 ma-0">
              <h3>{{ card.title }}</h3>
              <v-card-actions class="ma-0 pa-0">
                <v-spacer />
                <v-btn @click="deleteCard(card.id)" color="#363636" fab small dark>
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
              <v-btn color="#363636" @click="createCard(column.newCardTitle, column.id)">Créer une carte</v-btn>
            </v-layout>
          </v-card>
          <!-- /create Card -->
          <v-card-actions class="ma-0 pa-0 py-4">
            <v-spacer />
            <v-btn @click="deleteColumn(column.id)" color="error" fab small dark>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <!-- /each column -->
      <!-- create column -->
      <v-card class="my-card">
        <v-layout column class="pb-5 px-5">
          <v-text-field v-model="columnTitle" placeholder="Nom de la liste"></v-text-field>
          <v-btn @click="createColumn(columnTitle)">Ajouter une liste</v-btn>
        </v-layout>
      </v-card>
      <!-- /create column -->
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
      columnTitle: '',
      columns: [],
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.columns = []
      axios({
        method: 'post',
        url: '/api/db/getTab',
        data: {
          tabID: this.id,
        },
      })
        .then(data => {
          this.columns = data.data
        })
        .catch(error => {
          this.error = error.message
        })
    },
    createColumn(title) {
      axios({
        method: 'post',
        url: '/api/db/createColumn',
        data: {
          tabID: this.id,
          title: title,
        },
      })
        .then(data => {
          this.refresh()
        })
        .catch(error => {
          this.error = error.message
        })
    },
    deleteColumn(id) {
      axios({
        method: 'post',
        url: '/api/db/deleteColumn',
        data: {
          columnID: id,
        },
      })
        .then(data => {
          this.refresh()
        })
        .catch(error => {
          this.error = error.message
        })
    },
    createCard(title, columnID) {
      axios({
        method: 'post',
        url: '/api/db/createCard',
        data: {
          title: title,
          columnID: columnID,
        },
      })
        .then(data => {
          this.refresh()
        })
        .catch(error => {
          this.error = error.message
        })
    },

    deleteCard(cardID) {
      axios({
        method: 'post',
        url: '/api/db/deleteCard',
        data: {
          cardID: cardID,
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
