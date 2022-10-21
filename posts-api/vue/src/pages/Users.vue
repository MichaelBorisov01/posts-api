<template>
  <v-app>
    <v-app-bar app class="bar">
      <h1>Страница с пользователями</h1>
    </v-app-bar>
    <v-parallax
        height="auto"
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    >
      <v-main>
        <user-grid :users="users"/>
      </v-main>

    </v-parallax>
  </v-app>
</template>

<script>
import UserGrid from "@/components/user/UserGrid";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  components: {UserGrid},

  methods: {
    ...mapMutations({
      setUsers: 'user/setUsers',
    }),
    ...mapActions({
      fetchUsers: 'user/fetchUsers',
    }),
  },

  computed: {
    ...mapState({
      users: state => state.user.users,
      limit: state => state.user.limit,
      totalPages: state => state.user.totalPages,
    }),
  },

  mounted() {
    this.fetchUsers()
  },
}
</script>

<style>

</style>

