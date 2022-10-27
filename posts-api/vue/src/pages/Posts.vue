<template>
  <v-app>
      <v-main>
        <div>
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  class="create-btn"
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
        />

        <v-select
            v-model="selectedSort"
            @change="setSelectedSort"
            :items="sortOptions"
            item-text="name"
            item-value="value"
            label="Сортировать"
            solo
        ></v-select>
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
              @input="changePage"
          ></v-pagination>
        </div>
      </v-bottom-navigation>

  </v-app>
</template>

<script>
import PostForm from '@/components/post/PostForm.vue'
import PostList from '@/components/post/PostList.vue'
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
      items: state => state.post.items,
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

.create-btn {
  margin-left: 30px;
}

.bottom {
  margin-top: 15px;
}
</style>