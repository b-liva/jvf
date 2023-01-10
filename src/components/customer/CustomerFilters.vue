<script setup>
import {useCustomerStore} from "../../store/store";
import {ref} from "vue";
import {filterCustomer} from "../../graphql/customer/query/customer.graphql"
import {useLazyQuery} from "@vue/apollo-composable";
import {computed, watch} from "vue";
import {idIsNull} from "../../utils/methods";

const customerStore = useCustomerStore();
let customerName = ref('');
const {result: customers, loading, error, load} = useLazyQuery(filterCustomer)
watch(
    () => [customerName.value],
    () => {
      load(filterCustomer, {
        customerName: idIsNull(customerName.value) ? 0 : customerName.value
      })
    }
)
customerStore.customers = computed(() => customers.value?.filterCustomer.edges ?? [])

</script>

<template>
  <div>
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