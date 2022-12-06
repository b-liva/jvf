<script setup>
import {useStore} from "../../store/store.js";
import {ref} from "vue";
import Cost from "../../utils/cost.js";

import {useQuery} from "@vue/apollo-composable";
import {getProjectCostDetails} from "../../graphql/cost/query/cost.graphql";
import ProjectCostTable from '../cost/ProjectCostTable.vue';

const store = useStore();
store.cost = ref({
  id: null,
  chNumber: null,
  motorType: null,
  dateFa: null,
  altitude: null,
  frame: null,
  ambientTemp: null,
  tempRise: null,
  standardPar: {},
  generalCost: {},
  wagecost: {},
  steelrebar: {},
  overheadcost: {},
  steel: {},
  custator: {},
  curotor: {},
  aluingot: {},
  siliconsheet: {},
  castiron: {},
  insulation: {},
  other: {}
});

const {onResult, refetch: refetchCost} = useQuery(getProjectCostDetails,
    () => ({
      costId: store.costId
    }))
onResult(qr => {
  window.qr = qr;
  const costRaw = qr.data.getProjectCostDetails;
  const costObj = new Cost(costRaw.id, costRaw);
  window.costObj = costObj;
  store.cost = Cost.copy(costObj);
})

</script>

<template>

  <div v-if="store.cost">
    <div>
      <ProjectCostTable/>
      <p @click="refetchCost">get cost</p>
    </div>
  </div>
</template>

<style scoped>

</style>
