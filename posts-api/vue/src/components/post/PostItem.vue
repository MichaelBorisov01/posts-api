<template>
  <v-card class="post" elevation="3">
    <v-card-text>
      <v-col>
        <div>{{ post.id }}</div>
        <div><strong>Название:</strong> {{ post.title }}</div>
        <div><strong>Описание:</strong> {{ post.body }}</div>
      </v-col>
    </v-card-text>

    <v-card-actions>
      <v-btn
          @click="$emit('remove', post)">
        Удалить
      </v-btn>
    </v-card-actions>
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
  padding: 10px;
  margin-top: 15px;
}
</style>