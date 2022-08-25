<template>
  <v-container>
    <PhotoForm @addPhoto="addPhoto"/>

    <transition-group name="bounce">
      <Photo
          @openPhoto='openPhoto'
          @remove="removePhoto"
          class="photo"
          :photo="photo"
          v-for="photo in photos"
          :key="photo.id"
      />
    </transition-group>

    <PhotoDialog :photo="currentPhoto" v-model="dialogVisible"/>
  </v-container>
</template>

<script>
import Photo from "@/components/photo/Photo";
import PhotoForm from "@/components/photo/PhotoForm";
import PhotoDialog from "@/components/photo/PhotoDialog";

export default {
  components: {PhotoDialog, Photo, PhotoForm},
  data: () => ({
    photos: [],
    currentPhoto: {},
    dialogVisible: false
  }),
  mounted() {
    this.fetchTodo()
  },
  methods: {
    fetchTodo() {
      this.axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10')
          .then(response => this.photos = response.data)
    },
    addPhoto(photo) {
      this.photos.push(photo)
    },
    openPhoto(photo) {
      this.currentPhoto = photo
      this.dialogVisible = true
    },
    removePhoto(photo) {
      this.photos = this.photos.filter(p => p.id !== photo.id)
    }
  },

}
</script>

<style scoped>
.photo {
  display: inline-flex;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>