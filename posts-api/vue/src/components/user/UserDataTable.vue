<template>
  <v-data-table :headers="headers" :items="users" item-key="name" :search="searchQuery" class="elevation-2">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Пользователи</v-toolbar-title>
        <v-spacer></v-spacer>
        <user-form @create="createUser" />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import UserForm from "@/components/user/UserForm.vue";

export default {
  components: { UserForm },

  methods: {
    ...mapMutations({
      setSearchQuery: 'post/setSearchQuery',
      setUsers: 'post/setUsers',
    }),
    ...mapActions({
      createUser: 'post/createUser'
    }),

    deleteItem(item) {
      const index = this.users.indexOf(item)
      confirm('Вы уверены, что хотите удалить этого пользователя?') && this.users.splice(index, 1)
    },
  },

  computed: {
    ...mapState({
      users: state => state.post.users,
      searchQuery: state => state.post.searchQuery,
    }),

    headers() {
      return [
        { text: 'Name', align: 'start', value: 'name' },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Website', value: 'website' },
        { text: 'Действия', value: 'actions', sortable: false },
      ]
    },
  },
}
</script>

<style scoped>

</style>