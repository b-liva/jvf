<script setup>
import OrdersByNumber from '../order/OrdersByNumber.vue';
import OrderDetails from '../order/OrderDetails.vue';
import {ref} from "vue";
const orderId = ref("")

function getIdBack(id){
  orderId.value = id;
}
</script>

<template>
  <OrdersByNumber @getId="getIdBack"/>
  <OrderDetails :order-id="orderId"/>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
