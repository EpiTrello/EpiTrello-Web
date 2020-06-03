<template>
  <article :class="`message ${type}`">
    <div class="message-body">{{ message }}</div>
  </article>
</template>

<script>
export default {
  name: "Alert",
  props: ["message", "type"]
};
</script>

<style>
.message-body {
  font-size: 14px !important;
  font-family: "Roboto", sans-serif;
  padding: 0.5rem;
}

.message {
  margin-bottom: 10px !important;
}
</style>