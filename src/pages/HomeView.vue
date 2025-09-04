<script setup>
import {onMounted, ref} from "vue"
defineProps(['user', 'isMobile'])
import getPosts from "@/services/posts/getPosts.js"
import InfoCard from "@/components/InfoCard.vue"
import NewPostModal from "@/components/NewPostModal.vue"
import deleteImage from "@/services/deleteImage.js"
import deletePost from "@/services/posts/deletePost.js"
import Loader from "@/components/Loader.vue"
import getMorePosts from "@/services/posts/getMorePosts.js"
const upcomingPosts = ref([])
const expiredPosts = ref([])

onMounted(() => {
  getPosts().then((posts) => {
    upcomingPosts.value = posts.upcoming;
    expiredPosts.value = posts.expired;
    console.log(upcomingPosts.value)
  })
  }
)


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
  eventDate: null,
})

function editPost(post) {
  editPostData.value.id = post.id
  editPostData.value.title = post.title
  editPostData.value.message = post.message
  editPostData.value.imageURL = post.imageURL
  editPostData.value.eventDate = post.eventDate
  showNewPostModal.value = true
}

function resetEditPostData() {
  editPostData.value.id = null
  editPostData.value.title = null
  editPostData.value.message = null
  editPostData.value.file = null
  editPostData.value.imageURL = ""
  editPostData.value.eventDate = null
}

async function delPost(id, imageURL) {
  try {
    //delete image
    if (imageURL !== "") {
      await deleteImage(imageURL)
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


    <section class="content">
      <div class="title">
        <h2>UPCOMING EVENTS</h2>

        <button class="create-button button" v-if="user!=null" @click="() => {resetEditPostData(); showNewPostModal=true;}">+ New post</button>

      </div>

      <p v-if="upcomingPosts.length === 0">No upcoming events</p>
      <div class="events-container upcoming-event" v-for="post in upcomingPosts" :key="post.id">
        <InfoCard :editable="user != null" :id="post._id" :title="post.title" :message="post.message" :imageURL="post.imageURL" :createdAt ="post.createdAt" :eventDate="post.eventDate" :withYear="false" :isMobile="isMobile" @edit="editPost" @delete="delPost"/>
      </div>
      <h2>PAST EVENTS</h2>
      <div class="events-container expired-event" v-for="post in expiredPosts" :key="post.id">
        <InfoCard :editable="user != null" :id="post._id" :title="post.title" :message="post.message" :imageURL="post.imageURL" :createdAt ="post.createdAt" :eventDate="post.eventDate" :withYear="true" :isMobile="isMobile" @edit="editPost" @delete="delPost"/>
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


.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

h1 {
  position: relative; /* relative to hero */
  color: var(--primary);
  font-family: "Gistesy", cursive;
  font-size: min(10vw, 100px);
  line-height: 7rem;
  text-align: center;
  margin-top: 40px;
}


.create-button {
  background-color: var(--primary);
  color: var(--body-text);
}

@media (max-width: 600px) {
  .create-button {
    margin-right: 20px;
  }
  h1 {
    font-size: 5rem;
    margin: 0;
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
