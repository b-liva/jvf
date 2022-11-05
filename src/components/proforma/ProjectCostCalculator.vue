<script setup>
import { reactive } from 'vue'
const items = reactive([
  {title: 'pph', name: 'دستمزد', unit: 0, value: 0},
  {title: 'overhead', name: 'سربار', unit: 0, value: 0},
  {title: 'steel', name: 'فولاد', unit: 0, value: 0},
  {title: 'steelRebar', name: 'میلگرد فولادی', unit: 0, value: 0},
  {title: 'statorCu', name: 'مس استاتور', unit: 0, value: 0},
  {title: 'steel', name: 'مس روتور', unit: 0, value: 0},
  {title: 'rotorCu', name: 'ورق سیلیکون', unit: 0, value: 0},
  {title: 'alu', name: 'آلومینیوم', unit: 0, value: 0},
  {title: 'insulation', name: 'مواد عایقی', unit: 0, value: 0},
  {title: 'castIron', name: 'چدن', unit: 0, value: 0},
])

function getTotal() {
  let total = 0
  this.items.forEach(item => total += item.unit * item.value)
  return total
}
</script>
<template>
  <div class="text-3xl font-bold underline">inside pc calculator...
    <div class="columns-6">
      <form>
        <template v-for="item in items">
          <div class="">
            <input type="number" v-model="item.value" :placeholder="item.name">
            <input type="number" v-model="item.unit" placeholder="قیمت واحد">
            <input type="number" disabled :value="item.value * item.unit">
          </div>
        </template>

        <button>click</button>
        {{ getTotal() }}
      </form>
    </div>
    <div class="columns-4">
      <table>
        <thead>
        <tr>ردیف</tr>
        <tr>عنوان</tr>
        <tr>واحد</tr>
        <tr>مقدار</tr>
        <tr>کل</tr>
        </thead>
        <tbody>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style scoped>

</style>
