<template>
  <div>
    <v-dialog width="500" v-model="dialog">
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
        <v-card-actions>
          <v-form
              ref="form"
              lazy-validation
              style="width: 500px"
          >
            <v-text-field
                class="text-field"
                v-model="user.name"
                label="Имя"
                :rules="[rules.required]"
            />
            <v-text-field
                class="text-field"
                v-model="user.username"
                label="Username"
            />
            <v-text-field
                class="text-field"
                v-model="user.email"
                label="Email"
                :rules="[rules.required]"
            />
            <v-text-field
                class="text-field"
                v-model="user.phone"
                label="Телефон"
                :rules="[rules.required]"
            />
            <v-text-field
                class="text-field"
                v-model="user.website"
                label="Website"
            />
            <v-btn
                class="done-btn"
                @click="createUser"
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
      user: {
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
      },
      rules: {
        required: value => !!value || 'Обязательное поле',
      },
    }
  },

  methods: {
    createUser() {
      if (this.$refs.form.validate()) {
        this.dialog = false
        this.user.id = Date.now()
        this.$emit('create', this.user)
        this.user = {
          name: '',
          username: '',
          email: '',
          phone: '',
          website: ''
        }
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
  margin-bottom: 10px;
}
</style>