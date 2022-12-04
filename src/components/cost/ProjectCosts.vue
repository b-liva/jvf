<script setup>
import {useStore} from "../../store/store.js";
import {ref, watch} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import {computed} from "vue";
import {getCostsBySpec} from "../../graphql/cost/query/cost.graphql";
import CostDetails from "./CostDetails.vue";

const store = useStore();
const {result: costList, loading, error, load} = useLazyQuery(getCostsBySpec,
    () => ({
      specId: store.proformaSpecId
    }))
const costs = computed(() => costList.value?.getCostsBySpec.edges ?? [])
watch(
    () => store.proformaSpecId,
    () => load()
)
</script>

<template>
  <div>project cost list: {{ store.proformaSpecId }}</div>
  <p v-if="loading">loading</p>
  <ul>
    <li v-for="cost in costs" :key="cost.node.id" @click="store.costId = cost.node.id">{{ cost.node.id }} - {{ cost.node.chNumber }}</li>
  </ul>
  <div>
    <CostDetails v-if="store.costId"/>
  </div>
</template>

<style scoped>

</style>
