<script setup>
import {reactive} from 'vue'
import {Button} from 'flowbite-vue'
const props = defineProps(['cost'])

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

const tests = reactive({
  title: 'test',
  name: 'تست',
  items: [{id: 1, value: 0, unit: 0}]
})

function getTotal() {
  let total = 0
  this.items.forEach(item => total += item.unit * item.value)
  this.bearings.items.forEach(item => total += item.unit * item.value)
  this.certificates.items.forEach(item => total += item.unit * item.value)
  this.tests.items.forEach(item => total += item.unit * item.value)
  return total
}

function AddNew(obj) {
  obj.push({id: 1, value: 0, unit: 0})
}

function Remove(itemList, index) {
  itemList.splice(index - 1, 1)
}
</script>

<template>
  <div class="">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="inline-flex">
        <button @click="AddNew(bearings.items)"
                class="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-r">
          بیرینگ
        </button>
        <button @click="AddNew(tests.items)" class="bg-green-600 hover:bg-green-800 text-white py-2 px-4">تست</button>
        <button @click="AddNew(certificates.items)"
                class="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-l">گواهی نامه
        </button>
      </div>
      <table class="table-auto">
        <thead>
        <tr>
          <th>عنوان</th>
          <th>مقدار</th>
          <th>قیمت واحد</th>
          <th>قیمت کل</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item, index) in items">
          <tr>
            <td>{{ item.name }}</td>
            <td><input type="number" v-model="item.value" :id="item.title"></td>
            <td><input type="number" v-model="item.unit"></td>
            <td>{{ item.value * item.unit }}</td>
          </tr>
        </template>
        <template v-for="(item, index) in bearings.items">
          <tr>
            <td>بیرینگ</td>
            <td><input type="number" v-model="item.value" :id="item.title"></td>
            <td><input type="number" v-model="item.unit"></td>
            <td>{{ item.value * item.unit }}</td>
            <td @click="Remove(bearings.items, index)">
              <span class="red p-3 text-lg">-</span>
            </td>
          </tr>
        </template>
        <template v-for="(item, index) in tests.items">
          <tr>
            <td>تست</td>
            <td><input type="number" v-model="item.value" :id="item.title"></td>
            <td><input type="number" v-model="item.unit"></td>
            <td>{{ item.value * item.unit }}</td>
            <td @click="Remove(tests.items, index)">
              <span class="red p-3 text-lg">-</span>
            </td>
          </tr>
        </template>
        <template v-for="(item, index) in certificates.items">
          <tr>
            <td>گواهی</td>
            <td><input type="number" v-model="item.value" :id="item.title"></td>
            <td><input type="number" v-model="item.unit"></td>
            <td>{{ item.value * item.unit }}</td>
            <td @click="Remove(certificates.items, index)">
              <span class="red p-3 text-lg">-</span>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
      <button>click</button>
      {{ getTotal() }}
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
