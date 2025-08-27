<script setup>
import { ref }  from "vue"
import { RouterLink } from "vue-router"
import {PhList, PhX} from "@phosphor-icons/vue"
const props = defineProps(['user'])
const emit = defineEmits(['login', 'logout'])
const showMenu = ref(false)
//Note: Change this later

</script>

<template>

  <div class="menu-button-container">
    <button class="menu-button"  @click="showMenu = !showMenu"><PhList :size="32" /></button>
  </div>

  <transition name="slide">
    <div class="menu-container" v-show="showMenu">
      <div class="close-button-container">
        <button id="close-button" @click="showMenu = !showMenu"><PhX :size="32" /></button>
      </div>

      <nav class="nav-list" @click="showMenu = !showMenu">
        <RouterLink :to="{ name: 'home' }" class="link-list">Home</RouterLink>
        <RouterLink :to="{ name: 'photos' }" class="link-list">Photos</RouterLink>
        <RouterLink :to="{ name: 'mentorship' }" class="link-list">Mentorship</RouterLink>
        <RouterLink :to="{ name: 'applications' }" class="link-list">Application</RouterLink>
        <RouterLink :to="{ name: 'about' }" class="link-list">About Us</RouterLink>
        <a v-if="user == null" @click="$emit('login')" class="link-list">Member Login</a>
        <a v-else @click="$emit('logout')" class="link-list">Logout</a>
      </nav>

    </div>
  </transition>
</template>

<style scoped>
/* transition classes automatically applied by Vue */

/* when element is inserted */
.slide-enter-from {
  transform: translateX(100%); /* start offscreen right */
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-enter-active {
  transition: all 0.3s ease;
}

/* when element is removed */
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-active {
  transition: all 0.3s ease;
}

.menu-button-container {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: end;
}

.menu-button {
  background: none;
  border: none;
  margin-top: 20px;
  margin-right: 20px;

}


.menu-container {
  position: fixed;
  z-index: 2;
  right: 0;
  top: 0;
  background-color: var(--background);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.nav-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 20px;
  width: 100%
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



</style>
