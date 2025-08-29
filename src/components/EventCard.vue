<script setup>
import {PhPencil, PhTrash} from "@phosphor-icons/vue"

const props = defineProps(['id', 'title', 'message', 'imageURL', 'createdAt', 'expirationDate', 'withYear'])
const emit = defineEmits(['edit', 'delete'])

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
      <div class="buttons">
        <button class="icon-button edit" @click="$emit('edit', {
        id: id,
        title: title,
        message: message,
        imageURL: imageURL,
        expirationDate: expirationDate,
      })">
          <PhPencil :size="20" />
        </button>
        <button class="icon-button delete" @click="$emit('delete', id)">
          <PhTrash :size="20" />
        </button>
      </div>

    </div>
    <div class="img-wrapper" v-if="imageURL !== ''"><img :src="imageURL" alt="poster" class="image"></div>
    <p class="message">{{ message }}</p>
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


.title {
  color: var(--accent2);
  font-size: 3rem;
  margin: 0;
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
