<script setup>
import {useStore} from "../../store/store.js";
import {ref, isRef} from "vue";
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
  standardPar: null,
  generalCost: null,
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
  store.cost = JSON.parse(JSON.stringify(qr.data.getProjectCostDetails));
})

</script>

<template>

  <div v-if="store.cost">
    cost details:
    <div>
      <p @click="refetchCost">get cost</p>
      <ProjectCostTable/>
    </div>
  </div>
</template>

<style scoped>

</style>
