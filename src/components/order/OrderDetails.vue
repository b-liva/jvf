<script setup>
import {computed, watch} from "vue";
import {useQuery} from "@vue/apollo-composable";
import {getSpecsById} from '../../graphql/order/query/order.graphql';
import {useStore} from "../../store/store.js";
const store = useStore();

function getSpecs(){
  const {result: specsByOrder, loading, errors} = useQuery(getSpecsById,
      () => ({
        orderId: store.orderId,
      }), {
        prefetch: false
      })
  return{specsByOrder, loading, errors}
}
const {specsByOrder, loading, errors} = getSpecs();
const specs = computed(() => specsByOrder.value?.getSpecsById.edges ?? [])
watch(
    () => store.orderId,
    () => {
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
