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
    <p>wagecost: {{costDetails.wagecost.qty}} - {{costDetails.wagecost.price}}</p>
    <p>steelrebar: {{costDetails.steelrebar.qty}} - {{costDetails.steelrebar.price}}</p>
    <p>overheadcost: {{costDetails.overheadcost.qty}} - {{costDetails.overheadcost.price}}</p>
    <p>steel: {{costDetails.steel.qty}} - {{costDetails.steel.price}}</p>
    <p>custator: {{costDetails.custator.qty}} - {{costDetails.custator.price}}</p>
    <p>curotor: {{costDetails.curotor.qty}} - {{costDetails.curotor.price}}</p>
    <p>aluingot: {{costDetails.aluingot.qty}} - {{costDetails.aluingot.price}}</p>
    <p>siliconsheet: {{costDetails.siliconsheet.qty}} - {{costDetails.siliconsheet.price}}</p>
    <p>castiron: {{costDetails.castiron.qty}} - {{costDetails.castiron.price}}</p>
    <p>insulation: {{costDetails.insulation.qty}} - {{costDetails.insulation.price}}</p>
    <p>other: {{costDetails.other.qty}} - {{costDetails.other.price}}</p>
    <div>bearings:
      <ul>
        <li v-for="bearingCost in costDetails.bearingcostSet.edges" :key="bearingCost.node.id">{{bearingCost.node.qty}} - {{bearingCost.node.price}}</li>
      </ul>
    </div>
    <div>tests:
      <ul>
        <li v-for="testCost in costDetails.testcostSet.edges" :key="testCost.node.id">{{testCost.node.qty}} - {{testCost.node.price}}</li>
      </ul>
    </div>
    <div>certificates:
      <ul>
        <li v-for="certificateCost in costDetails.certificatecostSet.edges" :key="certificateCost.node.id">{{certificateCost.node.qty}} - {{certificateCost.node.price}}</li>
      </ul>
    </div>
  </div>

</template>

<style scoped>

</style>
