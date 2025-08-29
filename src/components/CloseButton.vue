<script setup>
import {PhX} from "@phosphor-icons/vue"
import {ref} from "vue"

const props = defineProps(['size'])


</script>

<template>
  <div class="close-button-container">
    <button class="icon-button" @click="$emit('close')"><PhX :size="size ?? 32" /></button>
  </div>
</template>

<style scoped>
.close-button-container {
  width: 100%;
  display: flex;
  justify-content: end;

}



</style>
