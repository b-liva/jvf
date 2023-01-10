<script setup>
import TimeLineList from "../list/TimeLineList.vue";
import {useBaseTimeLineData} from "../../data/base";

const timeLineData = useBaseTimeLineData();

</script>

<template>
  <TimeLineList v-for="tld in timeLineData" v-bind="tld" page-name="order" class="my-2"/>
</template>

<style scoped>

</style>