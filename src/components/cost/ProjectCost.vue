<script setup>
import {useQuery} from "@vue/apollo-composable";
import {getOrdersByNumber} from "../../graphql/order/query/order.graphql"
import {computed} from "vue";

const {result: orders, loading} = useQuery(getOrdersByNumber, {
  number: 3521
})
const ordersModified = computed(() => orders.value?.getOrdersByNumber.edges ?? {})
</script>

<template>
  <p v-if="loading">loading...</p>
  <p v-for="r in ordersModified" :key="r.node.id">{{r.node.number}} - {{r.node.customer.name}} - {{r.node.dateFa}}</p>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
