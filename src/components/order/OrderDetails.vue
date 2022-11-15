<script setup>
import {computed, ref, watch} from "vue";
const props = defineProps(['orderId'])
import {useQuery} from "@vue/apollo-composable";
import {getSpecsById} from '../../graphql/order/query/order.graphql';

function getSpecs(){
  const {result: specsByOrder, loading, errors} = useQuery(getSpecsById,
      () => ({
        orderId: props.orderId,
      }), {
        prefetch: false
      })
  console.log('specs: ', specsByOrder)
  return{specsByOrder, loading, errors}
}
const {specsByOrder, loading, errors} = getSpecs();
const specs = computed(() => specsByOrder.value?.getSpecsById.edges ?? [])
watch(
    () => props.orderId,
    () => {
      console.log("order id prop change")
      getSpecs()
    }
)

</script>

<template>
  <ul>
    <li v-for="spec in specs" :key="spec.node.id">{{spec.node.id}} - {{spec.node.kw}} - {{spec.node.voltage}}</li>
  </ul>
</template>

<style scoped>

</style>
