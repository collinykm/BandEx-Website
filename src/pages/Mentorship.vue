<script setup>
import {nextTick, onMounted, ref, watch} from 'vue'
import getMentorshipDescriptions from "@/services/pages/getMentorshipDescriptions.js"
import updateMentorshipDescription from "@/services/pages/updateMentorshipDescription.js"
import Loader from "@/components/Loader.vue"
import AntPopconfirm from "@/components/AntPopconfirm.vue"
defineProps(['user'])

const menteeDescription = ref("temp")
const mentorDescription = ref("temp")
const programDescription = ref("temp")
const menteeLink = ref("temp")
const mentorLink = ref("temp")
let originalMenteeDescription
let originalMentorDescription
let originalProgramDescription
let originalMenteeLink
let originalMentorLink

const editing = ref(false)
onMounted(async () => {
  const descriptions = await getMentorshipDescriptions()
  menteeDescription.value = descriptions.menteeDescription
  mentorDescription.value = descriptions.mentorDescription
  programDescription.value = descriptions.programDescription
  menteeLink.value = descriptions.menteeLink
  mentorLink.value = descriptions.mentorLink
  originalMentorDescription = mentorDescription.value
  originalMenteeDescription = menteeDescription.value
  originalProgramDescription =  programDescription.value
  originalMenteeLink = menteeLink.value
  originalMentorLink = menteeLink.value

  nextTick(() => {
    document.querySelectorAll(".editable-text").forEach(resize)
  })
  window.addEventListener('resize', () => document.querySelectorAll(".editable-text").forEach(resize))

})

const resize = (el) => {
  if (!el) return
  el.style.height = "auto"
  el.style.height = el.scrollHeight + "px"
}
watch([menteeDescription, mentorDescription], () => {
  nextTick(() => {
    document.querySelectorAll(".editable-text").forEach(resize)
  })
})



function cancelChanges() {
  menteeDescription.value = originalMenteeDescription
  mentorDescription.value = originalMentorDescription
  programDescription.value = originalProgramDescription
  menteeLink.value = originalMenteeLink
  mentorLink.value = originalMentorLink
  editing.value = false
}

const isSubmitting = ref(false)
async function submit() {
  isSubmitting.value = true
  try {
    await updateMentorshipDescription({
      menteeDescription: menteeDescription.value,
      mentorDescription: mentorDescription.value,
      programDescription: programDescription.value,
      menteeLink: menteeLink.value,
      mentorLink: mentorLink.value,
    })
  } catch (error) {
    console.error(error)
  }
  isSubmitting.value = false
  location.reload()
}
</script>

<template>
  <div class="view-container">
    <section class="content">
      <div class="title">
        <h2>MENTORSHIP</h2>

        <div class="controls-container">
          <button class="button" v-if="!editing && user != null" @click="editing=true">Edit</button>
          <div class="submit-container" v-if="editing && user != null">
            <button class="button" @click="cancelChanges" style="margin-right: 10px;">Cancel</button>
            <AntPopconfirm title="Publish Changes?" @confirm="submit">
              <button class="button" >Publish Changes</button>
            </AntPopconfirm>

            <Loader v-if="isSubmitting" />
          </div>
        </div>

      </div>
      <textarea class="editable-text program-description" :class="{editing: editing}" v-model="programDescription" @input="resize($event.target)" :disabled="!editing"/>

      <div class="chart">
        <textarea class="editable-text" :class="{editing: editing}" v-model="menteeDescription" @input="resize($event.target)" :disabled="!editing"/>
        <div class="divider"></div>
        <textarea class="editable-text" :class="{editing: editing}" v-model="mentorDescription" @input="resize($event.target)" :disabled="!editing"/>
      </div>
      <div class="signup-area">
        <p>Sign up here: <a class="link" :href="menteeLink">Mentee Signup</a> | <a class="link" :href="mentorLink">Mentor Signup</a></p>
        <p v-if="editing">Link to mentee form: <input type="url" class="input" v-model="menteeLink"/></p>
        <p v-if="editing">Link to mentor form: <input type="url" class="input" v-model="mentorLink"/></p>
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

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.title {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(20px, 10%, 50px);
  padding: 10px;
}
.submit-container {
  display: flex;
  gap: 10px;
}

/*
.controls-container {
  position: absolute;
  right: calc((100% - clamp(300px, 80%, 1000px)) / 2 + 50px);
}
*/

.program-description{
  text-align: center;
}

.chart {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  width: 100%;
}
.divider {
  width: 6px;
  border-radius: 6px;
  background-color: var(--body-text);
}
@media (max-width: 600px) {
  .title {
    flex-direction: column;
  }
  .title h2 {
    margin-bottom: 0;
  }

  .chart{
    flex-direction: column;
    align-items: center;
  }
  .divider {
    height: 3px;
    width: 90%;
  }
}



.signup-area {
  margin: 30px;
}

a{
  display: inline-block;
  color: var(--accent2);
}



</style>
