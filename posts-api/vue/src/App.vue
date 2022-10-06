<template>
  <v-app class="app">

    <v-app-bar app>
      <h1>Страница с постами</h1>
    </v-app-bar>

    <v-main>
      <post-list :posts="posts"
                 @remove="removePost"
                 v-if="!isPostLoading"/>
      <div v-else><h3>Loading...</h3></div>
    </v-main>
  </v-app>
</template>

<script>
import PostList from '@/components/PostList.vue'
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

export default {
  components: {PostList},

  methods: {
    ...mapMutations({
      setPosts: 'post/setPosts',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      removePost: 'post/removePost',
    })
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
    }),
    ...mapGetters({

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

</style>