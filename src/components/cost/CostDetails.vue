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
    <p @click="checkRef">check ref</p>
    <div>
      <p @click="refetchCost">get cost</p>
      <p @click="logCost">log cost</p>
      <div><input v-model="store.cost.chNumber">
        <p>{{ store.cost.chNumber }}</p></div>
      <div><input v-model="store.cost.motorType"></div>
      <div><input v-model="store.cost.dateFa"></div>
      <div><input v-model="store.cost.altitude"></div>
      <div><input v-model="store.cost.frame"></div>
      <div><input v-model="store.cost.ambientTemp"></div>
      <div><input v-model="store.cost.tempRise"></div>
      <div><input v-model="store.cost.standardParts"></div>
      <div><input v-model="store.cost.generalCost"></div>
      <div>
        <input v-model="store.cost.wagecost.qty">
        <input v-model="store.cost.wagecost.price">
        <input v-model="store.cost.wagecost.__typename">
      </div>
      <div>
        <input v-model="store.cost.steelrebar.qty">
        <input v-model="store.cost.steelrebar.price">
      </div>
      <!--    <p>somenew: {{ cost.somenew.qty }} - {{ cost.somenew.price }}</p>-->
      <p v-if="store.cost.wagecost">wagecost: {{ store.cost.wagecost.qty }} - {{ store.cost.wagecost.price }}</p>
      <p v-if="store.cost.steelrebar">steelrebar: {{ store.cost.steelrebar.qty }} -
        {{ store.cost.steelrebar.price }}</p>
      <p v-if="store.cost.overheadcost">overheadcost: {{ store.cost.overheadcost.qty }} -
        {{ store.cost.overheadcost.price }}</p>
      <p v-if="store.cost.steel">steel: {{ store.cost.steel.qty }} - {{ store.cost.steel.price }}</p>
      <p v-if="store.cost.custator">custator: {{ store.cost.custator.qty }} - {{ store.cost.custator.price }}</p>
      <p v-if="store.cost.curotor">curotor: {{ store.cost.curotor.qty }} - {{ store.cost.curotor.price }}</p>
      <p v-if="store.cost.aluingot">aluingot: {{ store.cost.aluingot.qty }} - {{ store.cost.aluingot.price }}</p>
      <p v-if="store.cost.siliconsheet">siliconsheet: {{ store.cost.siliconsheet.qty }} -
        {{ store.cost.siliconsheet.price }}</p>
      <p v-if="store.cost.castiron">castiron: {{ store.cost.castiron.qty }} - {{ store.cost.castiron.price }}</p>
      <p v-if="store.cost.insulation">insulation: {{ store.cost.insulation.qty }} -
        {{ store.cost.insulation.price }}</p>
      <p v-if="store.cost.other">other: {{ store.cost.other.qty }} - {{ store.cost.other.price }}</p>

      <!--    <div v-if="cost.bearingcostSet.edges.length > 0">bearings:-->
      <!--      <ul>-->
      <!--        <li v-for="bearingCost in cost.bearingcostSet.edges" :key="bearingCost.node.id">-->
      <!--          {{ bearingCost.node.qty }} - {{ bearingCost.node.price }}-->
      <!--        </li>-->
      <!--      </ul>-->
      <!--    </div>-->
      <!--    <div v-if="cost.testcostSet.edges.length > 0">tests:-->
      <!--      <ul>-->
      <!--        <li v-for="testCost in cost.testcostSet.edges" :key="testCost.node.id">{{ testCost.node.qty }} - -->
      <!--          {{ testCost.node.price }}-->
      <!--        </li>-->
      <!--      </ul>-->
      <!--    </div>-->
      <!--    <div v-if="cost.certificatecostSet.edges.length > 0">certificates:-->
      <!--      <ul>-->
      <!--        <li v-for="certificateCost in cost.certificatecostSet.edges" :key="certificateCost.node.id">-->
      <!--          {{ certificateCost.node.qty }} - {{ certificateCost.node.price }}-->
      <!--        </li>-->
      <!--      </ul>-->
      <!--    </div>-->
      <ProjectCostTable/>
    </div>
  </div>
</template>

<style scoped>

</style>
