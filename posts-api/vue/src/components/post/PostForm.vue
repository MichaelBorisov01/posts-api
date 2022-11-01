<template>
  <div style="margin: auto">
    <v-dialog width="500" v-model="dialog">
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
        <v-card-actions>
          <v-form
              ref="form"
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

                @click="createPost"
            >Готово
            </v-btn>
          </v-form>
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
        this.post = {
          title: '',
          body: '',
        }
      }
    }
  },
  computed: {
    form() {
      return {
        title: this.post.title,
        body: this.post.body,
      }
    }
  }
}
</script>

<style scoped>
.text-field {
  margin-bottom: 15px;
}

.create-btn {
  margin-left: 230px;
}
</style>