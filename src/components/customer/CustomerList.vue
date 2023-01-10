<script setup>
import {useRouter} from "vue-router";
import {useCustomerStore} from "../../store/store";
import JNumber from "../../utils/number";
const router = useRouter();
const customerStore = useCustomerStore()
</script>

<template>
  <div class="overflow-x-auto">
    <div
        v-for="(customer, index) in customerStore.customers"
        :key="customer.node.id"
        @click="router.push({name: 'customer', params:{id:customer.node.id}})"
        class="border bg-white rounded-lg p-2 mb-6 relative">
      <div class="">
        <div class="grid grid-cols-12">
          <div class="text-sm text-white text-center p-1.5 bg-blue-400 absolute top-0 right-0 w-12
          rounded-tr-lg rounded-bl-lg min-w-max">{{ customer.node.number }}</div>
          <div class="col-start-13 text-green-700 p-1">***</div>
        </div>
        <div class="grid grid-cols-8 py-4 gap-3">
          <div class="col-span-3">{{customer.node.name}}</div>
          <div class="">
            <div class="text-center">نوع مشتری</div>
            <div class=" text-center text-green-500">{{customer.node.type.name}}</div>
          </div>
          <div class="min-w-max">
            <div class="text-center">خرید(تعداد)</div>
            <div class="text-center text-green-500">{{customer.node.salesQty}}</div>
          </div>
          <div class="min-w-max">
            <div class="text-center">خرید(KW)</div>
            <div class="text-center text-green-500">{{customer.node.salesKw}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
