<script setup>
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from "@/services/firebase.js"
import { ref, onMounted, onUnmounted } from "vue"
import NavBar from "@/components/NavBar.vue"
import MobileNavMenu from "@/components/MobileNavMenu.vue"

const user = ref()
const email = ref("");
const password = ref("");



const isMobile = ref(window.innerWidth < 500)

function updateWidth() {
  isMobile.value = window.innerWidth < 500
  console.log(isMobile.value)
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})



onAuthStateChanged(auth, (u) => {
  if (u) {
    user.value = u
  } else {
    user.value = null
  }
})
async function login() {
  const cred = await signInWithEmailAndPassword(auth, email.value, password.value);
  user.value = cred.user;
}

async function logout() {
  await signOut(auth);
  user.value = null;
}

</script>

<template>
  <body>
    <NavBar v-if="!isMobile"/>
    <MobileNavMenu v-else/>
    <RouterView />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
    <p v-if="user">Logged in as: {{ user.email }}</p>
  </body>
</template>

<style scoped></style>
