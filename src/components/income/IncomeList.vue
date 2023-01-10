<script setup>
import {useRouter} from "vue-router";
import {useIncomeStore} from "../../store/store";
import JNumber from "../../utils/number";
const router = useRouter();
const incomeStore = useIncomeStore()
</script>

<template>
  <div class="overflow-x-auto">
    <div
        v-for="(income, index) in incomeStore.incomes"
        :key="income.node.id"
        @click="router.push({name: 'income', params:{id:income.node.id}})"
        class="border bg-white rounded-lg p-2 mb-6 relative">
      <div class="">
        <div class="grid grid-cols-12">
          <div class="text-sm text-white text-center p-1.5 bg-blue-400 absolute top-0 right-0 w-12
          rounded-tr-lg rounded-bl-lg min-w-max">{{ income.node.number }}</div>
          <div class="col-start-13 text-green-700 p-1">{{income.node.owner.lastName}}</div>
        </div>
        <div class="grid grid-cols-8 py-4 gap-3">
          <div class="col-span-3">{{ income.node.customer.name }}</div>
          <div class="">
            <div class="text-center">مبلغ دریافتی</div>
            <div class=" text-center text-green-500">{{ new JNumber(income.node.amount).thousandSeparate() }}</div>
          </div>
          <div class="min-w-max">
            <div class="text-center">تعداد تخصیص</div>
            <div class="text-center ">
              <span class="text-green-500">{{income.node.assignedCount}}</span> <span>مجوز</span></div>
          </div>
          <div class="min-w-max">
            <div class="text-center">تخصیص داده شده</div>
            <div class="text-center text-green-500">{{new JNumber(income.node.amountAssigned).thousandSeparate()}}</div>
          </div>
          <div class="">
            <div class="text-center">مانده</div>
            <div class="text-center text-green-500">{{new JNumber(income.node.amountNotAssigned).thousandSeparate()}}</div>
          </div>
          <div class="text-right">
            <div class="text-xs text-center text-gray-500 px-4 text-justify">
              تاریخ
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
