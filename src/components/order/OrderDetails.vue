<script setup>
import {computed, watch} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import {getSpecsById} from '../../graphql/order/query/order.graphql';
import {useStore} from "../../store/store.js";

const store = useStore();

const {result: specsByOrder, loading, errors, load} = useLazyQuery(getSpecsById,
    () => ({
      orderId: store.orderId,
    }))

const specs = computed(() => specsByOrder.value?.getSpecsById.edges ?? [])
watch(
    () => store.orderId,
    () => {
      load()
    }
)

</script>

<template>
  <ul>
    <li v-for="spec in specs" :key="spec.node.id">{{ spec.node.id }} - {{ spec.node.kw }} - {{ spec.node.voltage }}</li>
  </ul>
</template>

<style scoped>

</style>
