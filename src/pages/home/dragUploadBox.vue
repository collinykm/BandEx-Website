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

function onDrop(e) {
  isDragging.value = false
  if (e.dataTransfer.files.length === 1) {
    file.value = e.dataTransfer.files[0]
    emit("fileChanged", file.value)
  }
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
    <p>Drag & drop a file here, or click to select</p>
    <input type="file" ref="fileInput" @change="onFileChange" accept="image/png, image/jpeg" hidden />
  </div>
</template>

<style scoped>

</style>
