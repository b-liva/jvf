<script setup>
import Timeline from "../list/TimeLine.vue";
import {getIncomeRowDetails} from "../../graphql/income/query/incomeRow.graphql";
import {useRoute} from "vue-router";
import {useQuery} from "@vue/apollo-composable";
import JNumber from "../../utils/number.js";
import {computed} from "vue";

const route = useRoute();
const {result, loading, error, onResult, refetch} = useQuery(getIncomeRowDetails, {id: route.params.id});
const incomeRow = computed(() => result.value?.getIncomeRowDetails ?? {})
const income = computed(() => result.value?.getIncomeRowDetails.income ?? {})
const incomeRows = computed(() => result.value?.getIncomeRowDetails.proforma?.incomerowSet.edges ?? [])
function getPercentage(index){
  let sum = 0;
  let total = 0;
  incomeRows.value.forEach((incomeRow, key) => {
    if (key <= index){
      sum = sum + incomeRow.node.amount
    }
    total = total + incomeRow.node.amount;
  })
  return Math.trunc(100 * sum / total);
}
</script>

<template>
  <div class="grid grid-cols-12 gap-6" v-if="!loading || Object.keys(income).length > 0">
    <div class="col-span-2">
      <div class="col-span-2 m-3">
        <Timeline :order-id="incomeRow.proforma.reqId.id"/>
      </div>
    </div>
    <div class="col-span-10">
      <div class="mt-6 grid grid-cols-12 gap-6">
        <div class="col-span-2"></div>
        <div class="col-span-8">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-6">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="text-center py-3">تاریخ</th>
              <th scope="col" class="text-center py-3">شماره دریافتی</th>
              <th scope="col" class="text-center py-3">پیش فاکتور</th>
              <th scope="col" class="text-center py-3">مبلغ</th>
              <th scope="col" class="text-center py-3">کارشناس</th>
              <th scope="col" class="text-center py-3 px-12">%</th>
              <th scope="col" class="text-center py-3"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(incomeRowItem, index) in incomeRows" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row"
                  class="py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">{{incomeRowItem.node.dateFa}}
              </th>
              <td class="text-sm text-center">
                <RouterLink class="font-bold" :to="{name:'income', params:{id:incomeRowItem.node.income.id}}">{{incomeRowItem.node.income.number}}</RouterLink>
              </td>
              <td class="text-sm text-center">
                <RouterLink class="font-bold" :to="{name:'proforma', params:{id:incomeRowItem.node.proforma.id}}">{{incomeRowItem.node.proforma.number}}</RouterLink>
              </td>
              <td class="text-sm text-center">{{new JNumber(incomeRowItem.node.amount).thousandSeparate()}}</td>
              <td class="text-sm text-center">
                <RouterLink class="font-bold" :to="{name:'user', params: {id: incomeRowItem.node.owner.id}}">{{incomeRowItem.node.owner.lastName}}</RouterLink>
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