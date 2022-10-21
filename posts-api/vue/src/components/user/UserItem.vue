<template>
  <v-card class="card" elevation="5">
    <v-card-text>
      <v-col>
          <div><strong>Имя: </strong>{{ user.name }}</div>
          <v-menu transition="scale-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="success"
                  rounded
                  v-bind="attrs"
                  v-on="on"
                  style="margin:15px 0 15px"
              >
                Контактная информация
              </v-btn>
            </template>
            <v-list max-width="280">
              <v-list-item>
                <v-list-item-content>
                  <div><strong>Телефон: </strong>{{ user.phone }}</div>
                  <div><strong>Email: </strong>{{ user.email }}</div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>

        <div><strong>Website: </strong>{{ user.website }}</div>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  padding: 10px;
  margin: 15px;
}

</style>