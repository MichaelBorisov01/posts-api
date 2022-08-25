<template>
  <v-col cols="4">
    <v-card @click="openPhoto">
      <div>
        <button class="btn"
                @click="$emit('remove',photo)">
          Delete
        </button>
      </div>
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
.btn {
  padding: 10px 15px;
  background: none;
  color: black;
  border: 2px solid black;
}
</style>