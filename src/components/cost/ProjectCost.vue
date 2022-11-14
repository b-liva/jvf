<script setup>
import {ref} from 'vue';
import {useQuery} from "@vue/apollo-composable";
import {getOrdersByNumber} from "../../graphql/order/query/order.graphql"
import {computed} from "vue";

const orderId = ref("")
const {result: orders, loading} = useQuery(getOrdersByNumber, {
  number: 3521
})
const ordersModified = computed(() => orders.value?.getOrdersByNumber.edges ?? {})
</script>

<template>
  <p v-if="orderId">id: {{orderId}}</p>
  <p v-if="loading">loading...</p>
  <p @click="orderId = r.node.id" v-for="r in ordersModified" :key="r.node.id">{{r.node.number}} - {{r.node.customer.name}} - {{r.node.dateFa}}</p>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
