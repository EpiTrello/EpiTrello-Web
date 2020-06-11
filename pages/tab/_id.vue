<template>
  <v-layout>
    <div v-if="error">{{ error }}</div>
  </v-layout>
</template>


<script>
import axios from "axios";

export default {
  async asyncData({ app, params, redirect }) {
    return {
      id: params.id,
      columns: []
    }
  },
  data() {
    return {
      error: false,
    }
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
          id: this.id
        }
      })
        .then(data => {
          this.columns = data.data;
        })
        .catch(error => {
          this.error = error.message;
        });
    }
  }
};
</script>