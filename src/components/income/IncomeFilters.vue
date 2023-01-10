<script setup>
import {useIncomeStore} from "../../store/store";
import {ref} from "vue";
import {filterIncomes} from "../../graphql/income/query/income.graphql"
import {useLazyQuery} from "@vue/apollo-composable";
import {computed, watch} from "vue";
import {idIsNull} from "../../utils/methods";

const incomeStore = useIncomeStore();
let incomeNumber = ref(0)
let customerName = ref('');
const {result: incomes, loading, error, load} = useLazyQuery(filterIncomes)
watch(
    () => [incomeNumber.value, customerName.value],
    () => {
      handleNullFilterInputs();
      load(filterIncomes, {
        number: incomeNumber.value,
        customerName: customerName.value
      })
    }
)
incomeStore.incomes = computed(() => incomes.value?.filterIncomes.edges ?? [])

function handleNullFilterInputs(){
  // null values: null, false, '', ' ', 0, '0'
  if (idIsNull(incomeNumber.value)) {
    if (customerName.value.trim().length === 0){
      incomeNumber.value = 0;
    }else {
      incomeNumber.value = null;
    }
  }
}
</script>

<template>
  <div>
    <div class=""><span class="text-xs font-normal text-gray-500">شماره دریافتی</span>
      <input
          type="number"
          id="order_number"
          placeholder="شماره درخواست"
          class="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          v-model="incomeNumber"
          required></div>
    <div class="mt-3"><span class="text-xs font-normal text-gray-500">مشتری</span>
      <input
          type="text"
          id="customer_name"
          placeholder="مشتری"
          class="border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          v-model="customerName"
          required></div>
    <div v-if="loading">Is Loading...</div>
  </div>
</template>

<style scoped>

</style>