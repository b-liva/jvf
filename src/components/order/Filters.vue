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
const {result: orders, loading, error, load} = useLazyQuery(filterOrders)
watch(
    () => [orderNumber.value, customerName.value],
    () => {
      handleNullFilterInputs();
      load(filterOrders, {
        number: orderNumber.value,
        customerName: customerName.value
      })
    }
)
orderStore.orders = computed(() => orders.value?.filterOrders.edges ?? [])

function handleNullFilterInputs(){
  // null values: null, false, '', ' ', 0, '0'
  if (idIsNull(orderNumber.value)) {
    if (customerName.value.trim().length === 0){
      orderNumber.value = 0;
    }else {
      orderNumber.value = null;
    }
  }
}
</script>

<template>
  <div>
    <div class=""><span class="text-xs font-normal text-gray-500">شماره درخواست</span>
      <input
          type="number"
          id="order_number"
          placeholder="شماره درخواست"
          class="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          v-model="orderNumber"
          required></div>
    <div class="mt-3"><span class="text-xs font-normal text-gray-500">مشتری</span>
      <input
          type="text"
          id="customer_name"
          placeholder="مشتری"
          class="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          v-model="customerName"
          required></div>
    <div v-if="loading">Is Loading...</div>
  </div>
</template>

<style scoped>

</style>