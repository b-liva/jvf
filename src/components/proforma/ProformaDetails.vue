<script setup>
import {useStore} from "../../store/store.js";
import {computed, watch} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import {getProforma} from "../../graphql/proforma/query/proforma.graphql";
import JNumber from "../../utils/number.js";
const store = useStore();

const {result: proformaRes, loading, errors, load: getProformaDetails} = useLazyQuery(getProforma,
    () => ({
      proformaId: store.proformaId,
    }), {
      prefetch: false
    })

const proforma = computed(() => proformaRes.value?.getProforma ?? {})
const specs = computed(() => proformaRes.value?.getProforma?.prefspecSet.edges ?? {})

watch(
    () => store.proformaId,
    () => {
      store.proformaSpecId = 0;
      getProformaDetails()
    }
)

</script>

<template>

  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden">
          <h3 class="mb-4 text-green-500 font-semibold">ردیف پیش فاکتور</h3>
          <table class="table-fixed min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
            <tr >
              <th scope="col" class="p-1"></th>
              <th scope="col" class="p-1 text-xs font-medium text-gray-500 text-center">تعداد</th>
              <th scope="col" class="p-1 text-xs font-medium text-gray-500 text-center">کیلووات</th>
              <th scope="col" class="p-1 text-xs font-medium text-gray-500 text-center">دور</th>
              <th scope="col" class="p-1 text-xs font-medium text-gray-500 text-center">ولتاژ</th>
              <th scope="col" class="p-1 text-xs font-medium text-gray-500 text-center">قیمت واحد</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr
                v-for="spec in specs"
                :key="spec.node.id"
                @click="store.proformaSpecId = spec.node.id"
                class="hover:bg-gray-100 cursor-pointer">
              <td class="p-1 w-4">
                <div class="flex items-center">
                  <input
                      :checked="spec.node.id === store.proformaSpecId"
                      type="checkbox"
                      class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded">
                </div>
              </td>
              <td class="p-1 whitespace-nowrap text-sm font-medium text-gray-700 text-center">{{spec.node.qty}}</td>
              <td class="p-1 whitespace-nowrap text-sm font-medium text-gray-700 text-center">{{spec.node.kw}}</td>
              <td class="p-1 whitespace-nowrap text-sm font-medium text-gray-700 text-center">{{spec.node.rpm}}</td>
              <td class="p-1 whitespace-nowrap text-sm font-medium text-gray-700 text-center">{{spec.node.voltage}}</td>
              <td class="p-1 whitespace-nowrap text-sm font-medium text-gray-700 text-center">
                {{new JNumber(spec.node.price).thousandSeparate()}}
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
