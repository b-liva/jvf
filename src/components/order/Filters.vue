<script setup>
import {useOrderStore} from "../../store/store";
import {ref} from "vue";
import {filterOrders} from "../../graphql/order/query/order.graphql"
import {useLazyQuery} from "@vue/apollo-composable";
import {computed, watch} from "vue";

const orderStore = useOrderStore();
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
orderStore.orders = computed(() => orders.value?.filterOrders.edges ?? [])
</script>

<template>
  <div>
    <span class="text-base font-normal text-gray-500">شماره درخواست</span>
    <input
        type="number"
        id="order_number"
        placeholder="شماره درخواست"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
        v-model="orderNumber"
        required>
  </div>
</template>

<style scoped>

</style>