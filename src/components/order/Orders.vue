<script setup>
import List from "./List.vue";
import Filters from "./Filters.vue";
import {useOrderStore} from "../../store/store";
const orderStore = useOrderStore()

</script>

<template>
  <div class="grid grid-cols-4 gap-8 p-6">
    <Filters class="col-span-1 pt-12"/>
    <List :orders="orderStore.orders" class="col-span-3 pt-12"/>
  </div>
</template>

<style scoped>

</style>