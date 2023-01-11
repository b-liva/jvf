<script setup>
import {useRoute} from "vue-router";
import {useQuery} from "@vue/apollo-composable";
import {getUserDetails} from "../../graphql/user/query/user.graphql";
import {computed} from "vue";

const route = useRoute();
const {result, loading, error, onResult} = useQuery(getUserDetails, {id: route.params.id});

const user = computed(() => result.value?.getUserDetails ?? {});
</script>

<template>
  <div class="grid grid-cols-5 mx-16 gap-20 mt-6 py-6">
    <div class="bg-gray-100 col-span-2 p-3 rounded rounded-l relative">
      <p class="pt-1 text-lg">{{user.lastName}}</p>
      <p class="pt-1 ">کارشناس فروش ***</p>
    </div>
    <div class="bg-gray-100 max-h-32 grid text-center content-center rounded rounded-l relative">
      <div class="px-6">
        <div class="pb-1 border-b ">سفارش</div>
        <div class="font-bold absolute bottom-0 right-0 p-1">###</div>
        <div class="font-bold absolute bottom-0 left-0 p-1">##%</div>
      </div>
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
  </div>
</template>



<style scoped>

</style>