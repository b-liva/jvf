<script setup>
import {baseUrl} from "./utils/methods";
import {menuRoutes} from "./router/routes";
import TopMenu from "./components/menu/TopMenu.vue";

</script>

<template>
  <div class="">
    <TopMenu/>
<!--    <aside href="" class="fixed hidden z-20 h-full top-0 right-0 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"></aside>-->
    <div class="grid grid-cols-4">
      <aside id="sidebar" class="col-span-1" aria-label="Sidebar">
        <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div class="flex-1 flex flex-col overflow-y-auto">
            <div class="flex-1 px-3 bg-gray-100 divide-y space-y-1">
              search box
            </div>
          </div>
        </div>
      </aside>
      <div id="main-content" class="col-span-3 h-full w-full bg-gray-100 relative overflow-y-auto">
        <main>
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style >
@import url("./assets/index.css");
</style>