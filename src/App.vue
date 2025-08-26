<script setup>
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from "@/services/firebase.js"
import {ref} from "vue"

const user = ref()
const email = ref("");
const password = ref("");


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
    <RouterView />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
    <p v-if="user">Logged in as: {{ user.email }}</p>
  </body>
</template>

<style scoped></style>
