<template>
  <v-app class="app">

    <v-app-bar app class="bar">
      <h1>Страница с постами</h1>
      <div class="text-center">
        <v-dialog
            v-model="dialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="create-btn"
                text
                color="success"
                rounded
                v-bind="attrs"
                v-on="on"
            >
              Создать пост
            </v-btn>
          </template>
          <post-form @create="createPost"/>
        </v-dialog>
      </div>
    </v-app-bar>

    <v-main>
      <v-select
          v-model="selectedSort"
          @change="setSelectedSort"
          :items="sortOptions"
          item-text="name"
          item-value="value"
          label="Сортировать"
          dense
          solo
      ></v-select>
      <post-list :posts="sortedPosts"
                 @remove="removePost"
                 v-if="!isPostLoading"/>
      <div v-else><h3>Загрузка данных...</h3></div>
    </v-main>
  </v-app>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

export default {
  components: {PostList, PostForm},

  methods: {
    ...mapMutations({
      setPosts: 'post/setPosts',
      setDialog: 'post/setDialog',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      removePost: 'post/removePost',
      createPost: 'post/createPost',
    }),
  },

  mounted() {
    this.fetchPosts()
  },

  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      dialog: state => state.post.dialog,
      selectedSort: state => state.post.selectedSort,
      selectedSortId: state => state.post.selectedSortId,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
    })

  },
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 15px;
}

.create-btn {
  margin-left: 30px;
}

</style>