<script setup>
import List from "./List.vue";
import Filters from "./Filters.vue";
import {useOrderStore} from "../../store/store";
const orderStore = useOrderStore()

</script>

<template>
  <div class="">
    <Filters/>
    <List :orders="orderStore.orders"/>
  </div>
</template>

<style scoped>

</style>