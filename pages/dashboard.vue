<template>
  <v-layout>
    <v-container>
      in dashboard
      <h1>{{ $store.state.user.username }}</h1>
      <h1>{{ $store.state.user.id }}</h1>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: "Dashboard"
};
</script>