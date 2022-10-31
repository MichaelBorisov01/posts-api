<template>
  <v-card>
    <v-card-title>
      <h3>Создание поста</h3>
    </v-card-title>
    <v-card-actions>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          style="width: 500px"
      >
        <v-text-field
            class="text-field"
            v-model="post.title"
            label="Название"
            :rules="[rules.required]"
        />
        <v-text-field
            class="text-field"
            v-model="post.body"
            label="Описание"
            :rules="[rules.required]"
        />
        <v-btn
            :disabled="!valid"
            @click="createPost"
        >Готово
        </v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>


export default {
  data() {
    return {
      post: {
        title: 'Мой пост',
        body: '',
      },
      rules: {
        required: value => !!value || 'Обязательное поле',
      },
      valid: true,
    }
  },

  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
      this.$refs.form.validate()
    },
  },
}
</script>

<style scoped>
.text-field {
  margin-bottom: 15px;
}
</style>