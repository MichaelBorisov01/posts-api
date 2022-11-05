<template>
  <v-app class="app">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>post-api</v-toolbar-title>

        <v-text-field
            solo
            dense
            rounded
            prepend-inner-icon="mdi-magnify"
            v-model="searchQuery"
            @input="setSearchQuery"
            outlined
            label="Поиск по названию..."
            style="max-width: 500px; margin: 8px auto auto;"
        />

    </v-app-bar>
    <v-navigation-drawer
        app
        v-model="drawer"
    >
      <v-list dense nav>
        <v-list-item-group
            v-model="group"
            active-class="deep-blue--text text--accent-4"
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

    <router-view></router-view>

  </v-app>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  data() {
    return {
      drawer: false,
      group: null,
    }
  },

  methods: {
    ...mapMutations({
      setSearchQuery: 'post/setSearchQuery',
    }),
  },

  computed: {
    ...mapState({
      items: state => state.post.items,
      searchQuery: state => state.post.searchQuery,
    }),
  },
}
</script>

<style>
.app {
  padding: 20px;
}
</style>