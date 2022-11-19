<script setup>
const props = defineProps(['specId'])
import {useQuery} from "@vue/apollo-composable";
import {computed, watch} from "vue";
import {getCostsBySpec} from "../../graphql/cost/query/cost.graphql";
import CostDetails from "./CostDetails.vue";
const {result: costList, loading, error} = useQuery(getCostsBySpec,
    () => ({
      specId: props.specId
    }))
const costs = computed(() => costList.value?.getCostsBySpec.edges ?? [])

</script>

<template>
  <div>project cost list: {{ specId }}</div>
  <ul>
    <li v-for="cost in costs" :key="cost.node.id">{{ cost.node.id }} - {{ cost.node.chNumber }}</li>
  </ul>
  <div>
    <CostDetails/>
  </div>
</template>

<style scoped>

</style>
