<script setup>
import {computed, watch} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import {getSpecsById} from '../../graphql/order/query/order.graphql';
import {useStore} from "../../store/store.js";

const store = useStore();

const {result: specsByOrder, loading, errors, load} = useLazyQuery(getSpecsById,
    () => ({
      orderId: store.orderId,
    }))

const specs = computed(() => specsByOrder.value?.getSpecsById.edges ?? [])
watch(
    () => store.orderId,
    () => {
      load()
    }
)

</script>

<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="py-3 px-6">
          تعداد
        </th>
        <th scope="col" class="py-3 px-6">
          کیلووات
        </th>
        <th scope="col" class="py-3 px-6">
          سرعت
        </th>
        <th scope="col" class="py-3 px-6">
          ولتاژ
        </th>
        <th scope="col" class="py-3 px-6">

        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="spec in specs" :key="spec.node.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{spec.node.qty}}
        </td>
        <td class="py-4 px-6">
          {{spec.node.kw}}
        </td>
        <td class="py-4 px-6">
          {{spec.node.rpmNew.rpm}}
        </td>
        <td class="py-4 px-6">
          {{spec.node.voltage}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");

</style>
