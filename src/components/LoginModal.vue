<script setup>
import {onMounted, onUnmounted, ref} from "vue"
import {PhX} from "@phosphor-icons/vue"
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "@/services/firebase.js"
import CloseButton from "@/components/CloseButton.vue"

const isMobile = ref(window.innerWidth < 600)

function updateWidth() {
  isMobile.value = window.innerWidth < 600
  console.log(isMobile.value)
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

const emit = defineEmits(['hide'])
const email = ref("");
const password = ref("");
const validLoginInfo = ref(true)
const user = ref(null)

async function login() {
  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, password.value)
    user.value = cred.user
    emit('hide')
  } catch (err) {
    console.error(err.code, err.message)
    // Firebase error codes distinguish wrong email vs wrong password
    if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
      validLoginInfo.value = false
    }
    user.value = null
    await new Promise(resolve => setTimeout(resolve, 3000))
    validLoginInfo.value = true
  }
}
</script>

<template>

  <div class="modal-container" @click.self="$emit('hide')">
    <div class="modal-content" :style="isMobile? { width: '100%', height: '100%'} : { width: '500px', height: '400px', 'border-radius': '20px'}">
      <CloseButton @close="$emit('close')" />
      <h1>BandEx Member Sign in</h1>
      <input class="input" v-model="email" placeholder="Email" />
      <input class="input" v-model="password" type="password" placeholder="Password" />
      <button class="link" @click="login" >Login</button>
      <Transition>
        <a-alert v-if="!validLoginInfo" message="Invalid email or password" type="error" />
      </Transition>

    </div>
  </div>

</template>

<style scoped>
.link {
  font-size: 0.8rem;
  margin: 0;
}
.close-button-container {
  width: 100%;
  display: flex;
  justify-content: end;

}

#close-button {
  margin-top: 20px;
  margin-right: 20px;
  background: none;
  border: none;
}

.modal-content {
  position: fixed;
  z-index: 4;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 16px;
}

.modal-container {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(164, 164, 164, 0.54);
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  width: 300px;
}

.link {
  padding: 16px;
  font-size: 1.1rem;
}

.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-active {
  transition: opacity 0.2s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

.v-enter-to, .v-leave-from {
  opacity: 1;
}

</style>
