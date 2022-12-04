<script setup>
import {useStore} from "../../store/store.js";
import {useLazyQuery} from "@vue/apollo-composable";
import {getProformasByOrderId} from "../../graphql/proforma/query/proforma.graphql";
import {computed, watch} from "vue";

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

</script>

<template>
  <ul>
    <li @click="store.proformaId = proforma.node.id" v-for="proforma in proformas" :key="proforma.node.id">
      {{ proforma.node.id }} - {{ proforma.node.number }} - {{ proforma.node.perm }}
    </li>
  </ul>
</template>

<style scoped>

</style>
