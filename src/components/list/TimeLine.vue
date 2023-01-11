<script setup>
import {computed, onMounted, ref} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import TimeLineList from "../list/TimeLineList.vue";
import {useBaseTimeLineData} from "../../data/base";
import {useRoute} from "vue-router";
import {getOrder} from "../../graphql/timeline/timeLine.graphql"

const itemNames = [
  'order',
  'proforma',
  'income',
  'permit',
  'invIn',
  'invOut',
  'invoice',
];

let timeLineItemRow = ref([
  {name: 'income', title: 'دریافت وجه', subtitle: '1401-05-05', checked: true},
  {name: 'invIn', title: 'ورود به انبار', subtitle: '1401-05-05', checked: true},
  {name: 'invOut', title: 'خروج از انبار', subtitle: '1401-05-05', checked: true},
  {name: 'invoice', title: 'صدور فاکتور', subtitle: '1402-06-05', checked: true},
])

const {
  result: orderResult,
  loading: orderLoading,
  error: orderError,
  refetch: orderRefetch,
  load: orderLoad,
  onResult: orderOnResult
} = useLazyQuery(getOrder)

const route = useRoute();
onMounted(() => {
  getPageName();
  createTimeLineItems()
});
const timeLineData = ref([
  {name: 'order', title: 'دریافت سفارش', subtitle: '', checked: false},
  {name: 'proforma', title: 'صدور پیش فاکتور', subtitle: '', checked: false},
  {name: 'income', title: 'دریافت وجه', subtitle: '', checked: false},
  {name: 'permit', title: 'صدور مجوز', subtitle: '', checked: false},
  {name: 'invIn', title: 'ورود به انبار', subtitle: '', checked: false},
  {name: 'invOut', title: 'خروج از انبار', subtitle: '', checked: false},
  {name: 'invoice', title: 'صدور فاکتور', subtitle: '', checked: false},
])


// const order = computed(() => orderResult.value?.getOrder ?? {});

// orderOnResult((result) => {
//   console.log('data is ready', result.data?.getOrder.dateFa);
//   timeLineData.value.map(item => {
//     console.log('item: ', item)
//     if(item.name === 'order'){
//       item.checked = true
//       item.subtitle = result.data?.getOrder.dateFa
//     }
//     console.log('item: ', item)
//   })
// })
function getPageName(){
  return route.params.name;
}

function createTimeLineItems() {
  console.log('route is:', route.name)
  if (route.name === 'order') {
    const orderId = route.params.id;
    orderLoad(getOrder, {id: orderId});

    // timeLineItemRow.value.push({name: 'order', title: 'دریافت سفارش', subtitle: order.dateFa, checked: true})

    // const proformas = computed(() => orderResult.value?.getOrder?.xprefSet.edges ?? []);
    // const lastProforma = computed(() => orderResult.value?.getOrder?.xprefSet.edges.slice(-1)[0] ?? undefined);
    // const permits = computed(
    //     () => orderResult.value?.getOrder?.xprefSet.edges.filter(i => i.node.perm === true) ?? []
    // )
    // const lastPermit = computed(
    //     () => orderResult.value?.getOrder?.xprefSet.edges.filter(
    //         i => i.node.perm === true
    //     ).slice(-1)[0] ?? undefined
    // )
    // timeLineItemRow.value.push({name: 'proforma', title: 'صدور پیش فاکتور', subtitle: lastProforma.dateFa, checked: true})
    // timeLineItemRow.value.push({name: 'permit', title: 'صدور مجوز', subtitle: lastPermit.dateFa, checked: true})
  }
}

// const timeLineData = useBaseTimeLineData();
function getItem(name){
  return  timeLineItemRow.value.filter(n => n.name === name)[0]
}
</script>

<template>
  <div v-for="tld in timeLineData">{{tld.name}}, {{tld.subtitle}}, {{tld.checked}}</div>
  <TimeLineList v-for="tld in timeLineData" v-bind="tld" :page-name="route.name" class="my-2"/>
<!--  <TimeLineList v-for="tld in timeLineItemRow" v-bind="tld" page-name="order" class="my-2"/>-->
</template>

<style scoped>

</style>