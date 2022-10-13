<template>
  <v-card>
    <v-card-title>
      <h3>Создание поста</h3>
    </v-card-title>
    <v-card-actions>
      <v-col>
        <v-text-field
            v-model="post.title"
            @keydown.enter="hideDialog"
            label="Название"/>
        <v-text-field
            v-model="post.body"
            @keydown.enter="hideDialog"
            label="Описание"
        />
        <v-btn
            text
            color="success"
            rounded
            @click="createPost"
        >Готово
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    }
  },

  methods: {
    ...mapActions({
      hideDialog: 'post/hideDialog'
    }),

    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
    },
  }
}
</script>

<style scoped>

</style>