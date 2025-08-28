<script setup>
import {onMounted, onUnmounted, ref} from "vue"
import DragUploadBox from "@/components/DragUploadBox.vue"
import newPost from "@/services/newPost.js"
import uploadFile from "@/services/uploadFile.js"
import {PhX} from "@phosphor-icons/vue"
import CloseButton from "@/components/CloseButton.vue"

const emit = defineEmits(["close"])

const isMobile = ref(window.innerWidth < 600)
function updateWidth() {
  isMobile.value = window.innerWidth < 600
  console.log(isMobile.value)
}
onMounted(() => {
  document.body.style.overflow = "hidden"
  window.addEventListener('resize', updateWidth)

  const primary = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary')
    .trim()
  const font = getComputedStyle(document.body).getPropertyValue("font-family")


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




const title = ref("")
const message = ref("")
const expirationDate = ref(null)


const file = ref(null)

const confirm = ref(0)
const postText = ref("Post")
const errorMsg = ref(null)
const isSubmitting = ref(false)
async function handleSubmit() {
  if (message.value === "" || expirationDate.value == null) {
    errorMsg.value = "Must have a message and expiration date"
    await new Promise(resolve => setTimeout(resolve, 3000))
    errorMsg.value = null
    return
  }


  if (confirm.value === 0) {
    confirm.value = 1
    postText.value = "Confirm?"
    return
  }
  isSubmitting.value = true

  //handling upload
  try {
    //require an expiration date, and message
    let imageURL = ""
    if (file.value != null) {
      imageURL = await uploadFile(file.value)
      console.log(imageURL)
    }

    await newPost({
      title: title.value,
      message: message.value,
      createdAt: new Date(),
      imageURL: imageURL,
      expirationDate: expirationDate.value,
    })
  } catch (error) {
    console.log(error)
  }
  isSubmitting.value = false
  location.reload()
}


</script>

<template>
  <Teleport to="body">
    <div class="modal-container" @click.self="$emit('close')">
      <div class="modal-content" :style="isMobile? { width: '100vw', height: '100%'} : { width: '600px', 'border-radius': '30px'}">
        <CloseButton @close="$emit('close')" />
        <h2>New Post</h2>

        <input placeholder="Title" v-model="title" class="input"/>
        <textarea placeholder="Message" v-model="message" class="input" id="message" rows="6"/>

        <div class="fileDropContainer">
          <DragUploadBox @fileChanged="(newFile) => file = newFile"/>
          <div v-if="file">
            <p>Selected file: {{ file.name }}</p>
          </div>
          <button class="button clearButton" @click="() => file = null">Clear file</button>
        </div>

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
        <svg v-if="isSubmitting" viewBox="25 25 50 50" class="loading">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </div>
  </Teleport>


</template>

<style scoped>

.modal-content {
  position: fixed;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 16px;
  padding: 30px;
  border: 4px solid var(--secondary);
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
  overflow: hidden;
}

h2{
  margin: 0 0 10px;
}

.input {
  width: min(450px, 80%);
  resize: none;
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
