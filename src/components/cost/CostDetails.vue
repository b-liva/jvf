<script setup>
import {useStore} from "../../store/store.js";
import {computed, ref, watch} from "vue";
import Cost from "../../utils/cost.js";
import Reset from "../../utils/reset.js";
import {useLazyQuery} from "@vue/apollo-composable";
import {getProjectCostDetails} from "../../graphql/cost/query/cost.graphql";
import ProjectCostTable from '../cost/ProjectCostTable.vue';
let show = ref(false)
const store = useStore();
store.cost = Cost.reset();
const reset = new Reset();

const {result: projectCostDetailsResult, loading, load: load, onResult: onResult} = useLazyQuery(
    getProjectCostDetails,
    () => {return {costId: store.costId}},
    {fetchPolicy: "cache-and-network"}
);

onResult(qr => {
  const costRaw = reset.getValueOrReset(getValue)
  const costObj = new Cost(costRaw.id, costRaw);
  store.cost = Cost.copy(costObj);
})

watch(
    () => [store.orderNumber, store.orderId, store.proformaId, store.proformaSpecId],
    () => show.value = false
)
watch(
    () => store.costId,
    () => {
      reset.resetting.value = false;
      show.value = true;
      load()
    },
    {deep: true}
)
function getValue(){
  return{
    value: projectCostDetailsResult.value?.getProjectCostDetails ?? Cost.reset(),
    resetValue: Cost.reset()
  }
}
</script>

<template>
  <div v-if="show">
    <ProjectCostTable/>
  </div>
</template>

<style scoped>

</style>
