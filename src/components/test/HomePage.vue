<script setup>
import {exportToSpreadsheet} from "./test";

const newData = [
    [1,'مقدار جدید',3],
    [4,5,6],
]

</script>

<template>
<div class="grid grid-cols-3">
  <div class="col-start-2 text-center p-6 ">
    <p>Soon...</p>
    <p class="cursor-pointer" @click="exportToSpreadsheet(newData, 'test')">download</p>
  </div>
</div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>

</style>