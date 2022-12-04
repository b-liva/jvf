<script setup>
import {useStore} from "../../store/store.js";
import {ref} from 'vue';
import {useMutation, useQuery} from '@vue/apollo-composable'
import {Button} from 'flowbite-vue'

import mutateProjectCost from "../../graphql/cost/mutation/cost.graphql";
import mutateRowCost from "../../graphql/cost/mutation/row.graphql";
import mutateRowCostSet from "../../graphql/cost/mutation/cost_set.graphql";
import mutateDependentCosts from "../../graphql/cost/mutation/dependent_cost.graphql";
import deleteGqlObject from "../../graphql/core/mutations/delete.graphql";
import getBearings from "../../graphql/cost/query/bearing.graphql";
import getTests from "../../graphql/cost/query/test.graphql";
import getCertificates from "../../graphql/cost/query/certificate.graphql";

const store = useStore();
const status = '';
const editMode = ref(false);
const costItems = ref([
  {title: 'chNumber', name: 'شماره چارگون', inputType: 'number', title2: 'ch_number'},
  {title: 'motorType', name: 'نوع موتور', inputType: 'text', title2: 'motor_type'},
  {title: 'dateFa', name: 'تاریخ', inputType: 'text', title2: 'date_fa'},
  {title: 'altitude', name: 'ارتفاع', inputType: 'number', title2: 'altitude'},
  {title: 'frame', name: 'فریم سایز', inputType: 'number', title2: 'frame'},
  {title: 'ambientTemp', name: 'دمای محیط', inputType: 'number', title2: 'ambient_temp'},
  {title: 'tempRise', name: 'افزایش دما', inputType: 'number', title2: 'temp_rise'},
])
Window.costItem = costItems;
const dependentCosts = ref([
  {title: 'standardparts', name: 'قطعات استاندارد', unit: 0, value: 0, title2: 'standard_parts', fn: getMaterialCost},
  {title: 'generalcost', name: 'هزینه های عمومی', unit: 0, value: 0, title2: 'general_cost', fn: getWageOverheadCost},
])

const rowItems = ref([
  {
    title: 'wagecost',
    name: 'دستمزد',
    unit: 0,
    value: 0,
    title2: 'wage_cost',
    fn: getWageOverheadCost,
    type: 'wage_overhead'
  },
  {
    title: 'overheadcost',
    name: 'سربار',
    unit: 0,
    value: 0,
    title2: 'overhead_cost',
    fn: getWageOverheadCost,
    type: 'wage_overhead'
  },
  {title: 'steel', name: 'فولاد', unit: 0, value: 0, title2: 'steel', fn: getMaterialCost, type: 'material'},
  {
    title: 'steelrebar',
    name: 'میلگرد فولادی',
    unit: 0,
    value: 0,
    title2: 'steel_rebar',
    fn: getMaterialCost,
    type: 'material'
  },
  {
    title: 'custator',
    name: 'مس استاتور',
    unit: 0,
    value: 0,
    title2: 'cu_stator',
    fn: getMaterialCost,
    type: 'material'
  },
  {title: 'curotor', name: 'مس روتور', unit: 0, value: 0, title2: 'cu_rotor', fn: getMaterialCost, type: 'material'},
  {
    title: 'siliconsheet',
    name: 'ورق سیلیکون',
    unit: 0,
    value: 0,
    title2: 'silicon_sheet',
    fn: getMaterialCost,
    type: 'material'
  },
  {title: 'aluingot', name: 'آلومینیوم', unit: 0, value: 0, title2: 'alu_ingot', fn: getMaterialCost, type: 'material'},
  {
    title: 'insulation',
    name: 'مواد عایقی',
    unit: 0,
    value: 0,
    title2: 'insulation',
    fn: getMaterialCost,
    type: 'material'
  },
  {title: 'castiron', name: 'چدن', unit: 0, value: 0, title2: 'cast_iron', fn: getMaterialCost, type: 'material'},
  {title: 'other', name: 'سایر', unit: 0, value: 0, title2: 'ch_number', fn: getMaterialCost, type: 'excluded'},
])

const {mutate: createProjectCost, loading, error, onDone} = useMutation(mutateProjectCost,
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

const {
  mutate: deleteObject,
  loading: deleteLoading,
  error: deleteError,
  onDone: deleteOnDone
} = useMutation(deleteGqlObject)
const {
  mutate: createDependentCosts,
  loading: dependentCostLoading,
  error: dependentCostError,
  onDone: dependentCostOnDone
} = useMutation(
    mutateDependentCosts, () => ({
      variables: {
        projectCost: store.cost.id,
        spId: store.cost.standardparts.id,
        spPercent: store.cost.standardparts.percent,
        spAmount: store.cost.standardparts.amount,
        gcId: store.cost.generalcost.id,
        gcPercent: store.cost.generalcost.percent,
        gcAmount: store.cost.generalcost.amount
      }
    }))

const {mutate: createRowCostSet, loading: brcLoading, onDone: brcOnDone} = useMutation(mutateRowCostSet,
    () => ({
      variables: {
        bearingCost: store.cost.bearingcostSet.edges.map(brc => {
          console.log('brc', brc)
          const rvalue = {
            id: brc.node.id,
            qty: brc.node.qty,
            price: brc.node.price,
            projectCost: store.costId,
            bearing: brc.node.bearing.id
          }
          return rvalue
        }),
        testCost: store.cost.testcostSet.edges.map(tst => {
          const rvalue = {
            id: tst.node.id,
            qty: tst.node.qty,
            price: tst.node.price,
            projectCost: store.costId,
            test: tst.node.test.id
          }
          return rvalue
        }),
        certificateCost: store.cost.certificatecostSet.edges.map(crt => {
          const rvalue = {
            id: crt.node.id,
            qty: crt.node.qty,
            price: crt.node.price,
            projectCost: store.costId,
            certificate: crt.node.certificate.id
          }
          return rvalue
        }),
      }
    })
)

const {mutate: createRowCost, loading: rowCostLoading, onDone: rowCostOnDone} = useMutation(mutateRowCost,
    () => ({
      variables: {
        projectCost: store.cost.id,
        wage_id: store.cost.wagecost.id,
        wage_qty: getOrSetToNew(store.cost.wagecost.qty, 0),
        wage_price: getOrSetToNew(store.cost.wagecost.price, 0),
        overhead_id: store.cost.overheadcost.id,
        overhead_qty: getOrSetToNew(store.cost.overheadcost.qty, 0),
        overhead_price: getOrSetToNew(store.cost.overheadcost.price, 0),
        steel_rebar_id: store.cost.steelrebar.id,
        steel_rebar_qty: getOrSetToNew(store.cost.steelrebar.qty, 0),
        steel_rebar_price: getOrSetToNew(store.cost.steelrebar.price, 0),
        steel_id: store.cost.steel.id,
        steel_qty: getOrSetToNew(store.cost.steel.qty, 0),
        steel_price: getOrSetToNew(store.cost.steel.price, 0),
        cu_stator_id: store.cost.custator.id,
        cu_stator_qty: getOrSetToNew(store.cost.custator.qty, 0),
        cu_stator_price: getOrSetToNew(store.cost.custator.price, 0),
        cu_rotor_id: store.cost.curotor.id,
        cu_rotor_qty: getOrSetToNew(store.cost.curotor.qty, 0),
        cu_rotor_price: getOrSetToNew(store.cost.curotor.price, 0),
        alu_id: store.cost.aluingot.id,
        alu_qty: getOrSetToNew(store.cost.aluingot.qty, 0),
        alu_price: getOrSetToNew(store.cost.aluingot.price, 0),
        silicon_id: store.cost.siliconsheet.id,
        silicon_qty: getOrSetToNew(store.cost.siliconsheet.qty, 0),
        silicon_price: getOrSetToNew(store.cost.siliconsheet.price, 0),
        cast_id: store.cost.castiron.id,
        cast_qty: getOrSetToNew(store.cost.castiron.qty, 0),
        cast_price: getOrSetToNew(store.cost.castiron.price, 0),
        insulation_id: store.cost.insulation.id,
        insulation_qty: getOrSetToNew(store.cost.insulation.qty, 0),
        insulation_price: getOrSetToNew(store.cost.insulation.price, 0),
        other_id: store.cost.other.id,
        other_qty: getOrSetToNew(store.cost.other.qty, 0),
        other_price: getOrSetToNew(store.cost.other.price, 0),
      }
    })
)

let formError = ref([])
onDone(result => {
  formError.value = formError.value.concat(result.data.mutateProjectCost.errors);
})
rowCostOnDone(result => {
  formError.value = formError.value.concat(result.data.mutateOverheadCost.errors);
  formError.value = formError.value.concat(result.data.mutateWageCost.errors);
  formError.value = formError.value.concat(result.data.mutateSteelRebarCost.errors);
  formError.value = formError.value.concat(result.data.mutateSteelCost.errors);
  formError.value = formError.value.concat(result.data.mutateCuStatorCost.errors);
  formError.value = formError.value.concat(result.data.mutateCuRotorCost.errors);
  formError.value = formError.value.concat(result.data.mutateAluIngotCost.errors);
  formError.value = formError.value.concat(result.data.mutateSiliconSheetCost.errors);
  formError.value = formError.value.concat(result.data.mutateCastIronCost.errors);
  formError.value = formError.value.concat(result.data.mutateInsulationCost.errors);
  formError.value = formError.value.concat(result.data.mutateOtherCost.errors);
})

const {result: bearingList, loading: bearingLoading, error: bearingError} = useQuery(getBearings)
const {result: testList, loading: testLoading, error: testError} = useQuery(getTests)
const {result: certificateList, loading: certificateLoading, error: certificateError} = useQuery(getCertificates)

function sendProjectCost() {
  formError.value = []
  // createProjectCost();
  createDependentCosts()
  // createRowCost();
  createRowCostSet();
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

function Remove(itemList, index, objId) {
  deleteObject({
    objectId: objId
  })
  itemList.splice(index, 1)
}

function getErrorFieldName(fName) {
  const items = costItems.value.concat(rowItems.value)
  return items.filter(item => item.title2 === fName)[0].name
}

function getOrSetToNew(value, newValue) {
  return value ? value : newValue
}

function getBaseMaterialCost(materialCost, type) {
  let baseList = rowItems.value;
  if (type !== null) {
    baseList = baseList.filter(i => i.type === type);
  }
  baseList.forEach(item => {
    const costItem = store.cost[item.title]
    materialCost += costItem.qty * costItem.price
  })
  return materialCost;
}

function getMaterialCost() {
  let materialCost = getBearingCosts();
  materialCost = getBaseMaterialCost(materialCost, 'material');
  store.cost['standardparts']['amount'] = store.cost['standardparts']['percent'] * materialCost / 100;
}

function getStandardPartsCost() {
  return store.cost['standardparts']['amount']
}


function getWageOverheadCost() {
  let value = 0;
  value = getBaseMaterialCost(value, 'wage_overhead')
  store.cost['generalcost']['amount'] = store.cost['generalcost']['percent'] * value / 100;
}

function getGeneralCost() {
  return store.cost['generalcost']['amount']
}

function getRowItemsCost(rowItemList) {
  let bearingCostValue = 0;
  rowItemList.forEach(item => {
    bearingCostValue += item.node.qty * item.node.price;
  })
  return bearingCostValue
}

function getBearingCosts() {
  return getRowItemsCost(store.cost.bearingcostSet.edges);
}

function getTestCosts() {
  return getRowItemsCost(store.cost.testcostSet.edges);
}

function getCertificateCosts() {
  return getRowItemsCost(store.cost.certificatecostSet.edges);
}

function getTotalCost() {
  let value = 0;
  value = getBaseMaterialCost(value, null);
  value += getBearingCosts();
  value += getTestCosts();
  value += getCertificateCosts();
  value += getStandardPartsCost();
  value += getGeneralCost();
  return value
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
        <li v-for="er in formError">{{ getErrorFieldName(er.field) }}
          <ul>
            <li v-for="msg in er.messages">{{ msg }}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

      <div>
        <label for="editMode">ویرایش</label>
        <input id="editMode" type="checkbox" v-model="editMode">
      </div>
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
            <td><input
                :disabled="!editMode"
                v-model="store.cost[item.title]"
                v-on:keyup=""
                type="text"></td>
          </tr>
        </template>
        </tbody>
      </table>
      <div class="inline-flex">
        <button @click="AddNew(store.cost.bearingcostSet.edges, 'bearing')"
                class="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-r">
          بیرینگ
        </button>
        <button @click="AddNew(store.cost.testcostSet.edges, 'test')"
                class="bg-green-600 hover:bg-green-800 text-white py-2 px-4">تست
        </button>
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
              <input
                  type="number"
                  :disabled="!editMode"
                  v-model="store.cost[item.title]['qty']"
                  :id="item.title"
                  v-on:keyup="item.fn"
              >
            </td>
            <td>
              <input
                  type="number"
                  :disabled="!editMode"
                  v-model="store.cost[item.title]['price']"
                  v-on:keyup="item.fn"
              >
            </td>
            <td>{{ store.cost[item.title]['qty'] * store.cost[item.title]['price'] }}</td>
          </tr>
        </template>
        <template v-for="(bearing, index) in store.cost.bearingcostSet.edges" :key="bearing.node.id">
          <tr>
            <td>
              <select :disabled="!editMode" v-model="bearing.node.bearing">
                <option v-for="br in bearingList.getBearings.edges" :value="br.node" :key="br.node">{{ br.node.name }}
                </option>
              </select>
            </td>
            <td><input
                type="number"
                :disabled="!editMode"
                v-model="bearing.node.qty"
                v-on:keyup="getMaterialCost"
            ></td>
            <td><input
                type="number"
                :disabled="!editMode"
                v-model="bearing.node.price"
                v-on:keyup="getMaterialCost"
            ></td>
            <td>{{ bearing.node.qty * bearing.node.price }}</td>
            <td @click="Remove(store.cost.bearingcostSet.edges, index, bearing.node.id)">
              <span class="red p-3 text-lg">-</span>
            </td>
          </tr>
        </template>
        <template v-for="(test, index) in store.cost.testcostSet.edges" :key="test.node.id">
          <tr>
            <td>
              <select :disabled="!editMode" v-model="test.node.test">
                <option v-for="tst in testList.getTests.edges" :value="tst.node" :key="tst.node">{{ tst.node.name }}
                </option>
              </select>
            </td>
            <td><input type="number" :disabled="!editMode" v-model="test.node.qty"></td>
            <td><input type="number" :disabled="!editMode" v-model="test.node.price"></td>
            <td>{{ test.node.qty * test.node.price }}</td>
            <td @click="Remove(store.cost.testcostSet.edges, index, test.node.id)">
              <span class="red p-3 text-lg">-</span>
            </td>
          </tr>
        </template>
        <template v-for="(certificate, index) in store.cost.certificatecostSet.edges" :key="certificate.node.id">
          <tr>
            <td>
              <select :disabled="!editMode" v-model="certificate.node.certificate">
                <option v-for="crt in certificateList.getCertificates.edges" :value="crt.node" :key="crt.node">
                  {{ crt.node.name }}
                </option>
              </select>
            </td>
            <td><input type="number" :disabled="!editMode" v-model="certificate.node.qty"></td>
            <td><input type="number" :disabled="!editMode" v-model="certificate.node.price"></td>
            <td>{{ certificate.node.qty * certificate.node.price }}</td>
            <td @click="Remove(store.cost.certificatecostSet.edges, index, certificate.node.id)">
              <span class="red p-3 text-lg">-</span>
            </td>
          </tr>
        </template>
        <template v-for="item in dependentCosts" :key="item.id">
          <tr>
            <td>{{ item.name }}</td>
            <td><input
                :disabled="!editMode"
                v-model="store.cost[item.title]['percent']"
                v-on:keyup="item.fn"
                type="text"></td>
            <td><input
                :disabled="!editMode"
                v-model="store.cost[item.title]['amount']"
                type="text"
            ></td>
            <td>{{ store.cost[item.title]['amount'] }}</td>
          </tr>
        </template>
        <tr>
          <td colspan="3">جمع</td>
          <td>{{ getTotalCost() }}</td>
        </tr>
        </tbody>
      </table>
      <!--      {{ getTotal() }}-->
      <p @click="getMaterialCost">get material cost</p>
      <p @click="getWageOverheadCost">get wo cost</p>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
