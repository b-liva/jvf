<script setup>
import {ref, isRef} from "vue";
const props = defineProps(['costId']);
import {useQuery} from "@vue/apollo-composable";
import {getProjectCostDetails} from "../../graphql/cost/query/cost.graphql";
import ProjectCostTable from '../cost/ProjectCostTable.vue';


let cost = ref({
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
      costId: props.costId
    }))
onResult(qr => {
  window.qr = qr;
  cost.value = JSON.parse(JSON.stringify(qr.data.getProjectCostDetails));
  window.cost = cost;
})

const costItems = [
  "id",
  "chNumber",
  "motorType",
  "dateFa",
  "altitude",
  "frame",
  "ambientTemp",
  "tempRise",
  "standardPar",
  "generalCost",
]

function checkRef() {
  console.log(cost.value.wagecost, (isRef(cost.value)))
}

function logCost() {
  console.log(cost.value)
}
</script>

<template>

  <div v-if="cost">
    cost details:
    <p @click="checkRef">check ref</p>
    <div>
      <p @click="refetchCost">get cost</p>
      <p @click="logCost">log cost</p>
      <div><input v-model="cost.chNumber">
        <p>{{ cost.chNumber }}</p></div>
      <div><input v-model="cost.motorType"></div>
      <div><input v-model="cost.dateFa"></div>
      <div><input v-model="cost.altitude"></div>
      <div><input v-model="cost.frame"></div>
      <div><input v-model="cost.ambientTemp"></div>
      <div><input v-model="cost.tempRise"></div>
      <div><input v-model="cost.standardParts"></div>
      <div><input v-model="cost.generalCost"></div>
      <div>
        <input v-model="cost.wagecost.qty">
        <input v-model="cost.wagecost.price">
        <input v-model="cost.wagecost.__typename">
      </div>
      <div>
        <input v-model="cost.steelrebar.qty">
        <input v-model="cost.steelrebar.price">
      </div>
      <!--    <p>somenew: {{ cost.somenew.qty }} - {{ cost.somenew.price }}</p>-->
      <p v-if="cost.wagecost">wagecost: {{ cost.wagecost.qty }} - {{ cost.wagecost.price }}</p>
      <p v-if="cost.steelrebar">steelrebar: {{ cost.steelrebar.qty }} -
        {{ cost.steelrebar.price }}</p>
      <p v-if="cost.overheadcost">overheadcost: {{ cost.overheadcost.qty }} -
        {{ cost.overheadcost.price }}</p>
      <p v-if="cost.steel">steel: {{ cost.steel.qty }} - {{ cost.steel.price }}</p>
      <p v-if="cost.custator">custator: {{ cost.custator.qty }} - {{ cost.custator.price }}</p>
      <p v-if="cost.curotor">curotor: {{ cost.curotor.qty }} - {{ cost.curotor.price }}</p>
      <p v-if="cost.aluingot">aluingot: {{ cost.aluingot.qty }} - {{ cost.aluingot.price }}</p>
      <p v-if="cost.siliconsheet">siliconsheet: {{ cost.siliconsheet.qty }} -
        {{ cost.siliconsheet.price }}</p>
      <p v-if="cost.castiron">castiron: {{ cost.castiron.qty }} - {{ cost.castiron.price }}</p>
      <p v-if="cost.insulation">insulation: {{ cost.insulation.qty }} -
        {{ cost.insulation.price }}</p>
      <p v-if="cost.other">other: {{ cost.other.qty }} - {{ cost.other.price }}</p>

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
      <ProjectCostTable :cost="cost"/>
    </div>
  </div>
</template>

<style scoped>

</style>
