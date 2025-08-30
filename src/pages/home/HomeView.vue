<script setup>
import {onMounted, ref} from "vue"
defineProps(['user'])
import getPosts from "@/services/getPosts.js"
import EventCard from "@/components/EventCard.vue"
import NewPostModal from "@/components/NewPostModal.vue"
import clearImage from "@/services/clearImage.js"
import deletePost from "@/services/deletePost.js"
import Loader from "@/components/Loader.vue"
import getMorePosts from "@/services/getMorePosts.js"
const upcomingPosts = ref([])
const expiredPosts = ref([])

getPosts().then((posts) => {
  upcomingPosts.value = posts.upcoming;
  expiredPosts.value = posts.expired;
})

const isLoadingMorePosts = ref(false)
async function loadMore() {
  isLoadingMorePosts.value = true
  const currentPostCount = upcomingPosts.value.length + expiredPosts.value.length;
  try {
    const newPosts = await getMorePosts(currentPostCount, 5)
    console.log(`new posts found: ${newPosts}`)
    expiredPosts.value.push(...newPosts)
  } catch (error) {
    console.log(error)
  }
  isLoadingMorePosts.value = false

}

const showNewPostModal = ref(false)

const editPostData = ref({
  id: "",
  title: "",
  message: "",
  imageURL: "",
  expirationDate: null,
})

function editPost(post) {
  editPostData.value.id = post.id
  editPostData.value.title = post.title
  editPostData.value.message = post.message
  editPostData.value.imageURL = post.imageURL
  editPostData.value.expirationDate = post.expirationDate
  showNewPostModal.value = true
}

function resetEditPostData() {
  editPostData.value.id = null
  editPostData.value.title = null
  editPostData.value.message = null
  editPostData.value.file = null
  editPostData.value.imageURL = ""
  editPostData.value.expirationDate = null
}

async function delPost(id, imageURL) {
  try {
    //delete image
    if (imageURL !== "") {
      await clearImage(imageURL)
    }
    await deletePost(id)
  } catch (err) {
    console.error(err)
  }
  location.reload()
}
</script>

<template>
  <div class="view-container">
    <h1>Semiahmoo BandEx</h1>
    <div class="button-container">
      <button class="link create-button" v-if="user!=null" @click="() => {resetEditPostData(); showNewPostModal=true;}">+ Create new post</button>
    </div>

    <section class="content">
      <h2>UPCOMING EVENTS</h2>
      <div class="events-container upcoming-event" v-for="post in upcomingPosts" :key="post.id">
        <EventCard :editable="user != null" :id="post._id" :title="post.title" :message="post.message" :imageURL="post.imageURL" :createdAt ="post.createdAt" :expirationDate="post.expirationDate" :withYear="false" @edit="editPost" @delete="delPost"/>
      </div>
      <h2>PAST EVENTS</h2>
      <div class="events-container expired-event" v-for="post in expiredPosts" :key="post.id">
        <EventCard :editable="user != null" :id="post._id" :title="post.title" :message="post.message" :imageURL="post.imageURL" :createdAt ="post.createdAt" :expirationDate="post.expirationDate" :withYear="true" @edit="editPost" @delete="delPost"/>
      </div>
      <div class="load-more" style="display: flex; justify-content: center; margin-bottom: 20px;">
        <button class="button" @click="loadMore">Load More</button>
        <Loader v-if="isLoadingMorePosts" />
      </div>

    </section>
  </div>
  <NewPostModal v-if="showNewPostModal" @close="showNewPostModal = false" :postData="editPostData"/>
</template>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

h1 {
  position: relative; /* relative to hero */
  color: var(--primary);
  font-family: "Gistesy", cursive;
  font-size: 8rem;
  text-align: center;
}

h2 {
  margin-left: 0;
  font-family: "RubikOne", sans-serif;
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

@media (max-width: 600px) {
  .create-button {
    margin-right: 20px;
  }
  h1 {
    font-size: 5rem;
    margin-top: 40px;
  }
  h2 {
    font-size: 2rem;
    margin-left: 10px;
  }
}

.content {
  width:clamp(300px, 95%, 1000px);
}

.events-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}


</style>
