<template>
  <div>

    <transition-group name="post-list">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </transition-group>

  </div>
</template>

<script>
import PostItem from "@/components/post/PostItem";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.3s;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.post-list-move {
  transition: transform 0.8s;
}
</style>