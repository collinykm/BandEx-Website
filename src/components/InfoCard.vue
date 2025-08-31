<script setup>
import {PhPencil, PhTrash} from "@phosphor-icons/vue"
import {onMounted, ref} from "vue"
import DynamicPhoto from "@/components/DynamicPhoto.vue"
defineProps(['editable', 'id', 'title', 'message', 'imageURL','folderLink', 'createdAt', 'eventDate', 'withYear', 'isMobile'])
defineEmits(['edit', 'delete'])

const theme = ref()
onMounted(() => {
  const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary')
  const font = getComputedStyle(document.body).getPropertyValue("font-family")

  //for the ant design popover confirm thing for the delete button
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


function formatDate(date, withYear) {
  const opts = { month: "short", day: "numeric" };
  const d1 = new Date(date);
  const parts = d1.toLocaleDateString("en-US", withYear ? { ...opts, year: "numeric" } : opts);
  return withYear ? parts.replace(",", "") : parts;
}





</script>

<template>
  <div class="card">
    <div class="header">
      <h3 class="title">{{ title }}</h3>
      <div class="buttons" v-if="editable">
        <button class="icon-button edit" @click="$emit('edit', {
        id: id,
        title: title,
        message: message,
        folderLink: folderLink,
        imageURL: imageURL,
        eventDate: eventDate,
      })">
          <PhPencil :size="20" />
        </button>
        <a-config-provider :theme="theme">
          <a-popconfirm
            placement="leftTop"
            title="Are you sure delete this post?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="$emit('delete', id, imageURL)"
          >
            <button class="icon-button edit" >
              <PhTrash :size="20" />
            </button>
          </a-popconfirm>
        </a-config-provider>

      </div>

    </div>
    <DynamicPhoto :imageURL="imageURL"/>

    <p class="message" v-if="message != null">{{ message }}</p>
    <p class="message folder-link" v-if="folderLink != null">Photos can be found<a class="link" style="color: var(--accent2)" :href="folderLink">here</a></p>
    <div class="date-posted-container"><label class="date-posted">{{ formatDate(createdAt, withYear) }}</label></div>
  </div>
</template>

<style scoped>

.card{
  width: min(95%, 700px);
  background-color: var(--secondary);
  padding: min(40px, 6%);
  border-radius: 30px;
  margin: 20px;
}

.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

}

.buttons {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;
}

.title {
  color: var(--accent2);
  font-size: 3rem;
  margin: 0;
}



.message{
  margin: 20px;
  white-space: pre-line;
}

@media (max-width: 600px) {
  .message{
    margin: 20px 0 0;
  }
  .title {
    font-size: 2rem;
  }
}


.date-posted-container{
  display: flex;
  justify-content: end;
  width: 100%
}

.date-posted {
  font-size: 0.8rem;
  color: #9e9e9e;
}

</style>
