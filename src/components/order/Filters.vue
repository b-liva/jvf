<script setup>
import {useOrderStore} from "../../store/store";
import {ref} from "vue";
import {filterOrders} from "../../graphql/order/query/order.graphql"
import {useLazyQuery} from "@vue/apollo-composable";
import {computed, watch} from "vue";
import {idIsNull} from "../../utils/methods";

const orderStore = useOrderStore();
let orderNumber = ref(0)
let customerName = ref('');
const {result: orders, loading, error, load} = useLazyQuery(filterOrders,
    () => {
      return {
        number: orderNumber.value,
        customerName: customerName.value
      }
    }
)
watch(
    () => [orderNumber.value, customerName.value],
    () => {
      if (idIsNull(orderNumber.value)){orderNumber.value = null;}
      if (filterIsValid()){load()}
    }
)
orderStore.orders = computed(() => orders.value?.filterOrders.edges ?? [])
function filterIsValid(){
  return orderNumber.value || customerName.value
}
</script>

<template>
  <div>
    <span class="text-base font-normal text-gray-500">شماره درخواست</span>
    <input
        id="order_number"
        placeholder="شماره درخواست"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
        v-model="orderNumber"
        required>
    <span class="text-base font-normal text-gray-500">مشتری</span>
    <input
        type="text"
        id="customer_name"
        placeholder="مشتری"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
        v-model="customerName"
        required>
    <div v-if="loading">Is Loading...</div>
  </div>
</template>

<style scoped>

</style>