<script setup>
import {getCustomerDetails} from "../../graphql/customer/query/customer.graphql";
import {useQuery} from "@vue/apollo-composable";
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
const {result, loading, error, onResult, refetch} = useQuery(getCustomerDetails, {id: route.params.id});

const customer = computed(() => result.value?.getCustomerDetails ?? {})
console.log(customer)
</script>

<template>
<div class="grid grid-cols-6 mx-16 gap-20 mt-6 py-6">
  <div class="bg-gray-100 col-span-2 p-3 rounded rounded-l relative">
    <p v-if="customer.agent" class="absolute top-0 right-0 bg-blue-500 text-white p-1 text-base rounded-tr-lg rounded-bl-lg">نماینده</p>
    <p class="mt-6 pt-1 text-lg">{{customer.name}}</p>
    <p class="pt-1 ">{{customer.addr}}</p>
    <p class="pt-1 text-left">{{customer.phone}}</p>
    <p class="pt-1 text-left">{{customer.whatsapp}}</p>
    <p class="pt-1 text-left">{{customer.fax}}</p>
    <p class="pt-1 ">{{customer.email}}</p>
    <p class="pt-1 text-left">{{customer.website}}</p>
    <p class="pt-1 text-left">{{customer.postalCode}}</p>
    <p class="absolute top-0 left-0 p-1 rounded-tl rounded-br text-red-500 text-xs cursor-pointer">ویرایش</p>
  </div>
  <div class="bg-gray-100 max-h-32 grid text-center content-center rounded rounded-l">
    <div class="px-6">
      <div class="pb-2 border-b ">فروش</div>
      <div class="pt-2 font-bold">### کیلووات</div>
    </div>
  </div>
  <div class="bg-gray-100 max-h-32 grid text-center content-center rounded rounded-l">
    <div class="px-6">
      <div class="pb-2 border-b ">فروش</div>
      <div class="pt-2 font-bold">###,###,### ریال</div>
    </div>
  </div>
  <div class="bg-gray-100 max-h-32 grid text-center content-center relative rounded rounded-l">
    <div class="px-6">
      <div class="pb-2 border-b ">اعتبار</div>
      <div class="pt-2 font-bold">#.#</div>
      <div class="absolute top-0 left-0 text-base bg-blue-800 p-1 rounded-tl rounded-br text-white">#</div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>