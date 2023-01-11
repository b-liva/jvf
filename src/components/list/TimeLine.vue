<script setup>
import {onMounted, ref} from "vue";
import {useLazyQuery} from "@vue/apollo-composable";
import TimeLineList from "../list/TimeLineList.vue";
import {useRoute} from "vue-router";
import {getOrder} from "../../graphql/timeline/timeLine.graphql"

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
  orderLoad(getOrder, {id: getOrderId(getPageName())})
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

function getPageName(){
  return route.params.name;
}
function getOrderId(pageName){
  if (pageName === "order"){
    return route.params.id;
  }
  return '';
}

</script>

<template>
  <div v-for="tld in timeLineData">{{tld.name}}, {{tld.subtitle}}, {{tld.checked}}</div>
  <TimeLineList v-for="tld in timeLineData" v-bind="tld" :page-name="route.name" class="my-2"/>
</template>

<style scoped>

</style>