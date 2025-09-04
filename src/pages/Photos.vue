<script setup>
import {onMounted, ref} from "vue"
import getPhotoCards from "@/services/photos/getPhotoCards.js"
import InfoCard from "@/components/InfoCard.vue"
import NewPhotoCardModal from "@/components/NewPhotoCardModal.vue"
import deleteImage from "@/services/deleteImage.js"
import deletePhotoCard from "@/services/photos/deletePhotoCard.js"
import Loader from "@/components/Loader.vue"

defineProps(['user', 'isMobile'])

const photoCards = ref([])
const isLoadingMoreCards = ref(false)
async function getCards(skip = 0) {
  isLoadingMoreCards.value = true
  try {
    const newCards = await getPhotoCards(skip)
    photoCards.value.push(...newCards)
  } catch (error) {
    console.log('get cards error', error)
  }
  isLoadingMoreCards.value = false
}
onMounted(() => getCards())

const showModal = ref(false)
const editCardData = ref({
  id: "",
  title: "",
  message: "",
  imageURL: "",
  eventDate: null,
})
function editPost(post) {
  editCardData.value.id = post.id
  editCardData.value.title = post.title
  editCardData.value.folderLink = post.folderLink
  editCardData.value.imageURL = post.imageURL
  editCardData.value.eventDate = post.eventDate
  showModal.value = true
}

function resetEditCardData() {
  editCardData.value.id = null
  editCardData.value.title = null
  editCardData.value.folderLink = null
  editCardData.value.imageURL = ""
  editCardData.value.eventDate = null
}

async function delPhotoCard(id, imageURL) {
  try {
    //delete image
    if (imageURL !== "") {
      await deleteImage(imageURL)
    }
    await deletePhotoCard(id)
  } catch (err) {
    console.error(err)
  }
  location.reload()
}

</script>

<template>
  <div class="view-container">
    <section class="content">
      <div class="title">
        <h2>EVENT PHOTOS</h2>
        <button class="link create-button" v-if="user!=null" @click="() => {resetEditCardData(); showModal=true;}">+ New post</button>
      </div>


      <div class="photo-card-container" v-for="card in photoCards" :key="card._id">
        <InfoCard :editable="user != null" :id="card._id" :title="card.title" :folderLink="card.folderLink" :imageURL="card.imageURL" :created-at="card.createdAt" :eventDate="card.eventDate" :isMobile="isMobile" @edit="editPost" @delete="delPhotoCard" />
      </div>
      <div class="load-more" style="display: flex; justify-content: center; margin-bottom: 20px;">
        <button class="button" @click="getCards(photoCards.length)">Load More</button>
        <Loader v-if="isLoadingMoreCards" />
      </div>
    </section>
  </div>
  <NewPhotoCardModal v-if="showModal" :cardData="editCardData" @close="showModal = false"/>
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

.create-button {
  background-color: var(--primary);
  color: var(--body-text);
}

.content {
  width:clamp(300px, 95%, 1000px);
}

.photo-card-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
</style>
