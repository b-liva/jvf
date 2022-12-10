<script setup>
import OrdersByNumber from '../order/OrdersByNumber.vue';
import OrderDetails from '../order/OrderDetails.vue';
import ProformasByOrder from '../proforma/ProformasByOrder.vue';
import ProformaDetails from '../proforma/ProformaDetails.vue';
import ProjectCosts from '../cost/ProjectCosts.vue';
import CostDetails from '../cost/CostDetails.vue';

</script>

<template>
  <OrdersByNumber/>
  <OrderDetails/>
  <ProformasByOrder/>
  <ProformaDetails/>
  <ProjectCosts/>
  <CostDetails/>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
