<script setup>
import {computed} from "vue";

const props = defineProps(['title', 'subtitle', 'checked', 'color', 'hasPopUp', 'name', 'pageName'])
const computedColor = computed(() => props.checked ? "border-blue-700" : "border-gray-300")
const computedTextColor = computed(() => props.checked ? "" : "text-gray-300")
</script>

<template>
  <div
      class="pr-3 border-r-4 group relative"
      :class="{
        'border-blue-700': checked,
        'border-gray-300': !checked,
        'bg-gray-100': name === pageName,
        'cursor-not-allowed': !hasPopUp
      }"
  >
    <div class="border-b border-gray-100">
      <input :checked="checked" disabled type="checkbox"
             class="inline-block align-middle rounded border-gray-300 mr-1 bg-gray-50 focus:ring-3 focus:ring-cyan-200 h-4 w-4">
      <div class="inline-block align-middle pr-3 py-1">
        <label class="" :class="computedTextColor">{{ title }}</label>
        <p class="text-gray-600 text-xs py-2"><span v-if="checked">{{ subtitle }}</span></p>
      </div>
    </div>
    <div class="absolute hidden  top-0 mr-40 bg-gray-200 p-5 rounded rounded-l
    min-w-[250px] z-20"
    :class="{
      'group-hover:block': hasPopUp
    }">
      <div class="py-1">
        <span class="pl-2 text-green-600">1401-05-05</span>
        <span class="pl-2">شماره</span>
        <span class="hover:font-bold hover:text-blue-500 hover:cursor-pointer">
          <RouterLink :to="{name: name, params: {id: `${name}Id`}}">9815252</RouterLink>
        </span>
      </div>
      <div class="py-1">
        <span class="pl-2 text-green-600">1401-05-05</span>
        <span class="pl-2">شماره</span>
        <span class="hover:font-bold hover:text-blue-500 hover:cursor-pointer">
          <RouterLink :to="{name: name, params: {id: `${name}Id`}}">9815300</RouterLink>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>