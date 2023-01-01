<script setup>
import {useStore} from "../../store/store.js";
import {ref, watch} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import {computed} from "vue";
import {getCostsBySpec} from "../../graphql/cost/query/cost.graphql";
import JNumber from "../../utils/number.js";
import {getProformasByOrderId} from "../../graphql/proforma/query/proforma.graphql";
const store = useStore();

const {result: costList, loading, error, load} = useLazyQuery(getCostsBySpec)
const costs = computed(() => costList.value?.getCostsBySpec.edges ?? [])
watch(
    () => store.proformaSpecId,
    () => {
      store.costId = 0;
      let vars = {
        specId: store.proformaSpecId
      }
      if (idIsNull(store.proformaSpecId)){
        vars['specPk'] = 0
      }
      load(getCostsBySpec, vars);
    },
    {deep: true}
)
function idIsNull(id){
  return id in [false, '', ' ', 0, '0']
}
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden">
          <h3 class="mb-4 text-green-500 font-semibold">بهای تمام شده</h3>
          <table class="table-fixed min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
            <tr >
              <th scope="col" class="p-4"></th>
              <th scope="col" class="p-4 text-xs font-medium text-gray-500 text-center">شماره</th>
              <th scope="col" class="p-4 text-xs font-medium text-gray-500 text-center">تاریخ</th>
              <th scope="col" class="p-4 text-xs font-medium text-gray-500 text-center">بهای تمام شده</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr
                v-for="cost in costs"
                :key="cost.node.id"
                @click="store.costId = cost.node.id"
                class="hover:bg-gray-100">
              <td class="p-3 w-4">
                <div class="flex items-center">
                  <input
                      :checked="cost.node.id === store.costId"
                      type="checkbox"
                      class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded">
                </div>
              </td>
              <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-700 text-center">{{cost.node.chNumber}}</td>
              <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-700 text-center">{{cost.node.dateFa}}</td>
              <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-700 text-center">
                {{new JNumber(0).thousandSeparate()}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import url("../../assets/index.css");
</style>
