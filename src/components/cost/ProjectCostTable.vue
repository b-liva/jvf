<script setup>
import {useStore} from "../../store/store.js";
import {ref} from 'vue';
import {useMutation} from '@vue/apollo-composable'
import {Button} from 'flowbite-vue'

import mutateProjectCost from "../../graphql/cost/mutation/cost.graphql";
const store = useStore();
const status = '';
const costItems = ref([
  {title: 'chNumber', name: 'شماره چارگون', inputType: 'number'},
  {title: 'motorType', name: 'نوع موتور', inputType: 'text'},
  {title: 'dateFa', name: 'تاریخ', inputType: 'text'},
  {title: 'altitude', name: 'ارتفاع', inputType: 'number'},
  {title: 'frame', name: 'فریم سایز', inputType: 'number'},
  {title: 'ambientTemp', name: 'دمای محیط', inputType: 'number'},
  {title: 'tempRise', name: 'افزایش دما', inputType: 'number'},
  {title: 'standardParts', name: 'قطعات استاندارد', inputType: 'number'},
  {title: 'generalCost', name: 'هزینه های عمومی', inputType: 'number'},
])
Window.costItem = costItems;
const rowItems = ref([
  {title: 'wagecost', name: 'دستمزد', unit: 0, value: 0},
  {title: 'overheadcost', name: 'سربار', unit: 0, value: 0},
  {title: 'steel', name: 'فولاد', unit: 0, value: 0},
  {title: 'steelrebar', name: 'میلگرد فولادی', unit: 0, value: 0},
  {title: 'custator', name: 'مس استاتور', unit: 0, value: 0},
  {title: 'curotor', name: 'مس روتور', unit: 0, value: 0},
  {title: 'siliconsheet', name: 'ورق سیلیکون', unit: 0, value: 0},
  {title: 'aluingot', name: 'آلومینیوم', unit: 0, value: 0},
  {title: 'insulation', name: 'مواد عایقی', unit: 0, value: 0},
  {title: 'castiron', name: 'چدن', unit: 0, value: 0},
  {title: 'other', name: 'سایر', unit: 0, value: 0},
])

const bearings = ref({
  title: 'bearing',
  name: 'بیرینگ',
  items: [{id: 1, value: 0, unit: 0}]
})

const certificates = ref({
  title: 'certificate',
  name: 'گواهی',
  items: [{id: 1, value: 0, unit: 0}]
})

const tests = ref({
  title: 'test',
  name: 'تست',
  items: [{id: 1, value: 0, unit: 0}]
})

const {mutate: createProjectCost, loading, error, onError, onDone} = useMutation(mutateProjectCost,
    () => ({
      variables: {
        id: store.cost.id,
        spec: store.proformaSpecId,
        chNumber: store.cost.chNumber,
        motorType: store.cost.motorType,
        standardParts: store.cost.standardParts,
        generalCost: store.cost.generalCost,
        dateFa: store.cost.dateFa,
        frame: store.cost.frame,
        ambientTemp: store.cost.ambientTemp,
        tempRise: store.cost.tempRise,
        altitude: store.cost.altitude,
      }
    })
)
function sendProjectCost(){
  createProjectCost()
}
function logStore(){
  console.log("spec id: ", store)
}

</script>

<template>
  <div class="">
    <p @click="logStore">log</p>
    <p @click="sendProjectCost">send</p>
    <p>{{ status }}</p>
    <p v-if="loading">loading</p>
    <div>{{error}}</div>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <table class="table-auto">
        <thead>
        <tr>
          <th>عنوان</th>
          <th>مقدار</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in costItems" :key="item.id">
          <tr>
            <td>{{ item.name }}</td>
            <td><input v-model="store.cost[item.title]" type="text"></td>
          </tr>
        </template>
        </tbody>
      </table>
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
        <template v-for="(item, index) in rowItems">
          <tr>
            <td>{{ item.title }}</td>
            <td>
              <input type="number" v-model="store.cost[item.title]['qty']" :id="item.title">
            </td>
            <td>
              <input type="number" v-model="store.cost[item.title]['price']">
            </td>
            <td>{{ store.cost[item.title]['qty'] * store.cost[item.title]['price'] }}</td>
          </tr>
        </template>
        </tbody>
      </table>
      <!--      {{ getTotal() }}-->
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
