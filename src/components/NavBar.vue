<script setup>

import MyRouterLink from "@/components/MyRouterLink.vue"
</script>

<template>
  <div class="container">
    <nav class="navbar">
      <MyRouterLink text="Home" to="home"/>
      <MyRouterLink text="Photos" to="photos"/>
      <MyRouterLink text="Mentorship" to="mentorship"/>
      <MyRouterLink text="Applications" to="applications"/>
      <MyRouterLink text="About" to="about"/>
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
  background-color: var(--orange);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

#logo {
  height: 40px;
  width: 40px;
}
</style>
