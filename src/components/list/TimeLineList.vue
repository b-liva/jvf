<script setup>
const props = defineProps(['title', 'subtitle', 'checked'])
</script>

<template>
  <div class="pr-3 border-r-blue-500 border-r-4 border-b-gray-900">
    <input checked disabled type="checkbox"
           class="inline-block align-middle rounded border-gray-300 mr-1 bg-gray-50 focus:ring-3 focus:ring-cyan-200 h-4 w-4">
    <div class="inline-block align-middle pr-3">
      <label class="">{{title}}</label>
      <p class="text-gray-600 text-xs pt-2">{{subtitle}}</p>
    </div>
  </div>
</template>

<style scoped>

</style>