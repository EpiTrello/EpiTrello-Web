<template>
  <v-layout>
    <v-container>
      in dashboard
      <h1 v-if="error">{{ error }}</h1>
      <h1>{{ $store.state.user.username }}</h1>
      <h1>{{ $store.state.user.id }}</h1>
      <v-container v-for="tab in tabs" :key="tab.id">
        <nuxt-link :to="tabLink(tab.id)">{{tab.title}}</nuxt-link>
        <v-btn @click="deleteTab(tab.id)">Delete</v-btn>
      </v-container>
      <v-container>
        <v-text-field v-model="title" placeholder="Titre"></v-text-field>
        <v-btn @click="createTab(title)">Nouveau Tableau</v-btn>
      </v-container>
    </v-container>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      error: false,
      tabs: [],
      title: ""
    };
  },
  created() {
    this.getTabs();
  },
  methods: {
    tabLink(id) {
      return "/tab/" + id;
    },
    getTabs() {
      axios({
        method: "get",
        url: "/api/db/getTabs"
      })
        .then(data => {
          this.tabs = data.data;
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    createTab(title) {
      axios({
        method: "post",
        url: "/api/db/createTab",
        data: {
          title: title
        }
      })
        .then(data => {
          this.tabs.push({
            id: data.data.id,
            title: title
          });
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    deleteTab(id) {
      axios({
        method: "post",
        url: "/api/db/deleteTab",
        data: {
          tabID: id
        }
      })
        .then(data => {
          this.getTabs();
        })
        .catch(error => {
          this.error = error.message;
        });
    }
  }
};
</script>