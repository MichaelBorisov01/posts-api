<template>
  <v-col cols="4">
    <v-card @click="openPhoto">
      <v-card-title>
        {{ photo.title }}
      </v-card-title>
      <v-card-text>
        <v-img
            min-width="200"
            min-height="200"
            :src="photo.url"/>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    photo: {
      type: Object,
      required: true,
    }
  },

  methods: {
    openPhoto() {
      this.$emit('openPhoto', this.photo)
    }
  }

}
</script>

<style scoped>

</style>