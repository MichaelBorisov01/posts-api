<template>
  <v-app>
    <v-main>
      <user-grid :users="users"/>
    </v-main>
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

