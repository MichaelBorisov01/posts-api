<template>
  <v-app>
    <v-main>
      <user-data-table :users="sortedAndSearchedPostsAndUsers[1]"/>
    </v-main>
  </v-app>
</template>

<script>
import UserDataTable from "@/components/user/UserDataTable";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  components: {UserDataTable},

  data() {
    return {

    }
  },

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

