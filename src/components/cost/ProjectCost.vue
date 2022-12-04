<script setup>
import OrdersByNumber from '../order/OrdersByNumber.vue';
import OrderDetails from '../order/OrderDetails.vue';
import ProformasByOrder from '../proforma/ProformasByOrder.vue';
import ProformaDetails from '../proforma/ProformaDetails.vue';
import ProjectCosts from '../cost/ProjectCosts.vue';

</script>

<template>
  <OrdersByNumber/>
  <OrderDetails/>
  <ProformasByOrder/>
  <ProformaDetails/>
  <ProjectCosts/>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
