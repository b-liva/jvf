<script setup>

</script>

<template>
  <div class="grid grid-cols-5 h-full">
    <aside id="sidebar" class="col-span-1 h-full bg-gray-100" aria-label="Sidebar">
      <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200  pt-0">
        <div class="flex-1 flex flex-col overflow-y-auto">
          <div class="flex-1 px-3 divide-y space-y-1">
            <slot name="searchFilters"></slot>
          </div>
        </div>
      </div>
    </aside>
    <div id="main-content" class="col-span-4 h-full w-full bg-gray-100 relative overflow-y-auto">
      <main>
        <div class="grid grid-cols-1 gap-8 p-6 sm:grid-cols-5">
          <slot name="searchResults"></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>