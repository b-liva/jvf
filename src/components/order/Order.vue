<script setup>
import {useRoute} from "vue-router";
const route = useRoute();
</script>

<template>
<div class="grid grid-cols-9 mt-6">
  <div class="col-span-2 bg-blue-100">01</div>
  <div class="col-span-5 bg-blue-200">02</div>
  <div class="col-span-2 bg-blue-300">03</div>
  {{route.params.id}}
</div>
</template>

<style scoped>

</style>