<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue"
import DragUploadBox from "@/components/DragUploadBox.vue"
import {newPost, editPost} from "@/services/sendPost.js"
import uploadFile from "@/services/uploadFile.js"
import CloseButton from "@/components/CloseButton.vue"
import dayjs from "dayjs"
import Loader from "@/components/Loader.vue"
import clearImage from "@/services/clearImage.js"
import timedToggle from "@/utils/timedToggle.js"

const props = defineProps(['postData'])
const emit = defineEmits(["close"])

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


const id = props.postData.id
const isEditing = ref(props.postData.expirationDate != null)
const title = ref(props.postData.title)
const message = ref(props.postData.message)
const imageURL = ref(props.postData.imageURL)
console.log(imageURL.value != null, `123${imageURL.value}456`)
const hasImage = computed(() => imageURL.value !== "")
const originalImageURL = props.postData.imageURL
const expirationDate = ref(isEditing.value ? dayjs(props.postData.expirationDate) : null)


const file = ref(null)

const confirm = ref(0)
const postText = ref(isEditing.value ? "Publish Changes" : "Post")
const errorMsg = ref(null)
const isSubmitting = ref(false)
//Region: submitting section
async function handleSubmit() {
  if (message.value === "" || expirationDate.value == null) {
    timedToggle(errorMsg, "Must have a message and expiration date", null)
    return
  }
  if (confirm.value === 0) {
    confirm.value = 1
    postText.value = "Confirm?"
    return
  }
  isSubmitting.value = true

  if (!isEditing.value) {
    await createNewPost()
  } else {
    await postEditedPost()
  }

  isSubmitting.value = false
  location.reload()
}
//Region: submit new post
async function createNewPost() {
  //handling upload
  try {
    //require an expiration date, and message
    let url = ""
    if (file.value != null) {
      url = await uploadFile(file.value)
      console.log(`image url after uploading: ${url}`)
    }

    await newPost({
      title: title.value,
      message: message.value,
      createdAt: new Date(),
      imageURL: url,
      expirationDate: expirationDate.value,
    })
  } catch (error) {
    console.log(error)
  }
}

//Region: submit edited post
async function postEditedPost() {
  try {
    //first thing delete image if user removed it
    let url = ""
    if (imageURL.value === "") {
      console.log("gonna start clearing image")
      await clearImage(originalImageURL)
      console.log("cleared image")
      if (file.value != null) {
        url = await uploadFile(file.value)
        console.log(`image url after uploading: ${url}`)
      }
    }

    //uploading image
    await editPost({
      id: id,
      title: title.value,
      message: message.value,
      imageURL: url,
      expirationDate: expirationDate.value,
    })

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
        <h2>{{isEditing ? "Edit Post" :  "New Post" }}</h2>

        <input placeholder="Title" v-model="title" class="input"/>
        <textarea placeholder="Message" v-model="message" class="input" id="message" rows="6"/>

        <!--Note: if editing photo and there already is an image -->
        <div class="image-container" v-if="hasImage">
          <div class="img-wrapper"><img :src="originalImageURL" alt="poster" class="image"></div>
          <!--Note: resetting imageURL NOT originalImageURL-->
          <button class="button" @click="imageURL = ''">Clear Image</button>
        </div>

        <!--Note: File drop a new photo -->

        <div class="fileDropContainer" v-else>
          <DragUploadBox @fileChanged="(newFile) => file = newFile"/>
          <div v-if="file">
            <p>Selected file: {{ file.name }}</p>
          </div>
          <button class="button clearButton" @click="file = null">Clear file</button>
        </div>

        <!--Note: Date picker -->
        <div class="date-time-picker">
          <div class="expiration">
            <label>Expiration Date</label>
            <a-popover title="" class="popover">
              <template #content>
                <p>After selected date, the notice will no longer be displayed</p>
              </template>
              <a-button type="primary" class="span">?</a-button>
            </a-popover>
          </div>
          <a-config-provider :theme="theme">
            <a-date-picker v-model:value="expirationDate" class="date-picker"/>
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
  resize: none;
  flex-shrink: 0;
}

.image-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.img-wrapper{
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;

}

.image{
  width: 100%;
  height: auto;
  border-radius: 30px;
}

.fileDropContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}


.date-time-picker {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}


.popover{
  color: var(--body-text);
  background: var(--secondary);
  font-size: 12px;
  text-align: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  box-shadow: none;
  padding: 0;
}
.popover:hover {
  background: #9e9e9e;
}


#error {
  color: var(--accent1);
  margin-top: 10px;
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



/* Loading circle thing From Uiverse.io by barisdogansutcu */
.loading {
  width: 3.25em;
  transform-origin: center;
  animation: rotate4 2s linear infinite;
}

circle {
  fill: none;
  stroke: hsl(214, 97%, 59%);
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}

</style>
