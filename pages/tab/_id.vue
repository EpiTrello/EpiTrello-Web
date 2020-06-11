<template>
  <v-layout>
    <div v-if="error">{{ error }}</div>
    <v-layout row>
      <!-- each column -->
      <div v-for="column in columns" :key="column.id">
        <v-card>
          <v-card-title>{{ column.title }}</v-card-title>
          <v-card-actions>
            <v-btn @click="deleteColumn(column.id)">Delete column</v-btn>
          </v-card-actions>
          <!-- each cards -->
          <div v-for="card in column.cards" :key="card.id">
            {{ card.title }}
            <v-btn @click="deleteCard(card.id)">Delete card</v-btn>
          </div>
          <!-- /each cards -->
          <!-- create Card -->
          <div>
            <v-text-field v-model="column.newCardTitle" placeholder="Titre card"></v-text-field>
            <v-btn @click="createCard(column.newCardTitle, column.id)">Create Card</v-btn>
          </div>
          <!-- /create Card -->
        </v-card>
      </div>
      <!-- /each column -->
      <!-- create column -->
      <div>
        <v-text-field v-model="columnTitle" placeholder="Titre col"></v-text-field>
        <v-btn @click="createColumn(columnTitle)">Add column</v-btn>
      </div>
      <!-- /create column -->
    </v-layout>
  </v-layout>
</template>


<script>
import axios from "axios";

export default {
  async asyncData({ app, params, redirect }) {
    return {
      id: params.id
    };
  },
  data() {
    return {
      error: false,
      columnTitle: "",
      columns: []
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.columns = [];
      axios({
        method: "post",
        url: "/api/db/getTab",
        data: {
          tabID: this.id
        }
      })
        .then(data => {
          this.columns = data.data;
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    createColumn(title) {
      axios({
        method: "post",
        url: "/api/db/createColumn",
        data: {
          tabID: this.id,
          title: title
        }
      })
        .then(data => {
          this.refresh();
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    deleteColumn(id) {
      axios({
        method: "post",
        url: "/api/db/deleteColumn",
        data: {
          columnID: id
        }
      })
        .then(data => {
          this.refresh();
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    createCard(title, columnID) {
      axios({
        method: "post",
        url: "/api/db/createCard",
        data: {
          title: title,
          columnID: columnID
        }
      })
        .then(data => {
          this.refresh();
        })
        .catch(error => {
          this.error = error.message;
        });
    },

    deleteCard(cardID) {
      axios({
        method: "post",
        url: "/api/db/deleteCard",
        data: {
          cardID: cardID
        }
      })
        .then(data => {
          this.refresh();
        })
        .catch(error => {
          this.error = error.message;
        });
    }
  }
};
</script>