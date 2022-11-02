<template>
  <v-app>
    <v-main>
      <v-row>
        <post-form @create="createPost"/>
        <div style=" ">
          <v-select
              class="select"
              v-model="selectedSort"
              @change="setSelectedSort"
              :items="sortOptions"
              item-text="name"
              item-value="value"
              label="Сортировать"
              solo
              dense
          />
        </div>
      </v-row>
      <post-list :posts="sortedAndSearchedPostsAndUsers[0]"
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
      setSelectedSort: 'post/setSelectedSort',
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
      totalPages: state => state.post.totalPages,
      selectedSort: state => state.post.selectedSort,
      selectedSortId: state => state.post.selectedSortId,
      sortOptions: state => state.post.sortOptions,
      items: state => state.post.items,
    }),
    ...mapGetters({
      sortedAndSearchedPostsAndUsers: 'post/sortedAndSearchedPostsAndUsers'
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
.select {
  max-width: 170px;
  position: fixed;
  right: 20px;
  top: 80px;
}

.bottom {
  margin-top: 15px;
}
</style>