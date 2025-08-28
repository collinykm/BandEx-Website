<script setup>
import {ref} from "vue"
const emit = defineEmits(["fileChanged"])
const fileInput = ref(null)
const file = ref(null)
const isDragging = ref(false)

function onFileChange(e) {
  file.value = e.target.files[0]
  emit("fileChanged", file.value)
}

function onDragOver() {
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

const errorMsg = ref(null)

function onDrop(e) {
  isDragging.value = false
  if (e.dataTransfer.files.length === 1) {
    const allowedFileTypes = ["image/png", "image/jpeg"];
    if (!allowedFileTypes.includes(e.dataTransfer.files[0].type)) {
      error("File must be png or jpg only")
      return
    }

    file.value = e.dataTransfer.files[0]
    emit("fileChanged", file.value)
  } else {
    error("Only one image allowed")
  }
}

async function error(msg) {
  errorMsg.value = msg
  await new Promise(resolve => setTimeout(resolve, 3000))
  errorMsg.value = null
}

// let user click the box to open file chooser
function openFileDialog() {
  fileInput.value.click()
}
</script>

<template>
  <div
    class="upload-box"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
    @click="openFileDialog"
    :class="{ 'dragging': isDragging }"
  >
    <p id="hint-text">Drag & drop a file, or click to select</p>
    <Transition>
      <p id="error" v-if="errorMsg != null">{{ errorMsg }}</p>
    </Transition>

    <input type="file" ref="fileInput" @change="onFileChange" accept="image/png, image/jpeg" hidden />
  </div>
</template>

<style scoped>
.upload-box {
  border: 3px dashed var(--accent2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
  border-radius: 20px;
  cursor: pointer;
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


</style>
