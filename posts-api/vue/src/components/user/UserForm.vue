<template>
  <v-dialog width="350" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="create-btn"
          v-bind="attrs"
          v-on="on"
      >
        Создать пользователя
      </v-btn>

    </template>
    <v-card>
      <v-card-title>
        <h3>Создание пользователя</h3>
      </v-card-title>

      <v-card-text>
        <v-form
            id="form"
            ref="form"
            lazy-validation
        >
          <v-text-field
              class="text-field"
              v-model="user.name"
              label="Имя"
              :rules="[rules.required, rules.name]"
          />
          <v-text-field
              class="text-field"
              v-model="user.username"
              label="Username"
          />
          <v-text-field
              class="text-field"
              v-model="user.email"
              label="E-mail"
              :rules="[rules.required, rules.email]"
          />
          <v-text-field
              class="text-field"
              v-model="user.phone"
              label="Телефон"
              :rules="[rules.required, rules.phone]"
              placeholder="9188509978"
              counter="10"
          />
          <v-text-field
              class="text-field"
              v-model="user.website"
              label="Website"
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
        <v-btn @click="createUser"
        >Готово
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      formHasErrors: false,
      dialog: false,
      user: {
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
      },
      rules: {
        required: value => !!value || 'Обязательное поле',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неправильный e-mail'
        },
        name: value => {
          const pattern = /^[a-zA-Z]+$/
          return pattern.test(value) || 'Неправильное имя'
        },
        phone: value => {
          const pattern = /^\d{10}$/
          return pattern.test(value) || 'Неправильный номер телефона'
        },
      },
    }
  },

  methods: {
    createUser() {
      if (this.$refs.form.validate()) {
        this.formHasErrors = false
        this.dialog = false
        this.user.id = Date.now()
        this.$emit('create', this.user)
        this.clear()
      } else this.formHasErrors = true
    },

    cancel() {
      this.dialog = false
      this.clear()
    },

    clear() {
      this.user = {
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
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
  margin-bottom: 10px;
}
</style>