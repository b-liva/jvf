<script setup>
import {onMounted, ref} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import TimeLineList from "../list/TimeLineList.vue";
import {useRoute} from "vue-router";
import {getOrder} from "../../graphql/timeline/timeLine.graphql"

const timeLineData = ref([
  {name: 'order', title: 'دریافت سفارش', subtitle: '', checked: false, subItems: []},
  {name: 'proforma', title: 'صدور پیش فاکتور', subtitle: '', checked: false, subItems: []},
  {name: 'income', title: 'دریافت وجه', subtitle: '', checked: false, subItems: []},
  {name: 'permit', title: 'صدور مجوز', subtitle: '', checked: false, subItems: []},
  {name: 'invIn', title: 'ورود به انبار', subtitle: '', checked: false, subItems: []},
  {name: 'invOut', title: 'خروج از انبار', subtitle: '', checked: false, subItems: []},
  {name: 'invoice', title: 'صدور فاکتور', subtitle: '', checked: false, subItems: []},
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

orderOnResult((res) => {
  if(!res.loading){
    let order = res.data?.getOrder ?? {};
    let proformas = order?.xprefSet.edges ?? [];
    let incomeRows = []
    proformas.forEach(proforma => {
      let irs = proforma.node?.incomerowSet.edges ?? [];
      incomeRows = incomeRows.concat(irs)
    })

    timeLineData.value.map(item => {
      if(item.name === 'order'){
        item.subtitle = order.dateFa;
        item.checked = true;
        item.subItems.push({id: order.id, date: order.dateFa, number: order.number});
      }
      if(item.name === 'proforma' && proformas.length > 0){
        let lastProforma = proformas[proformas.length - 1]
        item.subtitle = lastProforma.node.dateFa;
        item.checked = true;
        proformas.forEach(proforma => {
          item.subItems.push({id: proforma.node.id, date: proforma.node.dateFa, number: proforma.node.number});
        })
      }
      if(item.name === 'income' && incomeRows.length > 0){
        let lastIncome = proformas[proformas.length - 1]
        item.subtitle = lastIncome.node.dateFa;
        item.checked = true;
        incomeRows.forEach(income => {
          item.subItems.push({
            id: income.node.income.id,
            date: income.node.income.dateFa,
            number: income.node.income.number
          });
        })
      }
    })
  }
})

onMounted(() => {
  orderLoad(getOrder, {id: getOrderId(getPageName())})
});

function getPageName(){
  return route.name;
}
function getOrderId(pageName){
  if (pageName === "order"){
    return route.params.id;
  }
  return '';
}

</script>

<template>
  <div v-for="tld in timeLineData">{{tld.name}}, {{tld.subtitle}}, {{tld.checked}}, {{tld.subItems}}</div>
  <TimeLineList v-for="tld in timeLineData" v-bind="tld" :page-name="route.name" class="my-2"/>
</template>

<style scoped>

</style>