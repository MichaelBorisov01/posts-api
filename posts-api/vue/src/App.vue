<template>
  <v-app class="app">

    <v-navigation-drawer
        app
        permanent
        expand-on-hover
        mini-variant
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Меню
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list rounded dense nav>
        <v-list-item>
          <v-list-item-icon>1</v-list-item-icon>
          <v-list-item-title>
            <router-link to="/">Посты</router-link>
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>2</v-list-item-icon>
          <v-list-item-title>
            <router-link to="/user">Пользователи</router-link>
          </v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>

  </v-app>
</template>

<script>
</script>

<style>
.app {
  padding: 20px;
}
</style>