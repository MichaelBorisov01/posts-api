<template>
  <v-app>

    <v-main>
      <v-row>
        <h3 style="margin: 20px">Список постов</h3>
        <div style="margin: auto">
          <v-dialog width="500" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  class="create-btn"
                  v-bind="attrs"
                  v-on="on"
              >
                Создать пост
              </v-btn>
            </template>
            <post-form style="width: 500px" @create="createPost"/>
          </v-dialog>
        </div>

          <v-select
              v-model="selectedSort"
              @change="setSelectedSort"
              :items="sortOptions"
              item-text="name"
              item-value="value"
              label="Сортировать"
              solo
              dense
              style="max-width: 170px; margin-top: 15px; margin-right: 10px"
          ></v-select>

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
      setDialog: 'post/setDialog',
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
      dialog: state => state.post.dialog,
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

.create-btn {
  margin-left: 30px;
}

.bottom {
  margin-top: 15px;
}
</style>