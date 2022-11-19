<script setup>
import {computed, watch} from "vue";
const emit = defineEmits(['inFocus', 'submit'])

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
const specs = computed(() => proformaRes.value?.getProforma.prefspecSet.edges ?? {})

function setSpecId(id){
  emit('getSpecId', id)
}
watch(
    () => props.proformaId,
    () => {
      getProformaFn()
    }
)
</script>

<template>
  <p>inside proforma details: {{proforma.number}}</p>
  <ul>
    <li @click="setSpecId(spec.node.id)" v-for="spec in specs" :key="spec.node.id">{{spec.node.kw}} - {{spec.node.price}}</li>
  </ul>
</template>

<style scoped>

</style>
