<script setup>
import {useStore} from "../../store/store.js";

const store = useStore();

import {useLazyQuery} from "@vue/apollo-composable";
import {getOrdersByNumber} from "../../graphql/order/query/order.graphql"
import {computed} from "vue";

const {result: orders, loading, error, load} = useLazyQuery(getOrdersByNumber,
    () => {
      return {
        number: store.orderNumber
      }
    }
)
const ordersModified = computed(() => orders.value?.getOrdersByNumber.edges ?? {})
</script>

<template>
  <div class="">
    <div class="flex flex-col">
      <div class="">
        <label for="order_number" class="w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">شماره
          درخواست</label>
        <input
            type="number"
            id="order_number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="شماره درخواست"
            v-model="store.orderNumber"
            v-on:keyup="load()"
            required>
      </div>
      <div class="">
        <p v-if="loading">loading...</p>
        <p v-for="order in ordersModified" :key="order.node.id" @click="store.orderId = order.node.id">
          {{ order.node.number }}
          -
          {{ order.node.customer.name }} - {{ order.node.dateFa }}</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url("../../assets/index.css");

</style>
