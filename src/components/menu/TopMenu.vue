<script setup>
import {baseUrl} from "../../utils/methods";
import {menuRoutes} from "../../router/routes";
import {computed} from "vue";
const menuCount = computed(() => menuRoutes.length < 9 ? 9 : menuRoutes.length)
</script>

<template>
  <div class="grid text-center py-4 shadow-xl" :class="`grid-cols-${menuCount}`">
    <RouterLink v-for="route in menuRoutes" :to="route.path" class="border-l py-2">
      <span class="text-gray-500">{{ route.props.title }}</span>
    </RouterLink>
    <a
        :href="baseUrl() + '/cdash'"
        class="text-gray-500 py-2 pl-2"
        :class="`col-start-${menuCount + 1}`">
      <span class="">پنل قدیمی</span>
    </a>
  </div>
</template>

<style scoped>

</style>