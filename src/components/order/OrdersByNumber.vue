<script setup>
const emit = defineEmits(['inFocus', 'submit'])
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

function setId(id){
  this.orderId = id
  emit('getId', this.orderId)
}
</script>

<template>
  <input type="number" v-model="orderNumber" v-on:keyup.enter="refetchOrders">
  <p v-if="loading">loading...</p>
  <p @click="setId(r.node.id)" v-for="r in ordersModified" :key="r.node.id">{{ r.node.number }} -
    {{ r.node.customer.name }} - {{ r.node.dateFa }}</p>

</template>

<style scoped>
@import url("../../assets/index.css");

</style>
