<script setup>
import { RouterLink } from "vue-router"

// props
defineProps({
  to: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  fontSize: {
    type: String,
    default: "1rem" // default if not passed
  }
})
</script>

<template>
  <RouterLink
    :to="{ name: to }"
    class="link"
    :style="{ fontSize }"
  >
    {{ text }}
  </RouterLink>
</template>

<style scoped>

</style>
