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
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
        >
          <v-list-item-icon>{{ item.icon }}</v-list-item-icon>
          <v-list-item-content>
            <router-link :to=item.path custom v-slot="{ navigate }">
              <v-list-item-title @click="navigate" role="link">{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>

  </v-app>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState({
      items: state => state.post.items,
    }),
  },
}
</script>

<style>
.app {
  padding: 20px;
}
</style>