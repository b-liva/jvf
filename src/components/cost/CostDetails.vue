<script setup>
import {useStore} from "../../store/store.js";
import {computed, ref, watch} from "vue";
import Cost from "../../utils/cost.js";

import {useLazyQuery} from "@vue/apollo-composable";
import {getProjectCostDetails} from "../../graphql/cost/query/cost.graphql";
import ProjectCostTable from '../cost/ProjectCostTable.vue';
import CommaSeparatedNumberInput from "../CommaSeparatedNumberInput.vue"

const store = useStore();
store.cost = Cost.reset();

const {result: projectCostDetailsResult, loading, load: load} = useLazyQuery(
    getProjectCostDetails,
    () => {return {costId: store.costId}},
    {fetchPolicy: "cache-and-network"}
);

watch(
    projectCostDetailsResult,
    () => {
      if (!loading.value) {
        const costRaw = projectCostDetailsResult.value?.getProjectCostDetails ?? Cost.reset()
        const costObj = new Cost(costRaw.id, costRaw);
        window.costObj = costObj;
        store.cost = Cost.copy(costObj);
        window.emptyCost = Cost.reset();
      }
    },
    {deep: true})
watch(
    () => store.costId,
    () => load(),
    {deep: true}
)
</script>

<template>
  <div v-if="store.costId">
    <CommaSeparatedNumberInput/>
    <ProjectCostTable/>
  </div>
</template>

<style scoped>

</style>
