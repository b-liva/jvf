<script setup>
const props = defineProps(['orderId'])
</script>

<template>
  <p v-if="orderId">inside details id: {{ orderId }}</p>
</template>

<style scoped>

</style>
