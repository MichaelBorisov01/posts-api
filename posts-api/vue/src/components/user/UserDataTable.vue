<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="users"
        item-key="name"
        class="elevation-2"
        :search="searchQuery"
    >
      <template v-slot:body.append>
        <tr>
          <td colspan="4"></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {

  props: {
    users: {
      type: Array,
      required: true
    }
  },

  methods: {
    ...mapMutations({
      setSearchQuery: 'post/setSearchQuery',
    }),
  },

  computed: {

    headers() {
      return [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        {text: 'Name', value: 'name'},
        {text: 'Username', value: 'username'},
        {text: 'Email', value: 'email'},
        {text: 'Phone', value: 'phone'},
        {text: 'Website', value: 'website'},
      ]
    },

    ...mapState({
      items: state => state.post.items,
      searchQuery: state => state.post.searchQuery,
    }),
  },
}
</script>

<style scoped>

</style>