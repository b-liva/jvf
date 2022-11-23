<script setup>
import {useStore} from "../../store/store.js";
const store = useStore();

import {useQuery} from "@vue/apollo-composable";
import {getOrdersByNumber} from "../../graphql/order/query/order.graphql"
import {computed} from "vue";
const {result: orders, loading, error, refetch: refetchOrders} = useQuery(getOrdersByNumber,
    () => {
      return {
        number: store.orderNumber
      }
    }
)
const ordersModified = computed(() => orders.value?.getOrdersByNumber.edges ?? {})
</script>

<template>
  <input type="number" v-model="store.orderNumber" v-on:keyup.enter="refetchOrders">
  <p v-if="loading">loading...</p>
  <p v-for="order in ordersModified" :key="order.node.id" @click="store.orderId = order.node.id">{{ order.node.number }} -
    {{ order.node.customer.name }} - {{ order.node.dateFa }}</p>

</template>

<style scoped>
@import url("../../assets/index.css");

</style>
