<script setup>
import OrdersByNumber from '../order/OrdersByNumber.vue';
import OrderDetails from '../order/OrderDetails.vue';
import ProformasByOrder from '../proforma/ProformasByOrder.vue';
import ProformaDetails from '../proforma/ProformaDetails.vue';
import {ref} from "vue";
const orderId = ref("")
const proformaId = ref("")

function getIdBack(id){
  orderId.value = id;
}

function getProformaId(id){
  proformaId.value = id;
}
</script>

<template>
  <OrdersByNumber @getId="getIdBack"/>
  <OrderDetails :order-id="orderId"/>
  <ProformasByOrder @getProformaId="getProformaId" :order-id="orderId"/>
  <ProformaDetails :proforma-id="proformaId"/>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
