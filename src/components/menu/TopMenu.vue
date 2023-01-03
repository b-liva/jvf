<script setup>
import {baseUrl} from "../../utils/methods";
import {menuRoutes} from "../../router/routes";
import {computed} from "vue";
const menuCount = computed(() => menuRoutes.length < 6 ? 6 : menuRoutes.length)
console.log(menuCount)
</script>

<template>
  <div class="grid text-center" :class="`grid-cols-${menuCount}`">
    <RouterLink v-for="route in menuRoutes" :to="route.path">
      <span class="">{{ route.props.title }}</span>
    </RouterLink>
    <a :href="baseUrl() + '/cdash'" :class="`col-start-${menuCount + 1}`">
      <span class="">پنل قدیمی</span>
    </a>
  </div>
</template>

<style scoped>

</style>