<template>
  <div>
    <v-row>
      <post-form @create="createPost" />
      <v-select class="select" style="margin: 10px auto auto 20px" v-model="selectedSort" @change="setSelectedSort"
        :items="sortOptions" item-text="name" item-value="value" label="Сортировать" solo dense />
    </v-row>
    <post-list :posts="sortedAndSearchedPostsAndUsers[0]" @remove="removePost" v-if="!isPostLoading" />
    <div v-else>
      <h3>Загрузка данных...</h3>
    </div>

    <v-bottom-navigation class="bottom">
      <div class="text-center">
        <v-pagination v-model="page" :length="10" @input="changePage"></v-pagination>
      </div>
    </v-bottom-navigation>

  </div>
</template>

<script>
import PostForm from '@/components/post/PostForm.vue'
import PostList from '@/components/post/PostList.vue'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: { PostList, PostForm },

  methods: {
    ...mapMutations({
      setSelectedSort: 'post/setSelectedSort',
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
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
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
}

.bottom {
  margin-top: 15px;
}
</style>