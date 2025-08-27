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
    class="router-link"
    :style="{ fontSize }"
  >
    {{ text }}
  </RouterLink>
</template>

<style scoped>
.router-link {
  text-decoration: none;
  color: var(--yellow);
  transition: color 0.2s;
  background-color: color-mix(in srgb, var(--orange) 95%, white);
  padding: 8px;
  border-radius: 12px;
}

.router-link:hover {
  color: var(--red);
  transition: padding 0.2s, color 0.5s;

  padding: 10px;
}
</style>
