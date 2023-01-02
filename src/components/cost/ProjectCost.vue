<script setup>
import {useStore} from "../../store/store.js";
import OrdersByNumber from '../order/OrdersByNumber.vue';
import ProformasByOrder from '../proforma/ProformasByOrder.vue';
import ProformaDetails from '../proforma/ProformaDetails.vue';
import ProjectCosts from '../cost/ProjectCosts.vue';
import CostDetails from '../cost/CostDetails.vue';
import {idIsNull, baseUrl} from "../../utils/methods";
import { RouterLink, RouterView } from 'vue-router'

const store = useStore();

function resetStore() {
  store.orderNumber = 0;
  store.orderId = 0;
  store.proformaId = 0;
  store.specId = 0;
  store.proformaSpecId = 0;
  store.costId = null;
  store.cost = null;
}

</script>

<template>
  <div class="pt-6 px-4">
    <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
        <button
            v-if="!idIsNull(store.orderNumber)"
            @click="resetStore"
            class="text-sm font-normal text-red-500"
        >حذف همه</button>
        <OrdersByNumber/>
        <ProformasByOrder/>
      </div>
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <ProformaDetails/>
        <ProjectCosts class="mt-6"/>
      </div>
    </div>
    <div class="w-full grid grid-cols-1">
      <CostDetails class="mt-8"/>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
