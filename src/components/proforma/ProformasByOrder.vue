<script setup>
import {useStore} from "../../store/store.js";
import {useLazyQuery} from "@vue/apollo-composable";
import {getProformasByOrderId} from "../../graphql/proforma/query/proforma.graphql";
import {computed, watch} from "vue";
import { ListGroup, ListGroupItem } from 'flowbite-vue'
const store = useStore();


const {result: proformasByOrder, loading, errors, load: getProformas} = useLazyQuery(getProformasByOrderId,
    () => ({
      orderId: store.orderId,
    }), {
      prefetch: false
    })
const proformas = computed(() => proformasByOrder.value?.getProformasByOrderId.edges ?? [])
watch(
    () => store.orderId,
    () => {
      getProformas()
    }
)

function selectedProformaClass(id){
  return id === store.proformaId ? "text-lg font-semibold" : "";
}
</script>

<template>
  <h2>پیش فاکتور</h2>
  <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
    <div
        @click="store.proformaId = proforma.node.id" v-for="proforma in proformas" :key="proforma.node.id"
        class="flex flex-col pb-3">
      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{{proforma.node.dateFa}}</dt>
      <dd :class="selectedProformaClass(proforma.node.id)">{{proforma.node.number}}</dd>
    </div>
  </dl>
</template>

<style scoped>
@import url("../../assets/index.css");

</style>
