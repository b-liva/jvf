<script setup>
import {useRouter} from "vue-router";
const props = defineProps(['orders'])
const router = useRouter();

</script>

<template>
  <div class="">
    <div class="overflow-x-auto rounded-lg">
      <div class="">
        <div class="">
          <h3 class="mb-4 text-green-500 font-semibold">درخواست</h3>
          <div
              v-for="(order, index) in orders"
              :key="order.node.id"
              @click="router.push({name: 'order', params:{id:order.node.id}})"
              :class="{'bg-gray-50': index % 2 === 1}">
            {{ order.node.customer.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
