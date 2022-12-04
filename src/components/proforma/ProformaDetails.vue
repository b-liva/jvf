<script setup>
import {useStore} from "../../store/store.js";
import {computed, watch} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import {getProforma} from "../../graphql/proforma/query/proforma.graphql";

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
  <p>inside proforma details: {{proforma.number}}</p>
  <ul>
    <li @click="store.proformaSpecId = spec.node.id" v-for="spec in specs" :key="spec.node.id">{{spec.node.kw}} - {{spec.node.price}}</li>
  </ul>
</template>

<style scoped>

</style>
