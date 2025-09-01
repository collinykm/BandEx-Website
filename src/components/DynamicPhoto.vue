<script setup>
import {ref} from "vue"

defineProps(['imageURL'])
const imgPortrait = ref(false)

const imgWrapper = ref(null)
const divWidth = ref('')
function onImgLoad(e) {
  if (!imgWrapper.value) {return}
  const { naturalWidth: w, naturalHeight: h } = e.target
  if (h > w) {
    // portrait
    imgPortrait.value = true
    divWidth.value = getComputedStyle(imgWrapper.value).getPropertyValue('width')
  }
}
</script>

<template>
  <div :class="{'img-wrapper': imgPortrait}" ref="imgWrapper" :style="{height: divWidth}"  v-if="imageURL !== ''">
    <img :src="imageURL" alt="poster" class="image" @load="onImgLoad" />
  </div>
</template>

<style scoped>
.img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 30px;
}
</style>
