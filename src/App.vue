<script setup>
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {auth} from "@/services/firebase.js"
import { ref, onMounted, onUnmounted } from "vue"
import NavBar from "@/components/NavBar.vue"
import MobileNavMenu from "@/components/MobileNavMenu.vue"
import LoginModal from "@/components/LoginModal.vue"
import Footer from "@/components/Footer.vue"

const user = ref()



const isMobile = ref(window.innerWidth < 700)

function updateWidth() {
  isMobile.value = window.innerWidth < 700
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


async function logout() {
  await signOut(auth);
  user.value = null;
}

const showLoginModal = ref(false)

</script>

<template>
  <body>
    <header>
      <NavBar v-if="!isMobile" @login="showLoginModal = !showLoginModal" @logout="logout" :user="user"/>
      <MobileNavMenu v-else  @login="showLoginModal = !showLoginModal" @logout="logout" :user="user"/>
      <div :style="{height: isMobile ? '30px' : '130px', width: '100%'}"></div>
    </header>
    <main>
      <LoginModal v-if="showLoginModal" @hide="showLoginModal=false"/>
      <RouterView :user="user" />
    </main>
    <footer>
      <Footer/>
    </footer>


  </body>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
}
main{
  flex: 1;
}
</style>
