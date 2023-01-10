<script setup>
import {useRouter} from "vue-router";
import {useIncomeStore} from "../../store/store";
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
        <div class="grid grid-cols-9 py-4">
          <div class="col-span-3">{{ income.node.customer.name }}</div>
          <div class="">
            <div class="text-center">تعداد دستگاه</div>
            <div class=" text-center text-green-500">***</div>
          </div>
          <div class="">
            <div class="text-center">کیلووات</div>
            <div class="text-center text-green-500">***</div>
          </div>
          <div class="text-center">***</div>
          <div class="col-span-3 text-right">
            <div class="text-xs text-center text-gray-500 px-4 text-justify">
              ****
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
