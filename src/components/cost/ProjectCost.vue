<script setup>
import OrdersByNumber from '../order/OrdersByNumber.vue';
import OrderDetails from '../order/OrderDetails.vue';
import ProformasByOrder from '../proforma/ProformasByOrder.vue';
import ProformaDetails from '../proforma/ProformaDetails.vue';
import ProjectCosts from '../cost/ProjectCosts.vue';
import CostDetails from '../cost/CostDetails.vue';

</script>

<template>
  <div class="flex flex-row bg-gray-50">
    <div class="basis-4/12 flex flex-col">
      <OrdersByNumber/>
<!--      <OrderDetails class="bg-green-200"/>-->
      <ProformasByOrder/>
      <ProformaDetails/>
      <ProjectCosts class="bg-blue-100"/>
    </div>
    <div class="basis-8/12 flex flex-col">
      <CostDetails class="bg-blue-500"/>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
