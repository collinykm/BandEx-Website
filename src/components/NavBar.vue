<script setup>

</script>

<template>
  <div class="container">
    <nav class="navbar">
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'photos' }">Photos</RouterLink>
      <RouterLink :to="{ name: 'mentorship' }">Mentorship</RouterLink>
      <RouterLink :to="{ name: 'applications' }">Application</RouterLink>
      <RouterLink :to="{ name: 'about' }">About Us</RouterLink>
    </nav>
  </div>

</template>

<style scoped>

.container {
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.navbar {
  width: 500px;
  border-radius: 25px;
  height: 50px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

#logo {
  height: 40px;
  width: 40px;
}
</style>
