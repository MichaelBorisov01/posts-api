<template>
  <v-container>
    <PhotoForm @addPhoto="addPhoto"/>
    <v-row>
      <Photo
          @openPhoto='openPhoto'
          @remove="removePhoto"
          class="photo"
          :photo="photo"
          v-for="photo in photos"
          :key="photo.id"
      />
    </v-row>
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

</style>