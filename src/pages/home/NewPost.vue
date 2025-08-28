<script setup>
import {ref} from "vue"
import DragUploadBox from "@/pages/home/dragUploadBox.vue"
import newPost from "@/services/newPost.js"
import uploadFile from "@/services/uploadFile.js"


const title = ref("")
const message = ref("")
const expirationDate = ref()


const file = ref(null)


const isSubmitting = ref(false)
async function handleSubmit() {
  isSubmitting.value = true

  //handling upload
  try {
    const imageURL = await uploadFile(file.value)
    console.log(imageURL)

    await newPost({
      title: title.value,
      message: message.value,
      postDate: new Date(),
      imageURL: imageURL,
      expirationDate: expirationDate.value,
    })
  } catch (error) {
    console.log(error)
  }


  isSubmitting.value = false
}


</script>

<template>
  <div class="container">
    <input placeholder="Title" v-model="title" />
    <input placeholder="Message" v-model="message" />

    <div class="fileDropContainer">
      <DragUploadBox @fileChanged="(newFile) => file = newFile"/>
      <div v-if="file">
        <p>Selected file: {{ file.name }}</p>
      </div>
      <button class="clearButton" @click="() => file = null">Clear file</button>
    </div>

    <div class="date-time-picker" >
      <div class="expiration">
        <label>Expiration Date</label>
        <a-popover title="" class="popover">
          <template #content>
            <p>After selected date, the notice will no longer be displayed</p>
          </template>
          <a-button type="primary" class="span">?</a-button>
        </a-popover>
      </div>


      <a-date-picker v-model:value="expirationDate" class="date-picker"/>
    </div>

    <button type="submit" class="submitButton" @click="handleSubmit">Post</button>
    <!-- add a spinning thing that appears when isSubmitting is true  -->
    <svg v-if="isSubmitting" viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
  </div>


</template>

<style scoped>
.popover{
  color: black;
  background: #e3e3e3;
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

/* From Uiverse.io by barisdogansutcu */
svg {
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
