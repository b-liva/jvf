<script setup>
import {useStore} from "../../store/store.js";
import {useLazyQuery} from "@vue/apollo-composable";
import {getProformasByOrderId} from "../../graphql/proforma/query/proforma.graphql";
import {computed, watch, ref} from "vue";
import Reset from "../../utils/reset.js";
let reset = new Reset();
const store = useStore();

const {result: proformasByOrder, loading, errors, load: getProformas} = useLazyQuery(getProformasByOrderId)

const proformas = computed(() => reset.getValueOrReset(getValue))

watch(
    () => store.orderNumber,
    () => reset.reset()
)

watch(
    () => store.orderId,
    () => {
      reset.resetting.value = false;
      let vars = {
        orderId: store.orderId
      }
      if (idIsNull(store.orderId)){
        vars['orderPk'] = 0
      }
      getProformas(getProformasByOrderId, vars);
    }
)

function idIsNull(id){
  return id in [false, '', ' ', 0, '0']
}
function getValue() {
  return {
    value: proformasByOrder.value?.getProformasByOrderId.edges ?? [],
    resetValue: []
  }
}

function selectedProformaClass(id) {
  return id === store.proformaId ? "text-lg font-semibold" : "";
}

</script>

<template>
  <div class="flex flex-col mt-8">
    <div class="overflow-x-auto rounded-lg">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden sm:rounded-lg">
          <h3 class="mb-4 text-green-500 font-semibold" @click="reset.reset">پیش فاکتور</h3>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="p-4 text-right text-xs font-medium text-gray-500 tracking-wider">مشتری</th>
              <th scope="col" class="p-4 text-right text-xs font-medium text-gray-500 tracking-wider">تاریخ</th>
            </tr>
            </thead>
            <tbody class="bg-white">
            <tr
                @click="store.proformaId = proforma.node.id"
                v-for="(proforma, index) in proformas"
                :key="proforma.node.id"
                :class="{'bg-gray-50': index % 2 === 1}">
              <td
                  :class="{
                'rounded-lg rounded-right': index % 2 === 1,
                'text-lg font-semibold text-blue-500': proforma.node.id === store.proformaId
                }"
                  class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">{{ proforma.node.number }}
              </td>
              <td
                  class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">{{ proforma.node.dateFa }}
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
