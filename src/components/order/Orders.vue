<script setup>
import List from "./List.vue";
import Filters from "./Filters.vue";
import {useOrderStore} from "../../store/store";
import SearchPage from "../../layout/SearchPage.vue";

const orderStore = useOrderStore()

</script>

<template>
    <SearchPage>
      <template v-slot:searchFilters>
        <Filters class="col-span-1 pt-12"/>
      </template>
      <template v-slot:searchResults>
        <List :orders="orderStore.orders" class="col-span-4 pt-12"/>
      </template>
    </SearchPage>
</template>

<style scoped>

</style>