<script setup>
import {useRouter} from "vue-router";

const props = defineProps(['orders'])
const router = useRouter();

</script>

<template>
  <div class="overflow-x-auto rounded-lg px-4">
    <div
        v-for="(order, index) in orders"
        :key="order.node.id"
        @click="router.push({name: 'order', params:{id:order.node.id}})"
        class="bg-white">
      <div class="border rounded mb-6">
        <div class="grid grid-cols-12">
          <div class="p-1.5">{{ order.node.number }}</div>
          <div class="col-start-13 text-green-700">{{order.node.owner.lastName}}</div>
        </div>
        <div class="grid grid-cols-6 py-6">
          <div class="col-span-3">{{ order.node.customer.name }}</div>
          <div class="">
            <div>تعداد دستگاه</div>
            <div>{{ order.node.totalQty }}</div>
          </div>
          <div class="">
            <div>کیلووات</div>
            <div>{{ order.node.totalKw }}</div>
          </div>
          <div class="">{{ order.node.dateFa }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
