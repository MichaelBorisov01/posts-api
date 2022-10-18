<template>
  <v-app class="app">
    <v-app-bar app class="bar">
      <h1>Страница с постами</h1>
      <div class="text-center">
        <v-dialog
            v-model="dialog"
            max-width="300px"
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

      <v-text-field
          v-model="searchQuery"
          @input="setSearchQuery"
          outlined
          label="Поиск по названию..."
          rounded
          style="max-width: 500px; margin: auto"
      />

      <v-select
          style="max-width: 170px; text-align: right; margin-top: 30px"
          v-model="selectedSort"
          @change="setSelectedSort"
          :items="sortOptions"
          item-text="name"
          item-value="value"
          label="Сортировать"
          dense
          solo
      ></v-select>
    </v-app-bar>

    <v-main>
      <post-list :posts="sortedAndSearchedPosts"
                 @remove="removePost"
                 v-if="!isPostLoading"/>
      <div v-else><h3>Загрузка данных...</h3></div>
    </v-main>
    <v-bottom-navigation class="bottom">
      <div class="text-center">
        <v-pagination
            v-model="page"
            :length="10"
            circle
            @input="changePage"
        ></v-pagination>
      </div>
    </v-bottom-navigation>
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
      setSearchQuery: 'post/setSearchQuery',
      setPage: 'post/setPage',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      removePost: 'post/removePost',
      createPost: 'post/createPost',
      changePage: 'post/changePage'
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
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
    }),
    ...mapGetters({
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },

  watch: {
    page() {
      this.fetchPosts()
    }
  }
}
</script>

<style>

.app {
  padding: 20px;
}

.create-btn {
  margin-left: 30px;
}

.bottom {
  margin-top: 15px;
}
</style>