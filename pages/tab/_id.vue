<template>
  <v-layout>
    <div v-if="error">{{ error }}</div>
    <!-- {{ columns }} -->
    <h1></h1>
    <v-layout row class="mycontainer mx-auto">
      <!-- each column -->
      <div v-for="column in columns" :key="column.id">
        <v-card class="mylist mr-2 mb-2 px-5" :color="column.color">
          <v-card-title class="px-0">{{ column.title }}</v-card-title>
          <!-- each cards -->
          <v-card class="my-custom-card mb-3" v-for="card in column.cards" :key="card.id" :color="card.color">
            <v-layout column class="pa-4 ma-0">
              <h3>{{ card.title }}</h3>
              <v-dialog light v-model="colorPickerCard" max-width="300">
                <v-color-picker v-model="card.color" flat></v-color-picker>
                <v-btn color="success" text @click="colorPickerCard = false">Valider</v-btn>
              </v-dialog>
              <v-card-actions class="ma-0 pa-0">
                <v-spacer />
                <v-btn @click.stop="colorPickerCard = true" color="warning" fab small dark>
                  <v-icon>mdi-invert-colors</v-icon>
                </v-btn>
                <v-btn @click="deleteCard(card.id)" color="#363636" fab small dark>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-layout>
          </v-card>
          <!-- /each cards -->
          <!-- create Card -->
          <v-card class="my-card">
            <v-layout column class="pb-5 px-5 my-3">
              <v-text-field v-model="column.newCardTitle" placeholder="Nom de la carte"></v-text-field>
              <v-btn color="#363636" @click="createCard(column.newCardTitle, column.id, '#272727', '#ffffff')">Créer une carte</v-btn>
            </v-layout>
          </v-card>

          <!-- /create Card -->
          <v-card-actions class="ma-0 pa-0 py-4">
            <v-spacer />
            <v-dialog light v-model="colorPickerColumn" max-width="300">
              <v-color-picker v-model="column.color" flat></v-color-picker>
              <v-btn color="success" text @click="colorPickerColumn = false">Valider</v-btn>
            </v-dialog>
            <v-btn @click.stop="colorPickerColumn = true" color="warning" fab small dark>
              <v-icon>mdi-invert-colors</v-icon>
            </v-btn>
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
          <v-btn @click="createColumn(columnTitle, '#1E1E1E', '#ffffff')">Ajouter une liste</v-btn>
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
      color: '',
      colorPickerColumn: false,
      colorPickerCard: false,
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
    createColumn(title, color, textColor) {
      axios({
        method: 'post',
        url: '/api/db/createColumn',
        data: {
          tabID: this.id,
          title: title,
          color: color,
          textColor: textColor,
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
    createCard(title, columnID, color, textColor) {
      axios({
        method: 'post',
        url: '/api/db/createCard',
        data: {
          title: title,
          columnID: columnID,
          color: color,
          textColor: textColor,
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
