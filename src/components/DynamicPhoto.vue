<script setup>
import {ref} from "vue"

defineProps(['imageURL'])
const imgPortrait = ref(false)
function onImgLoad(e) {
  const { naturalWidth: w, naturalHeight: h } = e.target
  if (h > w) {
    // portrait
    imgPortrait.value = true
  }
}
</script>

<template>
  <div :class="{'img-wrapper': imgPortrait}" class="img-wrapper" v-if="imageURL !== ''">
    <img :src="imageURL" alt="poster" class="image" @load="onImgLoad" />
  </div>
</template>

<style scoped>
.img-wrapper {
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* Creates a square by making height equal to width */
  display: block; /* Changed from flex to block */
  position: relative;
  overflow: hidden;
}

.image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  border-radius: 30px;
  object-fit: cover;
}
</style>
