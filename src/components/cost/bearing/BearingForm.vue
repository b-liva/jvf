<script setup>
import {ref} from "vue";
import {useMutation} from "@vue/apollo-composable";
import {mutateBearing} from "../../../graphql/cost/mutation/cost/bearing.graphql";

const emit = defineEmits(['reFetch'])
let name = ref('')
let msg = ref('')
let description = ref('');

const {mutate: createBearing, loading, error, onDone} = useMutation(mutateBearing,
    () => ({
      variables: {
        'name': name.value,
      }
    }));

onDone(result => {
  emit('reFetch');
  name.value = '';
  msg.value = 'برینگ اضافه شد.';
  clearMsgWithDelay(3000);
})
function clearMsgWithDelay(delay){
  setTimeout(() => {
    msg.value = '';
  }, delay)
}
</script>

<template>
<div class="p-6 rounded bg-gray-100">
  <div class="absolute top-0 left-0">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         class="bg-red-500 text-white cursor-pointer rounded-tl w-4 h-4"
    @click="$emit('hideMe')">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
  <div v-if="msg.length > 0" class="py-3 text-green-400">{{msg}}</div>
  <div class="mb-2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">نام برینگ</label>
    <input
        v-model="name"
        class="border border-gray-300 text-gray-900 text-sm rounded-lg
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text">
  </div>
  <div class="w-full text-left">
    <button class="bg-blue-500 text-white p-1.5 rounded" @click="createBearing">ذخیره</button>
  </div>
</div>
</template>

<style scoped>

</style>