<script setup>
import {computed} from "vue";
const props = defineProps(['costId']);
import {useQuery} from "@vue/apollo-composable";
import {getProjectCostDetails} from "../../graphql/cost/query/cost.graphql";
const {result: costDetailsResult, loading, error} = useQuery(getProjectCostDetails,
    () => ({
      costId: props.costId
    }))
const costDetails = computed(() => costDetailsResult.value?.getProjectCostDetails ?? {})

function getValue(cost){
  return cost?cost:{qty:0, price:0}
}
</script>

<template>

  cost details:
  <div>
    <p>chNumber: {{costDetails.chNumber}}</p>
    <p>motorType: {{costDetails.motorType}}</p>
    <p>dateFa: {{costDetails.dateFa}}</p>
    <p>altitude: {{costDetails.altitude}}</p>
    <p>frame: {{costDetails.frame}}</p>
    <p>ambientTemp: {{costDetails.ambientTemp}}</p>
    <p>tempRise: {{costDetails.tempRise}}</p>
    <p>standardParts: {{costDetails.standardParts}}</p>
    <p>generalCost: {{costDetails.generalCost}}</p>
    <p v-if="costDetails.wagecost">wagecost: {{costDetails.wagecost.qty}} - {{costDetails.wagecost.price}}</p>
    <p v-if="costDetails.steelrebar">steelrebar: {{costDetails.steelrebar.qty}} - {{costDetails.steelrebar.price}}</p>
    <p v-if="costDetails.overheadcost">overheadcost: {{costDetails.overheadcost.qty}} - {{costDetails.overheadcost.price}}</p>
    <p v-if="costDetails.steel">steel: {{costDetails.steel.qty}} - {{costDetails.steel.price}}</p>
    <p v-if="costDetails.custator">custator: {{costDetails.custator.qty}} - {{costDetails.custator.price}}</p>
    <p v-if="costDetails.curotor">curotor: {{costDetails.curotor.qty}} - {{costDetails.curotor.price}}</p>
    <p v-if="costDetails.aluingot">aluingot: {{costDetails.aluingot.qty}} - {{costDetails.aluingot.price}}</p>
    <p v-if="costDetails.siliconsheet">siliconsheet: {{costDetails.siliconsheet.qty}} - {{costDetails.siliconsheet.price}}</p>
    <p v-if="costDetails.castiron">castiron: {{costDetails.castiron.qty}} - {{costDetails.castiron.price}}</p>
    <p v-if="costDetails.insulation">insulation: {{costDetails.insulation.qty}} - {{costDetails.insulation.price}}</p>
    <p v-if="costDetails.other">other: {{costDetails.other.qty}} - {{costDetails.other.price}}</p>
    <div v-if="costDetails.bearingcostSet.edges.length > 0">bearings:
      <ul>
        <li v-for="bearingCost in costDetails.bearingcostSet.edges" :key="bearingCost.node.id">{{bearingCost.node.qty}} - {{bearingCost.node.price}}</li>
      </ul>
    </div>
    <div v-if="costDetails.testcostSet.edges.length > 0">tests:
      <ul>
        <li v-for="testCost in costDetails.testcostSet.edges" :key="testCost.node.id">{{testCost.node.qty}} - {{testCost.node.price}}</li>
      </ul>
    </div>
    <div v-if="costDetails.certificatecostSet.edges.length > 0">certificates:
      <ul>
        <li v-for="certificateCost in costDetails.certificatecostSet.edges" :key="certificateCost.node.id">{{certificateCost.node.qty}} - {{certificateCost.node.price}}</li>
      </ul>
    </div>
  </div>

</template>

<style scoped>

</style>
