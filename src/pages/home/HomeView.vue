<script setup>
import {onMounted, ref} from "vue"
defineProps(['user'])
import getPosts from "@/services/getPosts.js"
import EventCard from "@/components/EventCard.vue"
import NewPostModal from "@/components/NewPostModal.vue"
const upcomingPosts = ref(null)
const expiredPosts = ref(null)

getPosts().then((posts) => {
  upcomingPosts.value = posts.upcoming;
  expiredPosts.value = posts.expired;
})


const showNewPostModal = ref(false)


</script>

<template>
  <main>
    <h1>Semiahmoo BandEx</h1>
    <div class="button-container">
      <button class="link create-button" v-if="user!=null" @click="showNewPostModal=true">+ Create new post</button>
    </div>

    <section class="content">
      <h2>Upcoming Events</h2>
      <div class="events-container upcoming-event" v-for="post in upcomingPosts" :key="post.id">
        <EventCard :title="post.title" :message="post.message" :imageURL="post.imageURL" :createdAt ="post.createdAt" :withYear="false" />
      </div>
      <h2>Past Events</h2>
      <div class="events-container expired-event" v-for="post in expiredPosts" :key="post.id">
        <EventCard :title="post.title" :message="post.message" :imageURL="post.imageURL" :createdAt ="post.createdAt" :withYear="true" />
      </div>
    </section>
  </main>
  <NewPostModal v-if="showNewPostModal" @close="showNewPostModal = false"/>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

h1 {
  position: relative; /* relative to hero */
  color: var(--primary);
  font-family: "Imperial Script", cursive;
  font-size: 8rem;
  text-align: center;
}


.button-container {
  width: 100%;
  display: flex;
  justify-content: end;
}

.create-button {
  background-color: var(--primary);
  color: var(--body-text);
  margin-right: calc((100% - clamp(300px, 80%, 1000px))/2 + 50px) ;
}

@media (max-width: 576px) {
  .create-button {
    margin-right: 20px;
  }
}

.content {
  width:clamp(300px, 80%, 1000px);
}

.events-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}


</style>
