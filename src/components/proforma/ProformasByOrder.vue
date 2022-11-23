<script setup>
import {useStore} from "../../store/store.js";
import {useQuery} from "@vue/apollo-composable";
import {getProformasByOrderId} from "../../graphql/proforma/query/proforma.graphql";
import {computed, watch} from "vue";

const store = useStore();


function getProformas(){
  const {result: proformasByOrder, loading, errors} = useQuery(getProformasByOrderId,
      () => ({
        orderId: store.orderId,
      }), {
        prefetch: false
      })
  return{proformasByOrder, loading, errors}
}
const {proformasByOrder, loading, errors} = getProformas();
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
      {{proforma.node.id}} - {{proforma.node.number}} - {{proforma.node.perm}}
    </li>
  </ul>
</template>

<style scoped>

</style>
