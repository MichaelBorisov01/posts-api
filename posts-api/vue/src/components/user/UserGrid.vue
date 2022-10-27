<template>
  <div>
    <h3>Список пользователей</h3>
    <v-container style="text-align: center">

        <v-row>
          <v-col
              v-for="user in users"
              :user="user"
          >
            <user-item
                :user="user"
                :key="user.id"
            />
          </v-col>
        </v-row>

    </v-container>
  </div>
</template>

<script>
import UserItem from "@/components/user/UserItem";

export default {

  data: () => ({
    alignments: [
      'start',
      'center',
      'end',
    ],
  }),

  components: {UserItem},
  props: {
    users: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>
</style>