<script setup>
import {useStore} from "../../store/store.js";
import {ref, watch} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import {computed} from "vue";
import {getCostsBySpec} from "../../graphql/cost/query/cost.graphql";
import CostDetails from "./CostDetails.vue";

const store = useStore();
const {result: costList, loading, error, load} = useLazyQuery(getCostsBySpec,
    () => ({
      specId: store.proformaSpecId
    }))
const costs = computed(() => costList.value?.getCostsBySpec.edges ?? [])
watch(
    () => store.proformaSpecId,
    () => load(),
    {deep: true}
)
</script>

<template>
  <div>project cost list for: {{ store.proformaSpecId }}</div>
  <h2>بهای تمام شده</h2>
  <p v-if="loading">loading</p>
  <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
    <div
        v-for="cost in costs" :key="cost.node.id" @click="store.costId = cost.node.id"
        class="flex flex-col pb-3">
      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{{cost.node.chNumber}}</dt>
      <dd class="text-lg font-semibold">{{cost.node.dateFa}}</dd>
    </div>
  </dl>

</template>

<style scoped>

</style>
