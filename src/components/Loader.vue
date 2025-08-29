<script setup>
import {ref} from "vue"

const props = defineProps(['size'])
const diameter = ref(props.size ?? 40)
</script>



<template>
  <div class="container">
    <div class="loader" :style="{height: diameter+'px', width: diameter+'px', 'border-radius': diameter/2 +'px'}"></div>
  </div>

</template>

<style scoped>
.container {
  height: fit-content;
  width: fit-content;
}


/* From Uiverse.io by Fernando-sv */


.loader {
  border: 4px solid rgba(86, 86, 86, 0.34);
  border-left-color: transparent;
  aspect-ratio: 1 / 1;
  animation: spin89345 1s linear infinite;
}

@keyframes spin89345 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
<script setup lang="ts">
</script>
