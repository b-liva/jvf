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
const specs = computed(() => proformaRes.value?.getProforma.prefspecSet.edges ?? {})

watch(
    () => store.proformaId,
    () => {
      getProformaDetails()
    }
)
</script>

<template>

  <div class="overflow-x-auto relative">
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
          دور
        </th>
        <th scope="col" class="py-3 px-6">
          ولتاژ
        </th>
        <th scope="col" class="py-3 px-6">
          قیمت واحد
        </th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr
          @click="store.proformaSpecId = spec.node.id" v-for="spec in specs" :key="spec.node.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500">
        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{spec.node.qty}}
        </th>
        <td class="py-4 px-6">
          {{spec.node.kw}}
        </td>
        <td class="py-4 px-6">
          {{spec.node.rpm}}
        </td>
        <td class="py-4 px-6">
          {{spec.node.voltage}}
        </td>
        <td class="py-4 px-6">
          {{new JNumber(spec.node.price).thousandSeparate()}}
        </td>
        <td><template v-if="spec.node.id === store.proformaSpecId">*</template></td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>

</style>
