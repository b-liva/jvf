<script setup>
import TimeLineList from "../list/TimeLineList.vue";
import {useBaseTimeLineData} from "../../data/base";
import {useRoute} from "vue-router";

const route = useRoute();
console.log(route.name, route.params.id)

const timeLineData = useBaseTimeLineData();

</script>

<template>
  <TimeLineList v-for="tld in timeLineData" v-bind="tld" page-name="order" class="my-2"/>
</template>

<style scoped>

</style>