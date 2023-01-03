<script setup>
import {baseUrl} from "./utils/methods";
import {menuRoutes} from "./router/routes";

</script>

<template>
  <div class="">
    <div class="">header</div>
<!--    <aside href="" class="fixed hidden z-20 h-full top-0 right-0 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"></aside>-->
    <div class="grid grid-cols-4">
      <aside id="sidebar" class="col-span-1" aria-label="Sidebar">
        <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div class="flex-1 flex flex-col overflow-y-auto">
            <div class="flex-1 px-3 bg-gray-100 divide-y space-y-1">
              <ul class="space-y-2 pb-2">
                <RouterLink v-for="route in menuRoutes" :to="route.path">
                  <li>
                    <a href="#"
                       class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                      <svg class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                           fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                              clip-rule="evenodd"></path>
                      </svg>
                      <span class="ml-3 flex-1 whitespace-nowrap">{{route.props.title}}</span>
                    </a>
                  </li>
                </RouterLink>
                <li>
                  <a :href="baseUrl() + '/cdash'"
                     class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <svg class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                            d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="ml-3 flex-1 whitespace-nowrap">پنل قدیمی</span>
                  </a>
                </li>
              </ul>
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