<script setup>
import OrdersByNumber from '../order/OrdersByNumber.vue';
import OrderDetails from '../order/OrderDetails.vue';
import ProformasByOrder from '../proforma/ProformasByOrder.vue';
import ProformaDetails from '../proforma/ProformaDetails.vue';
import ProjectCosts from '../cost/ProjectCosts.vue';
import {ref} from "vue";
const orderId = ref("")
const proformaId = ref("")
const proformaSpecId = ref("")

function getIdBack(id){
  orderId.value = id;
}

function getProformaId(id){
  proformaId.value = id;
}
function getProformaSpecIdBack(id){
  proformaSpecId.value = id
}
</script>

<template>
  <OrdersByNumber @getId="getIdBack"/>
  <OrderDetails :order-id="orderId"/>
  <ProformasByOrder @getProformaId="getProformaId" :order-id="orderId"/>
  <ProformaDetails @getSpecId="getProformaSpecIdBack" :proforma-id="proformaId"/>
  <ProjectCosts :spec-id="proformaSpecId"/>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
