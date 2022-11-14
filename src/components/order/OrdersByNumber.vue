<script setup>

import {ref} from 'vue';
import {useQuery} from "@vue/apollo-composable";
import {getOrdersByNumber} from "../../graphql/order/query/order.graphql"
import {computed} from "vue";

const orderId = ref("")
const orderNumber = ref(0)
const {result: orders, loading, error, refetch: refetchOrders} = useQuery(getOrdersByNumber, {
  number: orderNumber
})
const ordersModified = computed(() => orders.value?.getOrdersByNumber.edges ?? {})
</script>

<template>
  <input type="number" v-model="orderNumber" v-on:keyup.enter="refetchOrders">
  <p v-if="orderId">id: {{ orderId }}</p>
  <p v-if="loading">loading...</p>
  <p @click="orderId = r.node.id" v-for="r in ordersModified" :key="r.node.id">{{ r.node.number }} -
    {{ r.node.customer.name }} - {{ r.node.dateFa }}</p>

</template>

<style scoped>
@import url("../../assets/index.css");

</style>
