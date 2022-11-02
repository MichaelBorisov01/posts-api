<template>
  <v-app>
    <v-main>
      <user-form @create="createUser"/>
      <user-data-table :users="sortedAndSearchedPostsAndUsers[1]"/>
    </v-main>
  </v-app>
</template>

<script>
import UserForm from "@/components/user/UserForm.vue";
import UserDataTable from "@/components/user/UserDataTable";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  components: {UserDataTable, UserForm},

  methods: {
    ...mapMutations({
      setUsers: 'post/setUsers',
    }),
    ...mapActions({
      fetchUsers: 'post/fetchUsers',
      createUser: 'post/createUser'
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

