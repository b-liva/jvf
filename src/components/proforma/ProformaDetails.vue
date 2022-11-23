<script setup>
import {useStore} from "../../store/store.js";
import {computed, watch} from "vue";
import {useQuery} from "@vue/apollo-composable";
import {getProforma} from "../../graphql/proforma/query/proforma.graphql";

const store = useStore();

function getProformaFn(){
  const {result: proformaRes, loading, errors} = useQuery(getProforma,
      () => ({
        proformaId: store.proformaId,
      }), {
        prefetch: false
      })
  return{proformaRes, loading, errors}
}

const {proformaRes, loading, errors} = getProformaFn();
const proforma = computed(() => proformaRes.value?.getProforma ?? {})
const specs = computed(() => proformaRes.value?.getProforma.prefspecSet.edges ?? {})

watch(
    () => store.proformaId,
    () => {
      getProformaFn()
    }
)
</script>

<template>
  <p>inside proforma details: {{proforma.number}}</p>
  <ul>
    <li @click="store.proformaSpecId = spec.node.id" v-for="spec in specs" :key="spec.node.id">{{spec.node.kw}} - {{spec.node.price}}</li>
  </ul>
</template>

<style scoped>

</style>
