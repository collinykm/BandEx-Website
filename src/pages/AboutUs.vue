<script setup>
import Loader from "@/components/Loader.vue"
import AntPopconfirm from "@/components/AntPopconfirm.vue"
import {nextTick, onMounted, ref, watch} from "vue"
import getAboutInfo from "@/services/pages/getAboutInfo.js"
import DragUploadBox from "@/components/DragUploadBox.vue"
import deleteImage from "@/services/deleteImage.js"
import uploadFile from "@/services/uploadFile.js"
import updateAboutInfo from "@/services/pages/updateAboutInfo.js"

defineProps(['user'])
const editing = ref(false)
const description = ref("")
const members = ref("")
const teamPhotoURL = ref("")
const caption = ref("")
let originalDescription
let originalMembers
let originalTeamPhotoURL
let originalCaption
onMounted(async () => {
  try {
    const info = await getAboutInfo()
    description.value = info.description
    members.value = info.members
    teamPhotoURL.value = info.teamPhotoURL
    caption.value = info.caption
    originalDescription = info.description
    originalMembers = info.members
    originalTeamPhotoURL = info.teamPhotoURL
    originalCaption = info.caption

    await nextTick(() => {
      document.querySelectorAll("textarea").forEach(resize)
    })
    window.addEventListener('resize', () => document.querySelectorAll("textarea").forEach(resize))
  } catch (error) {
    console.error(error)
  }
})
const resize = (el) => {
  if (!el) return
  el.style.height = "auto"
  el.style.height = el.scrollHeight + "px"
}
watch([description, members, caption], () => {
  nextTick(() => {
    document.querySelectorAll(".textarea").forEach(resize)
  })
})

const file = ref(null)


function cancelChanges() {
  description.value = originalDescription
  members.value = originalMembers
  teamPhotoURL.value = originalTeamPhotoURL
  caption.value = originalCaption
  file.value = null
  editing.value = false
}

const isSubmitting = ref(false)
async function submit() {
  isSubmitting.value = true
  try {
    //first thing delete image if user removed it
    let url = teamPhotoURL.value !== "" ? teamPhotoURL.value : ""
    if (teamPhotoURL.value === "") {
      console.log("gonna start clearing image")
      await deleteImage(originalTeamPhotoURL)
      console.log("cleared image")
      if (file.value != null) {
        url = await uploadFile(file.value)
        console.log(`image url after uploading: ${url}`)
      }
    }

    await updateAboutInfo({
      description: description.value,
      members: members.value,
      teamPhotoURL: url,
      caption: caption.value,
    })

  } catch (error) {
    console.log(error)
  }
  isSubmitting.value = false
  location.reload()
}

</script>

<template>
  <div class="view-container">

    <section class="content">
      <div class="title">
        <h2>Who We Are</h2>

        <div class="controls-container" v-if="user != null">
        <button class="button" v-if="!editing" @click="editing=true">Edit</button>
        <div class="submit-container" v-else>
          <button class="button" @click="cancelChanges" style="margin-right: 10px;">Cancel</button>
          <AntPopconfirm title="Publish Changes?" @confirm="submit">
            <button class="button" >Publish Changes</button>
          </AntPopconfirm>

          <Loader v-if="isSubmitting" />
        </div>
      </div>
      </div>

      <textarea v-model="description" class="editable-text textarea" :class="{editing: editing}" :disabled="!editing" />


      <div style="width: 100%"><h2>Meet the team</h2></div>
      <div class="image-area">
        <img v-if="teamPhotoURL !== ''" :src="teamPhotoURL" alt="team photo" class="team-photo">
        <button v-if="teamPhotoURL !== '' && editing" @click="teamPhotoURL=''" class="button">Clear Image</button>

        <div class="fileDropContainer" v-if="editing && teamPhotoURL === ''">
          <DragUploadBox @fileChanged="(newFile) => file = newFile"/>
          <div v-if="file"><p>Selected file: {{ file.name }}</p></div>
          <button class="button clearButton" @click="file = null">Clear file</button>
        </div>
        <div class="caption-container">
          <label v-if="editing">Caption</label>
          <textarea v-model="caption" class="caption editable-text" :class="{editing: editing}" :disabled="!editing"/>
        </div>

      </div>

      <label v-if="editing">Member introductions: </label>
      <textarea v-model="members" class="editable-text textarea" :class="{editing: editing}" :disabled="!editing" />
      <div style="height: 30px;"></div>





    </section>
  </div>
</template>

<style scoped>
.view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content{
  width: min(700px, 95%);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


@media (max-width: 600px){
  .title {
    flex-direction: column;
  }
  .title h2 {
    margin-bottom: 0;
  }
}



.editable-text {
  line-height: 1.4rem;
}

.image-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.team-photo {
  width: min(620px, 90%);
  border-radius: 30px;
}

.fileDropContainer {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.caption-container {
  width: min(620px, 80%);
}
.caption {
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
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
