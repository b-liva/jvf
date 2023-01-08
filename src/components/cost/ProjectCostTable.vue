<script setup>
import {useStore} from "../../store/store.js";
import Cost from "../../utils/cost.js";
import {ref} from 'vue';
import {useMutation, useQuery} from '@vue/apollo-composable'
import {Button} from 'flowbite-vue'
import JNumber from "../../utils/number.js";
import {Money3} from "v-money3";
import {vMoneyConfig} from "../../utils/vue/config.js";
import {mutateProjectCost} from "../../graphql/cost/mutation/cost.graphql";
import {mutateRowCost} from "../../graphql/cost/mutation/row.graphql";
import {mutateRowCostSet} from "../../graphql/cost/mutation/cost_set.graphql";
import {mutateDependentCosts} from "../../graphql/cost/mutation/dependent_cost.graphql";
import {deleteGqlObject} from "../../graphql/core/mutations/delete.graphql";
import {getBearings} from "../../graphql/cost/query/bearing.graphql";
import {getTests} from "../../graphql/cost/query/test.graphql";
import {getCertificates} from "../../graphql/cost/query/certificate.graphql";
import {exportToSpreadsheet} from "../../utils/excel/xlsx";

const store = useStore();
const status = '';
const costItems = ref([
  {title: 'chNumber', name: 'شماره چارگون', inputType: 'number', title2: 'ch_number'},
  {title: 'dateFa', name: 'تاریخ', inputType: 'text', title2: 'date_fa'},
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
    type: ''
  },
  {
    title: 'steelrebar',
    name: 'میلگرد فولادی',
    unit: 0,
    value: 0,
    title2: 'steel_rebar',
    fn: getMaterialCost,
    type: 'material'
  },
  {title: 'steel', name: 'فولاد', unit: 0, value: 0, title2: 'steel', fn: getMaterialCost, type: 'material'},
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
  {
    title: 'siliconsheet',
    name: 'ورق سیلیکون',
    unit: 0,
    value: 0,
    title2: 'silicon_sheet',
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
  store.costId = store.cost.id = result.data.mutateProjectCost.projectCost.id;
  if (store.cost.id !== "") {
    createCostRows();
  }
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
  createProjectCost();

}

function createCostRows() {
  createDependentCosts()
  createRowCost();
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
  return parseFloat(store.cost['standardparts']['amount'])
}


function getWageOverheadCost() {
  let value = 0;
  value = getBaseMaterialCost(value, 'wage_overhead')
  store.cost['generalcost']['amount'] = store.cost['generalcost']['percent'] * value / 100;
}

function getGeneralCost() {
  return parseFloat(store.cost['generalcost']['amount'])
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

function excelExport() {
  let data = [
      ['عنوان', 'مقدار', 'قیمت واحد', 'قیمت کل']
  ];
  rowItems.value.forEach(row => {
    let item = store.cost[row.title];
    data.push([
      row.name,
      item.qty,
      item.price,
      item.qty * item.price,
    ])
  })
  store.cost.bearingcostSet.edges.forEach(row => {
    data.push([
      row.node.bearing.name,
      row.node.qty,
      row.node.price,
      row.node.qty * row.node.price,
    ])
  })
  store.cost.testcostSet.edges.forEach(row => {
    data.push([
      row.node.test.name,
      row.node.qty,
      row.node.price,
      row.node.qty * row.node.price,
    ])
  })
  store.cost.certificatecostSet.edges.forEach(row => {
    data.push([
      row.node.certificate.name,
      row.node.qty,
      row.node.price,
      row.node.qty * row.node.price,
    ])
  })

  dependentCosts.value.forEach(row => {
    data.push([
      row.name,
      store.cost[row.title]['percent'],
      store.cost[row.title]['amount'],
      store.cost[row.title]['amount'],
    ])
  })

  data.push([
    'جمع',
    '',
    '',
    new JNumber(getTotalCost()).thousandSeparate()
  ])

  exportToSpreadsheet(data, 'cost')
}
</script>

<template>
  <div class="">
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
  </div>
  <div class="bg-white grid grid-cols-12 gap-4">
    <div class="col-span-3"></div>
    <div class="col-span-6">
      <div class="">
        <div class="flex items-start justify-between p-4">
          <h3 class="text-green-500 font-semibold">ثبت بهای تمام شده</h3>
          <div class="fixed top-0 left-0 p-3 bg-gray-200 text-xs rounded">
            <label for="editMode">ویرایش</label>
            <input
                id="editMode"
                type="checkbox"
                class="rounded border-gray-300 mr-1 bg-gray-50 focus:ring-3 focus:ring-cyan-200 h-4 w-4"
                :value="!vMoneyConfig.disabled"
                @input="event => vMoneyConfig.disabled = !vMoneyConfig.disabled">
          </div>
        </div>
      </div>
      <div class="border-b pb-4">
        <div class="flex items-start justify-around">
          <template v-for="item in costItems" :key="item.id">
            <div class="col-span-1">
              <label :for="item.title" class="text-sm font-medium text-gray-900 block mb-2">{{ item.name }}</label>
              <input
                  :id="item.title"
                  :disabled="vMoneyConfig.disabled"
                  v-model="store.cost[item.title]"
                  v-on:keyup=""
                  type="text"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              >
            </div>
          </template>
        </div>
        <div>
          <table>
            <thead>
            <tr>
              <td>عنوان</td>
              <td>مقدار</td>
              <td>قیمت واحد</td>
              <td>قیمت کل</td>
            </tr>
            </thead>
            <tbody>
            <!--        row items -->
            <tr v-for="item in rowItems" :key="item.id">
              <td>
                {{ item.name }}
              </td>
              <td>
                <input
                    type="number"
                    :disabled="vMoneyConfig.disabled"
                    v-model="store.cost[item.title]['qty']"
                    :id="item.title"
                    v-on:keyup="item.fn"
                    class="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                >
              </td>
              <td>
                <money3
                    v-model="store.cost[item.title]['price']"
                    v-bind="vMoneyConfig"
                    v-on:keyup="item.fn"
                    class="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                ></money3>
              </td>
              <td>
                <p class="p-2.5">{{
                    new JNumber(store.cost[item.title]['qty'] * store.cost[item.title]['price']).thousandSeparate()
                  }}</p>
              </td>
            </tr>
            <!--        bearing sset -->
            <tr v-for="(bearing, index) in store.cost.bearingcostSet.edges" :key="bearing.node.id">
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <select
                    :disabled="vMoneyConfig.disabled"
                    v-model="bearing.node.bearing"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pr-8"
                >
                  <option
                      v-for="br in bearingList?.getBearings.edges ?? []"
                      :value="br.node"
                      :key="br.node"
                  >
                    {{ br.node.name }}
                  </option>
                </select>
              </td>
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500"><input
                  type="number"
                  :disabled="vMoneyConfig.disabled"
                  v-model="bearing.node.qty"
                  v-on:keyup="getMaterialCost"
                  class="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              ></td>
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <money3
                    v-model="bearing.node.price"
                    v-bind="vMoneyConfig"
                    v-on:keyup="getMaterialCost"
                    class="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                ></money3>
              </td>
              <td class="col-span-2 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                {{ new JNumber(bearing.node.qty * bearing.node.price).thousandSeparate() }}
              </td>
              <td class="col-span-1 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
              <span
                  @click="Remove(store.cost.bearingcostSet.edges, index, bearing.node.id)"
                  class="p-3 text-red-600 text-lg hover:cursor-pointer  hover:text-red-800 hover:text-xl"
                  v-if="!vMoneyConfig.disabled"
              >x</span>
              </td>

            </tr>
            <!--        test set-->
            <tr v-for="(test, index) in store.cost.testcostSet.edges" :key="test.node.id">
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <select :disabled="vMoneyConfig.disabled" v-model="test.node.test"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pr-8">
                  <option
                      v-for="tst in testList?.getTests.edges ?? []"
                      :value="tst.node"
                      :key="tst.node">{{ tst.node.name }}
                  </option>
                </select>
              </td>
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <input
                    type="number"
                    :disabled="vMoneyConfig.disabled"
                    v-model="test.node.qty"
                    class="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                ></td>
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <money3
                    v-model="test.node.price"
                    v-bind="vMoneyConfig"
                    class="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                ></money3>
              </td>

              <td class="col-span-2 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                {{ new JNumber(test.node.qty * test.node.price).thousandSeparate() }}
              </td>
              <td class="col-span-1 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
              <span
                  @click="Remove(store.cost.testcostSet.edges, index, test.node.id)"
                  class="p-3 text-red-600 text-lg hover:cursor-pointer  hover:text-red-800 hover:text-xl"
                  v-if="!vMoneyConfig.disabled"
              >x</span>
              </td>
            </tr>
            <!--        certificate set-->
            <tr v-for="(certificate, index) in store.cost.certificatecostSet.edges" :key="certificate.node.id">
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <select
                    :disabled="vMoneyConfig.disabled"
                    v-model="certificate.node.certificate"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pr-8"
                >
                  <option v-for="crt in certificateList?.getCertificates.edges ?? []" :value="crt.node" :key="crt.node">
                    {{ crt.node.name }}
                  </option>
                </select>
              </td>
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <input
                    type="number"
                    :disabled="vMoneyConfig.disabled"
                    v-model="certificate.node.qty"
                    class="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                >
              </td>
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <money3
                    v-model="certificate.node.price"
                    v-bind="vMoneyConfig"
                    class="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                ></money3>
              </td>
              <td class="col-span-2 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                {{ new JNumber(certificate.node.qty * certificate.node.price).thousandSeparate() }}
              </td>
              <td class="col-span-1 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
              <span
                  @click="Remove(store.cost.certificatecostSet.edges, index, certificate.node.id)"
                  class="p-3 text-red-600 text-lg hover:cursor-pointer hover:text-red-800 hover:text-xl"
                  v-if="!vMoneyConfig.disabled"
              >x</span>
              </td>
            </tr>
            <!--        Dependent cost-->
            <tr v-for="item in dependentCosts" :key="item.id">
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <p class="p-2.5">{{ item.name }}</p>
              </td>
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500"><input
                  :disabled="vMoneyConfig.disabled"
                  v-model="store.cost[item.title]['percent']"
                  v-on:keyup="item.fn"
                  class="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  type="text"></td>
              <td class="col-span-3 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <money3
                    v-model="store.cost[item.title]['amount']"
                    v-bind="vMoneyConfig"
                    class="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                ></money3>
              </td>

              <td class="col-span-2 p-1 whitespace-nowrap text-center text-sm font-normal text-gray-500">
                <p class="p-2.5">{{ new JNumber(store.cost[item.title]['amount']).thousandSeparate() }}</p>
              </td>
            </tr>
            <tr>
              <td colspan="3">جمع</td>
              <td>{{ new JNumber(getTotalCost()).thousandSeparate() }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="">
        <div class="grid grid-cols-12 gap-x-4 bg-white">
          <div class="fixed left-0 top-1/4">
            <div v-if="!vMoneyConfig.disabled" class="flex flex-col">
              <button
                  @click="store.cost = Cost.reset()"
                  class="my-1 bg-green-500 hover:bg-green-800 text-white p-1 rounded-r"
              >جدید
              </button>
              <button
                  @click="excelExport"
                  class="my-1 bg-green-500 hover:bg-green-800 text-white p-1 rounded-r"
              >فایل
              </button>
              <button @click="AddNew(store.cost.bearingcostSet.edges, 'bearing')"
                      class="my-1 bg-green-500 hover:bg-green-800 text-white p-1 rounded-r">
                بیرینگ
              </button>
              <button @click="AddNew(store.cost.testcostSet.edges, 'test')"
                      class="my-1 bg-green-500 hover:bg-green-800 text-white p-1">تست
              </button>
              <button @click="AddNew(store.cost.certificatecostSet.edges, 'certificate')"
                      class="my-1 bg-green-500 hover:bg-green-800 text-white p-1 rounded-l">گواهی نامه
              </button>
              <button class="my-1 bg-blue-800 text-white p-2 rounded" @click="sendProjectCost">ثبت</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-3"></div>
  </div>
</template>

<style scoped>
@import url("../../assets/index.css");
</style>
