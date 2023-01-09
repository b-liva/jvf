<script setup>
import {useStore} from "../../store/store.js";
import Cost from "../../utils/cost.js";
import {useLazyQuery} from "@vue/apollo-composable";
import {getProjectCostDetails} from "../../graphql/cost/query/cost.graphql";
import ProjectCostTable from '../cost/ProjectCostTable.vue';
import {ref, watch} from "vue";
import {idIsNull} from "../../utils/methods";
const store = useStore();
store.cost = Cost.reset();

const {result: projectCostDetailsResult, loading, load: load, onResult: onResult} = useLazyQuery(
    getProjectCostDetails,
    () => {return {costId: store.costId}},
    {fetchPolicy: "cache-and-network"}
);

onResult(qr => {
  const costRaw = projectCostDetailsResult.value?.getProjectCostDetails ?? Cost.reset()
  const costObj = new Cost(costRaw.id, costRaw);
  store.cost = Cost.copy(costObj);
})

watch(
    () => [store.orderNumber, store.orderId, store.proformaId, store.proformaSpecId],
    () => store.showCostForm = false
)
watch(
    () => store.costId,
    () => {
      if (!idIsNull(store.costId)){
        store.showCostForm = true;
        load()
      }
    },
    {deep: true}
)

</script>

<template>
  <div v-if="store.showCostForm">
    <ProjectCostTable/>
  </div>
</template>

<style scoped>

</style>
