<script setup>
import {useRouter} from "vue-router";
import {useLazyQuery} from "@vue/apollo-composable";
import {filterOrders} from "../../graphql/order/query/order.graphql"
import {computed, watch, ref} from "vue";

const router = useRouter();
let orderNumber = ref('');
const {result: orders, loading, error, load} = useLazyQuery(filterOrders,
    () => {
      return {
        number: orderNumber.value
      }
    }
)
watch(
    () => orderNumber.value,
    () => {
      load()
    }
)
const ordersModified = computed(() => orders.value?.filterOrders.edges ?? {})
</script>

<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <span class="text-base font-normal text-gray-500">شماره درخواست</span>
    </div>
    <div class="flex-shrink-0">
      <input
          type="number"
          id="order_number"
          placeholder="شماره درخواست"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          v-model="orderNumber"
          required>
    </div>
  </div>
  <div class="flex flex-col mt-8">
    <div class="overflow-x-auto rounded-lg">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden sm:rounded-lg">
          <h3 class="mb-4 text-green-500 font-semibold">درخواست</h3>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="p-4 text-right text-xs font-medium text-gray-500 tracking-wider">مشتری</th>
              <th scope="col" class="p-4 text-right text-xs font-medium text-gray-500 tracking-wider">تاریخ درخواست</th>
            </tr>
            </thead>
            <tbody class="bg-white">
            <tr
                v-for="(order, index) in ordersModified"
                :key="order.node.id"
                @click="router.push({name: 'order', params:{id:order.node.id}})"
                :class="{'bg-gray-50': index % 2 === 1}">
              <td
                  :class="{
                'rounded-lg rounded-right': index % 2 === 1,
                }"
                  class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">{{order.node.customer.name}}</td>
              <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">{{order.node.dateFa}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");

</style>
