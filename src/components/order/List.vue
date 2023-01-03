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
  <div class="">
    <div>
      <span class="text-base font-normal text-gray-500">شماره درخواست</span>
    </div>
    <div class="">
      <input
          type="number"
          id="order_number"
          placeholder="شماره درخواست"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          v-model="orderNumber"
          required>
    </div>
  </div>
  <div class="">
    <div class="overflow-x-auto rounded-lg">
      <div class="">
        <div class="">
          <h3 class="mb-4 text-green-500 font-semibold">درخواست</h3>
          <div
              v-for="(order, index) in ordersModified"
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
