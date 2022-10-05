<template>
  <v-card class="post" elevation="2.5">
    <v-card-text>
      <div>{{ post.id }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 20px;
  border: 3px solid mediumpurple;
  margin-top: 10px;
}
</style>