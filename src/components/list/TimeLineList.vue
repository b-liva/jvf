<script setup>
import {computed} from "vue";

const props = defineProps(['title', 'subtitle', 'checked', 'color'])
const computedColor = computed(() => props.checked ? "border-blue-700" : "border-gray-300")
const computedTextColor = computed(() => props.checked ? "" : "text-gray-300")
</script>

<template>
  <div
      class="pr-3 border-r-4"
      :class="computedColor">
    <div class="border-b border-gray-100">
      <input :checked="checked" disabled type="checkbox"
             class="inline-block align-middle rounded border-gray-300 mr-1 bg-gray-50 focus:ring-3 focus:ring-cyan-200 h-4 w-4">
      <div class="inline-block align-middle pr-3 py-1">
        <label class="" :class="computedTextColor">{{ title }}</label>
        <p class="text-gray-600 text-xs py-2"><span v-if="checked">{{ subtitle }}</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>