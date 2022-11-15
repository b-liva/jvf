<script setup>
import {computed, watch} from "vue";

const props = defineProps(['proformaId'])
import {useQuery} from "@vue/apollo-composable";
import {getProforma} from "../../graphql/proforma/query/proforma.graphql";


function getProformaFn(){
  const {result: proformaRes, loading, errors} = useQuery(getProforma,
      () => ({
        proformaId: props.proformaId,
      }), {
        prefetch: false
      })
  return{proformaRes, loading, errors}
}

const {proformaRes, loading, errors} = getProformaFn();
const proforma = computed(() => proformaRes.value?.getProforma ?? {})
watch(
    () => props.proformaId,
    () => {
      getProformaFn()
    }
)

</script>

<template>
  <p>inside proforma details: {{proforma.number}}</p>

</template>

<style scoped>

</style>
