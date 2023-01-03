<script setup>
import TopMenu from "./components/menu/TopMenu.vue";

</script>

<template>
  <div class="">
    <TopMenu/>
    <!--    <aside href="" class="fixed hidden z-20 h-full top-0 right-0 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"></aside>-->
    <RouterView/>
  </div>
</template>

<style>
@import url("./assets/index.css");
</style>