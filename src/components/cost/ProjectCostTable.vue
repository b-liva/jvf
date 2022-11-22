<script setup>
import {ref} from 'vue';
import {useMutation} from '@vue/apollo-composable'
import {Button} from 'flowbite-vue'

const props = defineProps(['cost']);
import mutateProjectCost from "../../graphql/cost/mutation/cost.graphql";
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
console.log('cost: ', props.cost)

const {mutate: createProjectCost, loading, error, onError, onDone} = useMutation(mutateProjectCost,
    () => ({
      variables: {
        id: cost.value.id,
        spec: cost.value.spec.id,
        chNumber: cost.value.chNumber,
        motorType: cost.value.motorType,
        standardParts: cost.value.standardParts,
        generalCost: cost.value.generalCost,
        dateFa: cost.value.dateFa,
        frame: cost.value.frame,
        ambientTemp: cost.value.ambientTemp,
        tempRise: cost.value.tempRise,
        altitude: cost.value.altitude,
      }
    })
)
</script>

<template>
  <div class="">
    <p @click="createProjectCost">send</p>
    <p>{{ status }}</p>
    <p v-if="loading">loading</p>
    <div>{{error}}</div>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {{cost.id}}
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
            <td><input v-model="cost[item.title]" type="text"></td>
          </tr>
        </template>
        </tbody>
      </table>
      <button>click</button>
      <p>{{ cost }}</p>
      <!--      {{ getTotal() }}-->
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
