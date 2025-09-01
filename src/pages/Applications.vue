<script setup>
import {nextTick, onMounted, ref, watch} from "vue"
import Loader from "@/components/Loader.vue"
import AntPopconfirm from "@/components/AntPopconfirm.vue"
import getApplicationsInfo from "@/services/pages/getApplicationsInfo.js"
import updateApplicationsInfo from "@/services/pages/updateApplicationsInfo.js"
import timedToggle from "@/utils/timedToggle.js"

defineProps(['user'])

const editing = ref(false)
const message = ref("message")
const link = ref("")
let originalMessage
let originalLink

onMounted(async() => {
  const info = await getApplicationsInfo()
  message.value = info.message
  link.value = info.link
  applicationOpen.value = link.value !== ""
  originalMessage = info.message
  originalLink = info.link
  await nextTick(() => {
    document.querySelectorAll(".editable-text").forEach(resize)
  })
})

const resize = (el) => {
  if (!el) return
  el.style.height = "auto"
  el.style.height = el.scrollHeight + "px"
}
watch(message, () => {
  nextTick(() => {
    document.querySelectorAll(".editable-text").forEach(resize)
  })
})

function cancelChanges(){
  message.value = originalMessage
  link.value = originalLink
  editing.value = false
}

const isSubmitting = ref(false)
const errorText = ref("")
async function submit() {
  isSubmitting.value = true
  if (applicationOpen.value && link.value.trim() === "") {
    timedToggle(errorText, "Open applications must have a link to the form", "")
    isSubmitting.value = false
    return
  }
  try {
    await updateApplicationsInfo({
      message: message.value.trim(),
      link: link.value.trim()
    })
  } catch (error) {
    console.log(error)
  }
  isSubmitting.value = false
  location.reload()
}


const applicationOpen = ref(false)
console.log(link.value)
function toggleApplicationStatus() {
  applicationOpen.value = !applicationOpen.value
  if (!applicationOpen.value) { //application closed
    link.value = ""
  }
}

</script>

<template>
  <div class="view-container">
    <h2>Join Our Team</h2>
    <section class="content">
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

      <textarea v-model="message" class="editable-text" :class="{editing: editing}" :disabled="!editing" />
      <div class="link-section">
        <p v-if="editing"><input type="checkbox" v-model="applicationOpen" @click="toggleApplicationStatus"/>Application open</p>
        <p v-if="applicationOpen">You can apply by filling out the form <a :href="link">here</a></p>
        <p v-else>The application is currently closed</p>
        <p v-if="editing && applicationOpen">Link to application form: <input type="url" class="input" v-model="link"/></p>
        <Transition>
          <p id="error" v-if="errorText !== '' ">{{errorText}}</p>
        </Transition>

      </div>


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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(600px, 95%)
}

.controls-container {
  width: 100%;
  display: flex;
  justify-content: end;
}


.editable-text {
  line-height: 1.2rem;
}

.link-section{
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
  padding: 10px;
  width: 100%;
}

.input {
  width: 100%;
}

p{
  flex: 1;
}


a{
  display: inline-block;
  color: var(--accent2);
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
