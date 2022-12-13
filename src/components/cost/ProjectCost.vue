<script setup>
import OrdersByNumber from '../order/OrdersByNumber.vue';
import OrderDetails from '../order/OrderDetails.vue';
import ProformasByOrder from '../proforma/ProformasByOrder.vue';
import ProformaDetails from '../proforma/ProformaDetails.vue';
import ProjectCosts from '../cost/ProjectCosts.vue';
import CostDetails from '../cost/CostDetails.vue';

</script>

<template>
  <div class="flex flex-row">
    <div class="basis-4/12 flex flex-col">
      <OrdersByNumber class="bg-green-100"/>
      <OrderDetails class="bg-green-200"/>
      <ProformasByOrder class="bg-red-100"/>
      <ProformaDetails class="bg-red-100"/>
    </div>
    <div class="basis-8/12 flex flex-col">
      <ProjectCosts class="bg-blue-100"/>
      <CostDetails class="bg-blue-500"/>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
