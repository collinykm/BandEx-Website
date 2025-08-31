<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue"
import DragUploadBox from "@/components/DragUploadBox.vue"

import uploadFile from "@/services/uploadFile.js"
import CloseButton from "@/components/CloseButton.vue"
import dayjs from "dayjs"
import Loader from "@/components/Loader.vue"
import deleteImage from "@/services/deleteImage.js"
import timedToggle from "@/utils/timedToggle.js"
import {editCard, newCard} from "@/services/photos/sendPhotoCard.js"
import DynamicPhoto from "@/components/DynamicPhoto.vue"

const props = defineProps(['cardData'])
defineEmits(["close"])

const isMobile = ref(window.innerWidth < 600)
function updateWidth() {
  isMobile.value = window.innerWidth < 600
}
onMounted(() => {
  document.body.style.overflow = "hidden"
  window.addEventListener('resize', updateWidth)

  const primary = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary')
    .trim()
  const font = getComputedStyle(document.body).getPropertyValue("font-family")

  //for the ant design date picker
  theme.value = {
    token: {
      colorPrimary: primary,
      colorInfo: primary,
      fontFamily: font,
      borderRadiusLG: 16,
      borderRadiusSM: 12,
    },
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
  document.body.style.overflow = ""
})

const theme = ref({})


const id = props.cardData.id
const isEditing = ref(props.cardData.eventDate != null)
const title = ref(props.cardData.title)
const folderLink = ref(props.cardData.folderLink)
const imageURL = ref(props.cardData.imageURL)
const hasImage = computed(() => imageURL.value !== "")
const originalImageURL = props.cardData.imageURL
const eventDate = ref(isEditing.value ? dayjs(props.cardData.eventDate) : null)


const file = ref(null)

const confirm = ref(0)
const postText = ref(isEditing.value ? "Publish Changes" : "Post")
const errorMsg = ref(null)
const isSubmitting = ref(false)

async function handleSubmit() {
  if (folderLink.value === "" || eventDate.value == null) {
    timedToggle(errorMsg, "Must have a link and event date", null)
    return
  }
  if (confirm.value === 0) {
    confirm.value = 1
    postText.value = "Confirm?"
    return
  }
  isSubmitting.value = true

  if (!isEditing.value) {
    await createNewCard()
  } else {
    await postEditedCard()
  }

  isSubmitting.value = false
  location.reload()
}

async function createNewCard() {
  //handling upload
  try {
    //require an expiration date, and message
    let url = ""
    if (file.value != null) {
      url = await uploadFile(file.value)
      console.log(`image url after uploading: ${url}`)
    }

    await newCard({
      title: title.value,
      folderLink: folderLink.value.trim(),
      createdAt: new Date(),
      imageURL: url,
      eventDate: eventDate.value,
    })
  } catch (error) {
    console.log(error)
  }
}

async function postEditedCard() {
  try {
    //first thing delete image if user removed it
    let url = imageURL.value !== "" ? imageURL.value : ""
    if (imageURL.value === "") {
      console.log("gonna start clearing image")
      await deleteImage(originalImageURL)
      console.log("cleared image")
      if (file.value != null) {
        url = await uploadFile(file.value)
        console.log(`image url after uploading: ${url}`)
      }
    }


    const cardData = {
      id: id,
      title: title.value,
      folderLink: folderLink.value.trim(),
      imageURL: url,
      eventDate: eventDate.value,
    }
    console.log("the cardData im abouta send to backend: ", cardData)
    //uploading image
    await editCard(cardData)

  } catch (error) {
    console.log(error)
  }

}
</script>

<template>
  <Teleport to="body">
    <div class="modal-container" @click.self="$emit('close')">
      <div class="modal-content" :style="isMobile? { width: '100vw', height: '100%'} : { width: '600px', 'border-radius': '30px'}">
        <CloseButton @close="$emit('close')" />
        <h2>{{isEditing ? "Edit Photos Post" :  "New Photos Post" }}</h2>

        <input placeholder="Title" v-model="title" class="input"/>
        <input placeholder="Full link to google drive folder" type="url" v-model="folderLink" class="input"/>



        <!--Note: if editing photo and there already is an image -->
        <div class="image-container" v-if="hasImage">
          <DynamicPhoto :imageURL="originalImageURL"/>
          <!--Note: resetting imageURL NOT originalImageURL-->
          <button class="button" @click="imageURL = ''">Clear Image</button>
        </div>

        <!--Note: File drop a new photo -->

        <div class="fileDropContainer" v-else>
          <p>Add a cover photo to encapsulate the event</p>
          <DragUploadBox @fileChanged="(newFile) => file = newFile"/>
          <div v-if="file">
            <p>Selected file: {{ file.name }}</p>
          </div>
          <button class="button clearButton" @click="file = null">Clear file</button>
        </div>

        <!--Note: Date picker -->
        <div class="date-time-picker">
          <label>Event Date</label>
          <a-config-provider :theme="theme">
            <a-date-picker v-model:value="eventDate" class="date-picker"/>
          </a-config-provider>

        </div>

        <button type="submit" class="button submitButton" @click="handleSubmit">{{ postText }}</button>
        <Transition>
          <p id="error" v-if="errorMsg != null">{{ errorMsg }}</p>
        </Transition>

        <!-- add a spinning thing that appears when isSubmitting is true  -->
        <Loader v-if="isSubmitting"/>
      </div>
    </div>
  </Teleport>


</template>

<style scoped>
.modal-container {
  position: fixed;
  z-index: 3;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(164, 164, 164, 0.54);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
}


.modal-content {
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 16px;
  padding: 30px;
  border: 4px solid var(--secondary);
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
h2{
  margin: 0 0 10px;
}

.input {
  width: min(450px, 80%);
}

.image-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}



.fileDropContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}


.date-time-picker {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}



#error {
  color: var(--accent1);
}

.dragging{
  background-color: var(--accent1);
}

.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-active {
  transition: opacity 0.4s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

.v-enter-to, .v-leave-from {
  opacity: 1;
}


</style>
