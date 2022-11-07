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
          <v-btn @click="cancel">
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
                v-if="formHasErrors"
                left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    class="my-0"
                    v-bind="attrs"
                    @click="resetForm"
                    v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Обновить форму</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
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
      formHasErrors: false,
      dialog: false,
      post: {
        title: 'Мой пост',
        body: ' ',
      },
      rules: {
        required: value => !!value || 'Обязательное поле',
      },
    }
  },

  methods: {
    createPost() {
      if (this.$refs.form.validate()) {
        this.formHasErrors = false
        this.dialog = false
        this.post.id = Date.now()
        this.$emit('create', this.post)
        this.clear()
      } else this.formHasErrors = true
    },

    cancel() {
      this.dialog = false
      this.clear()
    },

    clear() {
      this.post = {
        title: 'Мой пост',
        body: '',
      }
    },

    resetForm() {
      this.$refs.form.reset()
      this.formHasErrors = false
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