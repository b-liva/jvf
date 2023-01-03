<script setup>
import {useRouter} from "vue-router";

const props = defineProps(['orders'])
const router = useRouter();

</script>

<template>
  <div class="overflow-x-auto">
    <div
        v-for="(order, index) in orders"
        :key="order.node.id"
        @click="router.push({name: 'order', params:{id:order.node.id}})"
        class="border bg-white rounded-lg p-2 mb-6">
      <div class="">
        <div class="grid grid-cols-12">
          <div class="text-base text-blue-500 p-1.5">{{ order.node.number }}</div>
          <div class="col-start-13 text-green-700 p-1">{{order.node.owner.lastName}}</div>
        </div>
        <div class="grid grid-cols-6 py-4">
          <div class="col-span-3">{{ order.node.customer.name }}</div>
          <div class="">
            <div class="text-center">تعداد دستگاه</div>
            <div class=" text-center text-green-500">{{ order.node.totalQty }}</div>
          </div>
          <div class="">
            <div class="text-center">کیلووات</div>
            <div class="text-center text-green-500">{{ order.node.totalKw }}</div>
          </div>
          <div class="text-center">{{ order.node.dateFa }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
