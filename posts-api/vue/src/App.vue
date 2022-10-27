<template>
  <v-app class="app">

    <v-navigation-drawer
        app
        v-model="drawer"
    >
      <v-list dense nav>
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >
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
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="deep-purple"
        dark
    >
      <v-app-bar-nav-icon @click="drawer = drawer ? !drawer : drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>post-api</v-toolbar-title>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import {mapState} from "vuex";

export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

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