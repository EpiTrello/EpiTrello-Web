<template>
  <v-layout>
    <div v-if="error">{{ error }}</div>
    <v-layout row>
      <!-- Each column -->
      <div v-for="column in columns" :key="column.id">
        <v-card>
          <v-card-title>{{ column.title }}</v-card-title>
        </v-card>
      </div>
      <!-- / Each column -->
      <!-- Add column -->
      <div>
        <v-text-field v-model="columnTitle" placeholder="Titre col"></v-text-field>
        <v-btn @click="createColumn(columnTitle)">Add cloumn</v-btn>
      </div>
      <!-- /Add column -->
    </v-layout>
  </v-layout>
</template>


<script>
import axios from "axios";

export default {
  async asyncData({ app, params, redirect }) {
    return {
      id: params.id,
      columns: []
    };
  },
  data() {
    return {
      error: false,
      columnTitle: ""
    };
  },
  created() {
    this.refresh();
  },
  methods: {
    refresh() {
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
    }
  }
};
</script>