<script setup>

</script>

<template>
  <div class="footer">
    <p>The official website for the Semiahmoo Band Executive</p>
    <div class="links">
      <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink class="link" :to="{ name: 'photos' }">Photos</RouterLink>
      <RouterLink class="link" :to="{ name: 'mentorship' }">Mentorship</RouterLink>
      <RouterLink class="link" :to="{ name: 'applications' }">Application</RouterLink>
      <RouterLink class="link" :to="{ name: 'about' }">About Us</RouterLink>
    </div>
    <p>© 2025 Collin Yang. All rights reserved.</p>
  </div>
</template>

<style scoped>
.footer {
  width: 100%;
  height: fit-content;
  padding: 20px;
  background-color: rgb(234 201 101);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.link {
  text-decoration: underline;
  color: var(--accent1);
  transition: color 0.2s;
  /*background-color: color-mix(in srgb, var(--orange) 95%, white);*/
  padding: 8px;
  border-radius: 12px;
  border: none;
}

.link:hover {
  color: var(--primary);
}

</style>
