<script setup>
import NewPost from "@/pages/home/NewPost.vue";
import {onMounted, ref} from "vue"
const upcomingPosts = ref(null)
const pastPosts = ref(null)



onMounted()

</script>

<template>
  <main>

    <h1>Semiahmoo BandEx</h1>


    <section class="content">
      <h2>Upcoming Events</h2>
    </section>
  </main>
</template>

<style scoped>
h1 {
  position: relative; /* relative to hero */
  color: var(--orange);
  font-family: "Imperial Script", cursive;
  font-size: 8rem;
  text-align: center;

}


</style>
