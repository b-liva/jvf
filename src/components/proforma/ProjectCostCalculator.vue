<script setup>
import {reactive} from 'vue'

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
  {title: 'other', name: 'سایر', unit: 0, value: 0},
])

const bearings = reactive({
  title: 'bearing',
  name: 'بیرینگ',
  items: [{id: 1, value: 0, unit: 0}]
})

const certificates = reactive({
  title: 'certificate',
  name: 'گواهی',
  items: [{id: 1, value: 0, unit: 0}]
})

const test = reactive({
  title: 'test',
  name: 'تست',
  items: [{id: 1, value: 0, unit: 0}]
})

function getTotal() {
  let total = 0
  this.items.forEach(item => total += item.unit * item.value)
  this.bearings.items.forEach(item => total += item.unit * item.value)
  this.certificates.items.forEach(item => total += item.unit * item.value)
  this.test.items.forEach(item => total += item.unit * item.value)
  return total
}

</script>
<template>
  <div class=""><p class="text-yellow-900 text-3xl font-bold underline">inside pc calculator...</p>
    <div class="">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <table class="table-auto">
          <thead>
          <tr>
            <th>ردیف</th>
            <th>عنوان</th>
            <th>مقدار</th>
            <th>قیمت واحد</th>
            <th>قیمت کل</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(item, index) in items">
            <tr>
              <td>{{ ++index }}</td>
              <td>{{ item.name }}</td>
              <td><input type="number" v-model="item.value" :id="item.title"></td>
              <td><input type="number" v-model="item.unit"></td>
              <td>{{ item.value * item.unit }}</td>
            </tr>
          </template>
          <template v-for="(item, index) in bearings.items">
            <tr>
              <td>{{ ++index }}</td>
              <td>بیرینگ</td>
              <td><input type="number" v-model="item.value" :id="item.title"></td>
              <td><input type="number" v-model="item.unit"></td>
              <td>{{ item.value * item.unit }}</td>
            </tr>
          </template>
          <template v-for="(item, index) in test.items">
            <tr>
              <td>{{ ++index }}</td>
              <td>تست</td>
              <td><input type="number" v-model="item.value" :id="item.title"></td>
              <td><input type="number" v-model="item.unit"></td>
              <td>{{ item.value * item.unit }}</td>
            </tr>
          </template>
          <template v-for="(item, index) in certificates.items">
            <tr>
              <td>{{ ++index }}</td>
              <td>گواهی</td>
              <td><input type="number" v-model="item.value" :id="item.title"></td>
              <td><input type="number" v-model="item.unit"></td>
              <td>{{ item.value * item.unit }}</td>
            </tr>
          </template>
          </tbody>
        </table>
        <button>click</button>
        {{ getTotal() }}
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");

</style>
