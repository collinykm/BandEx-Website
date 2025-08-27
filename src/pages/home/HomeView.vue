<script setup>
import NewPost from "@/pages/home/NewPost.vue";

</script>

<template>
  <main>
    <div class="fixed-bg"></div>

    <section class="hero">
      <div class="overlay"></div>
      <h1 class="hero-text">Semiahmoo BandEx</h1>
    </section>
    <div class="spacer" style="height: 100vh"></div>

    <section class="content">
      <p>Now your posts go here and scroll over the image.</p>
      <p v-for="n in 20" :key="n">More content {{ n }}</p>
    </section>
  </main>
</template>

<style scoped>
.fixed-bg {
  background: url("/lanterns.jpeg") center/cover no-repeat;
  position: fixed;
  inset: 0;
  z-index: -2; /* stays behind hero + content */
}

.hero {
  position: fixed;
  height: 100vh; /* full screen */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
}

.overlay {
  position: absolute;
  inset: 0;
  /*background: rgba(0, 0, 0, 0.4);  darken image for text contrast */
  backdrop-filter: sepia(0.1);
}

.hero-text {
  position: relative; /* relative to hero */
  color: white;
  font-family: "Imperial Script", cursive;
  font-size: 8rem;
  text-align: center;
  text-shadow: 0 4px 8px rgba(0,0,0,0.6);
  z-index: 1;
}

.content {
  background: white;
  padding: 2rem;
}
</style>
