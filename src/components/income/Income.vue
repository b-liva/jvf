<script setup>
import TimeLineList from "../list/TimeLineList.vue";

import {getIncomeDetails} from "../../graphql/income/query/income.graphql";
import {useRoute} from "vue-router";
import {useQuery} from "@vue/apollo-composable";
import JNumber from "../../utils/number.js";
import {computed} from "vue";
import {useBaseTimeLineData} from "../../data/base";

const route = useRoute();
const {result, loading, error, onResult, refetch} = useQuery(getIncomeDetails, {id: route.params.id});
const income = computed(() => result.value?.getIncomeDetails ?? {})
const incomeRows = computed(() => result.value?.getIncomeDetails?.incomerowSet.edges ?? [])

const timeLineData = useBaseTimeLineData();

function getPercentage(index){
  let sum = 0;
  let total = 0;
  console.log(sum, total)
  incomeRows.value.forEach((incomeRow, key) => {
    if (key <= index){
      console.log(incomeRow)
      sum = sum + incomeRow.node.amount
    }
    total = total + incomeRow.node.amount;
  })
  console.log(sum, total)
  return Math.trunc(100 * sum / total);
}
</script>

<template>
  <div class="grid grid-cols-12 gap-6" v-if="!loading || Object.keys(income).length > 0">
    <div class="col-span-2">
      <div class="col-span-2 m-3">
        <TimeLineList v-for="tld in timeLineData" v-bind="tld" page-name="income" class="my-2"/>
      </div>
    </div>
    <div class="col-span-10">
      <div class="flex justify-center mt-12">
        <div class="text-center px-4">
          <div class="border-b pb-2">مشتری</div>
          <div class="pt-2 text-blue-600 hover:font-bold hover:cursor-pointer">
            <RouterLink :to="{name:'customer', params: {id: income.customer.id}}">{{income.customer.name}}</RouterLink>
          </div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">شماره دریافتی</div>
          <div class="pt-2 text-blue-600">{{income.number}}</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">شماره اتوماسیون</div>
          <div class="pt-2 text-blue-600">{{income.chNum}}</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">تاریخ</div>
          <div class="pt-2 text-blue-600">***</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">نوع</div>
          <div class="pt-2 text-blue-600">{{income.type.title}}</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">مبلغ</div>
          <div class="pt-2 text-blue-600">{{new JNumber(income.amount).thousandSeparate()}}</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">کارشناس</div>
          <div class="pt-2 text-blue-600 hover:font-bold hover:cursor-pointer">
            <RouterLink :to="{name:'user', params: {id: income.owner.id}}">{{income.owner.lastName}}</RouterLink>
          </div>
        </div>
        <div class="px-4 group relative cursor-pointer">
          <div class="border-b pb-2 px-4">...</div>
          <div class="text-gray-500 hidden group-hover:block min-w-max
      absolute right-0 top-10 bg-gray-100 rounded rounded-l py-2 px-4 text-xs z-20">
            <div class="pb-1 min-h-fit">ویرایش</div>
            <div class="pb-1 min-h-fit">حذف</div>
          </div>
        </div>
      </div>
      <div class="mt-6 grid grid-cols-12 gap-6">
        <div class="col-span-2"></div>
        <div class="col-span-8">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-6">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="text-center py-3">تاریخ</th>
              <th scope="col" class="text-center py-3">پیش فاکتور</th>
              <th scope="col" class="text-center py-3">مبلغ</th>
              <th scope="col" class="text-center py-3">کارشناس</th>
              <th scope="col" class="text-center py-3 px-12">%</th>
              <th scope="col" class="text-center py-3"></th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(incomeRow, index) in incomeRows" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row"
                  class="py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">***
              </th>
              <td class="text-sm text-center">
                <RouterLink class="font-bold" :to="{name:'proforma', params:{id:incomeRow.node.proforma.id}}">{{incomeRow.node.proforma.number}}</RouterLink>
              </td>
              <td class="text-sm text-center">{{new JNumber(incomeRow.node.amount).thousandSeparate()}}</td>
              <td class="text-sm text-center">
                <RouterLink class="font-bold" :to="{name:'user', params: {id: incomeRow.node.owner.id}}">{{incomeRow.node.owner.lastName}}</RouterLink>
              </td>
              <td class="text-sm text-center">
                <div class="relative bg-gray-200 rounded rounded-md">
                  <div class="bg-gray-500 text-white" :class="{'rounded-l-md': getPercentage(index) === 100}" :style="{width:`${getPercentage(index)}%`}">{{getPercentage(index)}}</div>
                </div>
              </td>
              <td class="text-sm text-center px-3 cursor-pointer relative group">
                <span class="group-hover:invisible">...</span>
                <div class="absolute hidden left-0 top-0 group-hover:block p-2">
                  <p class="text-blue-800 text-xs pb-1">ویرایش</p>
                  <p class="text-red-800 text-xs ">حذف</p>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="col-span-2"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>