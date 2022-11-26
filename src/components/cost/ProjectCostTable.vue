<script setup>
import {useStore} from "../../store/store.js";
import {ref} from 'vue';
import {useMutation, useQuery} from '@vue/apollo-composable'
import {Button} from 'flowbite-vue'

import mutateProjectCost from "../../graphql/cost/mutation/cost.graphql";
import getBearings from "../../graphql/cost/query/bearing.graphql";
import getTests from "../../graphql/cost/query/test.graphql";
import getCertificates from "../../graphql/cost/query/certificate.graphql";

const store = useStore();
const status = '';
const costItems = ref([
  {title: 'chNumber', name: 'شماره چارگون', inputType: 'number', title2: 'ch_number'},
  {title: 'motorType', name: 'نوع موتور', inputType: 'text', title2: 'motor_type'},
  {title: 'dateFa', name: 'تاریخ', inputType: 'text', title2: 'date_fa'},
  {title: 'altitude', name: 'ارتفاع', inputType: 'number', title2: 'altitude'},
  {title: 'frame', name: 'فریم سایز', inputType: 'number', title2: 'frame'},
  {title: 'ambientTemp', name: 'دمای محیط', inputType: 'number', title2: 'ambient_temp'},
  {title: 'tempRise', name: 'افزایش دما', inputType: 'number', title2: 'temp_rise'},
  {title: 'standardParts', name: 'قطعات استاندارد', inputType: 'number', title2: 'standard_parts'},
  {title: 'generalCost', name: 'هزینه های عمومی', inputType: 'number', title2: 'general_cost'},
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
let formError = ref([])
onDone(result => {
  formError.value = result.data.mutateProjectCost.errors;
})
onError(error => {
  console.log("err rror: ", error)
})
const {result: bearingList, loading: bearingLoading, error: bearingError} = useQuery(getBearings)
const {result: testList, loading: testLoading, error: testError} = useQuery(getTests)
const {result: certificateList, loading: certificateLoading, error: certificateError} = useQuery(getCertificates)
function sendProjectCost() {
  createProjectCost()
}

function logStore() {
  console.log("spec id: ", store)
}

function AddNew(obj, rowType) {
  let newObj = {
    "node": {
      "id": null,
      "qty": 1,
      "price": 0
    }
  }
  newObj[rowType] = {
    "id": null,
    "name": ''
  }
  obj.push(newObj)
}

function Remove(itemList, index) {
  itemList.splice(index, 1)
}
function getErrorFieldName(fName){
  return costItems.value.filter(item => item.title2 === fName)[0].name
}
</script>

<template>
  <div class="">
    <p @click="logStore">log store</p>
    <p @click="sendProjectCost">send</p>
    <p>{{ status }}</p>
    <p v-if="loading">loading</p>
    <div v-if="formError.length > 0">بروز خطا:
      <ul>
        <li v-for="er in formError">{{getErrorFieldName(er.field)}}
          <ul>
            <li v-for="msg in er.messages">{{msg}}</li>
          </ul>
        </li>
      </ul>
    </div>
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
      <div class="inline-flex">
        <button @click="AddNew(store.cost.bearingcostSet.edges, 'bearing')"
                class="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-r">
          بیرینگ
        </button>
        <button @click="AddNew(store.cost.testcostSet.edges, 'test')" class="bg-green-600 hover:bg-green-800 text-white py-2 px-4">تست</button>
        <button @click="AddNew(store.cost.certificatecostSet.edges, 'certificate')"
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
        <template v-for="(item, index) in rowItems">
          <tr>
            <td>{{ item.name }}</td>
            <td>
              <input type="number" v-model="store.cost[item.title]['qty']" :id="item.title">
            </td>
            <td>
              <input type="number" v-model="store.cost[item.title]['price']">
            </td>
            <td>{{ store.cost[item.title]['qty'] * store.cost[item.title]['price'] }}</td>
          </tr>
        </template>
        <template v-for="(bearing, index) in store.cost.bearingcostSet.edges" :key="bearing.node.id">
          <tr>
            <td>
              <select v-model="bearing.node.bearing">
                <option v-for="br in bearingList.getBearings.edges" :value="br.node" :key="br.node">{{br.node.name}}</option>
              </select>
            </td>
            <td><input type="number" v-model="bearing.node.qty"></td>
            <td><input type="number" v-model="bearing.node.price"></td>
            <td>{{ bearing.node.qty * bearing.node.price }}</td>
            <td @click="Remove(store.cost.bearingcostSet.edges, index)">
              <span class="red p-3 text-lg">-</span>
            </td>
          </tr>
        </template>
        <template v-for="(test, index) in store.cost.testcostSet.edges" :key="test.node.id">
          <tr>
            <td>
              <select v-model="test.node.test">
                <option v-for="tst in testList.getTests.edges" :value="tst.node" :key="tst.node">{{tst.node.name}}</option>
              </select>
            </td>
            <td><input type="number" v-model="test.node.qty"></td>
            <td><input type="number" v-model="test.node.price"></td>
            <td>{{ test.node.qty * test.node.price }}</td>
            <td @click="Remove(store.cost.testcostSet.edges, index)">
              <span class="red p-3 text-lg">-</span>
            </td>
          </tr>
        </template>
        <template v-for="(certificate, index) in store.cost.certificatecostSet.edges" :key="certificate.node.id">
          <tr>
            <td>
              <select v-model="certificate.node.certificate">
                <option v-for="crt in certificateList.getCertificates.edges" :value="crt.node" :key="crt.node">{{crt.node.name}}</option>
              </select>
            </td>
            <td><input type="number" v-model="certificate.node.qty"></td>
            <td><input type="number" v-model="certificate.node.price"></td>
            <td>{{ certificate.node.qty * certificate.node.price }}</td>
            <td @click="Remove(store.cost.certificatecostSet.edges, index)">
              <span class="red p-3 text-lg">-</span>
            </td>
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
