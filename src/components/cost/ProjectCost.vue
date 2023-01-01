<script setup>
import {useStore} from "../../store/store.js";
import OrdersByNumber from '../order/OrdersByNumber.vue';
import OrderDetails from '../order/OrderDetails.vue';
import ProformasByOrder from '../proforma/ProformasByOrder.vue';
import ProformaDetails from '../proforma/ProformaDetails.vue';
import ProjectCosts from '../cost/ProjectCosts.vue';
import CostDetails from '../cost/CostDetails.vue';
import {idIsNull} from "../../utils/methods";
import {baseUrl} from "../../utils/methods";

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
  <div class="flex overflow-hidden bg-white pt-16">
    <aside id="sidebar"
           class="fixed hidden z-20 h-full top-0 right-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
           aria-label="Sidebar">
      <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div class="flex-1 px-3 bg-white divide-y space-y-1">
            <ul class="space-y-2 pb-2">
              <li>
                <a href="#"
                   class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                  <svg class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                       fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                          clip-rule="evenodd"></path>
                  </svg>
                  <span class="ml-3 flex-1 whitespace-nowrap">بهای تمام شده</span>
                </a>
              </li>
              <li>
                <a :href="baseUrl() + '/cdash'"
                   class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                  <svg class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                       fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                          clip-rule="evenodd"></path>
                  </svg>
                  <span class="ml-3 flex-1 whitespace-nowrap">بازگشت</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
    <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto lg:mr-64">
      <main>
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
      </main>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
