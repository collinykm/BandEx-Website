<script setup>
//theme for ant design
import {onMounted, ref} from "vue"
defineProps(['title'])
defineEmits(["confirm"])


//for the ant design popover confirm thing for the delete button
onMounted(() => {
  const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary')
  const font = getComputedStyle(document.body).getPropertyValue("font-family")

  theme.value = {
    token: {
      colorPrimary: primary,
      colorInfo: primary,
      fontFamily: font,
      fontSize: 16,
      borderRadiusLG: 16,
      borderRadiusSM: 12,
      controlHeight: 50,
    },
  }
})

const theme = ref()

</script>

<template>
  <a-config-provider :theme="theme">
    <a-popconfirm placement="leftTop" :title="title" ok-text="Yes" cancel-text="No" @confirm="$emit('confirm')">
      <slot></slot>
    </a-popconfirm>
  </a-config-provider>
</template>

<style scoped>

</style>
