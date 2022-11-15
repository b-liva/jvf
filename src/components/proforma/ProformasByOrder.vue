<script setup>
const props = defineProps(['orderId'])
import {useQuery} from "@vue/apollo-composable";
import {getProformasByOrderId} from "../../graphql/proforma/query/proforma.graphql";
import {computed, watch} from "vue";

function getProformas(){
  const {result: proformasByOrder, loading, errors} = useQuery(getProformasByOrderId,
      () => ({
        orderId: props.orderId,
      }), {
        prefetch: false
      })
  return{proformasByOrder, loading, errors}
}
const {proformasByOrder, loading, errors} = getProformas();
const proformas = computed(() => proformasByOrder.value?.getProformasByOrderId.edges ?? [])
watch(
    () => props.orderId,
    () => {
      getProformas()
    }
)

</script>

<template>

  <ul>
    <li v-for="proforma in proformas" :key="proforma.node.id">{{proforma.node.id}} - {{proforma.node.number}} - {{proforma.node.perm}}</li>
  </ul>
</template>

<style scoped>

</style>
