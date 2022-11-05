<template>
  <div>
    <v-dialog width="350" v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="create-btn"
            v-bind="attrs"
            v-on="on"
        >
          Создать пост
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h3>Создание поста</h3>
        </v-card-title>
        <v-card-text>
          <v-form
              ref="form"
              lazy-validation
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">
            Отмена
          </v-btn>
          <v-btn @click="createPost"
          >Готово
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {
      dialog: false,
      post: {
        title: 'Мой пост',
        body: '',
      },
      rules: {
        required: value => !!value || 'Обязательное поле',
      },
    }
  },

  methods: {
    createPost() {
      if (this.$refs.form.validate()) {
        this.dialog = false
        this.post.id = Date.now()
        this.$emit('create', this.post)
        this.clear()
      }
    },

    cancel() {
      this.dialog = false
      this.clear()
    },

    clear() {
      this.post = {
        title: 'Мой пост',
        body: ' ',
      }
    }
  },
}
</script>

<style scoped>
.text-field {
  margin-bottom: 15px;
}

.create-btn {
  margin: 10px;
}
</style>