<script setup>
const props = defineProps(['title', 'message', 'imageURL', 'createdAt', 'withYear'])

function formatDate(date, withYear) {
  const opts = { month: "short", day: "numeric" };
  const d1 = new Date(date);
  const parts = d1.toLocaleDateString("en-US", withYear ? { ...opts, year: "numeric" } : opts);
  return withYear ? parts.replace(",", "") : parts;
}
</script>

<template>
  <div class="card">
    <h3 class="title">{{ title }}</h3>
    <img :src="imageURL" alt="poster" class="image">
    <p class="message">{{ message }}</p>
    <div class="date-posted-container"><label class="date-posted">{{ formatDate(createdAt, withYear) }}</label></div>
  </div>
</template>

<style scoped>

.card{
  width: min(80%, 700px);
  background-color: var(--yellow);
  padding: 50px;
  border-radius: 30px;
}

.title {
  color: var(--blue-accent);
  font-size: 3rem;
}

.image{
  width: 100%;
  height: auto;
  border-radius: 30px;
}

.message{
  margin: 20px;
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
