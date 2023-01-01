<script setup>
import {useStore} from "../../store/store.js";
import Cost from "../../utils/cost.js";
import {useLazyQuery} from "@vue/apollo-composable";
import {getProjectCostDetails} from "../../graphql/cost/query/cost.graphql";
import ProjectCostTable from '../cost/ProjectCostTable.vue';
import {ref, watch} from "vue";
let show = ref(false)
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
    () => show.value = false
)
watch(
    () => store.costId,
    () => {
      if (!idIsNull(store.costId)){
        show.value = true;
        load()
      }
    },
    {deep: true}
)

function idIsNull(id){
  return id in [false, '', ' ', 0, '0']
}
</script>

<template>
  <div v-if="show">
    <ProjectCostTable/>
  </div>
</template>

<style scoped>

</style>
