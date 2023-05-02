<template>
  <user-data-table :users="sortedAndSearchedPostsAndUsers[1]" />
</template>

<script>
import UserDataTable from "@/components/user/UserDataTable";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { UserDataTable },

  methods: {
    ...mapActions({
      fetchUsers: 'post/fetchUsers',
    }),
  },

  computed: {
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

