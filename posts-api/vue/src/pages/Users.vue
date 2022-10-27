<template>
  <v-app>
    <v-main>
      <user-grid :users="sortedAndSearchedPostsAndUsers[1]"/>
    </v-main>
  </v-app>
</template>

<script>
import UserGrid from "@/components/user/UserGrid";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  components: {UserGrid},

  methods: {
    ...mapMutations({
      setUsers: 'post/setUsers',
    }),
    ...mapActions({
      fetchUsers: 'post/fetchUsers',
    }),
  },

  computed: {
    ...mapState({
      users: state => state.post.users,
    }),

    ...mapGetters({
      sortedAndSearchedPostsAndUsers: 'post/sortedAndSearchedPostsAndUsers'
    })
  },

  mounted() {
    this.fetchUsers()
  },
}
</script>

<style>

</style>

