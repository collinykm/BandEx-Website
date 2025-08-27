<script setup>
import MyRouterLink from "@/components/MyRouterLink.vue"
const props = defineProps(['user'])
const emit = defineEmits(['login', 'logout'])
</script>

<template>
  <div class="container">
    <nav class="navbar">
      <MyRouterLink text="Home" to="home"/>
      <MyRouterLink text="Photos" to="photos"/>
      <MyRouterLink text="Mentorship" to="mentorship"/>
      <MyRouterLink text="Applications" to="applications"/>
      <MyRouterLink text="About" to="about"/>
      <a v-if="user == null" @click="$emit('login')" class="link-button">Member Login</a>
      <a v-else @click="$emit('logout')" class="link-button">Logout</a>
    </nav>
  </div>

</template>

<style scoped>

.container {
  position: fixed;
  z-index: 1;
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.navbar {
  padding-right: 20px;
  padding-left: 20px;
  border-radius: 25px;
  height: 50px;
  background-color: rgba(245, 137, 24, 0.17);
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
