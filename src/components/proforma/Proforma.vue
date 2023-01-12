<script setup>
import Timeline from "../list/TimeLine.vue";
import {getProformaDetails} from "../../graphql/proforma/query/proforma.graphql";
import {useRoute} from "vue-router";
import {useQuery} from "@vue/apollo-composable";
import {computed, ref} from "vue";
import JNumber from "../../utils/number.js";

let showSpecDetailsFlag = ref([]);
const route = useRoute();
const {result, loading, error, onResult, refetch} = useQuery(getProformaDetails, {id: route.params.id});
const proforma = computed(() => result.value?.getProformaDetails ?? {})
const proformaSpecs = computed(() => result.value?.getProformaDetails?.prefspecSet.edges ?? [])
onResult(() => addToggleFlagToSpecs());

let condense = ref(false)

function handleShowHideFlag(id){
  showSpecDetailsFlag.value.map(item => {
    if (item.id === id){
      item.show = !item.show;
    }
  })
}
function addToggleFlagToSpecs(){
  proformaSpecs.value.forEach(spec => showSpecDetailsFlag.value.push({id: spec.node.id, show: false}))
}
function totalNonVat(){
  let total = 0;
  proformaSpecs.value.forEach(spec => total += spec.node.qty * spec.node.price);
  return total
}
function vat(){
  return 0.09 * totalNonVat();
}
function totalPrice(){
  return totalNonVat() + vat();
}
</script>

<template>
  <div class="grid grid-cols-12" v-if="!loading || Object.keys(proforma).length > 0">
    <div class="col-span-2">
      <div class="col-span-2 m-3">
        <Timeline :order-id="proforma.reqId.id"/>
      </div>
    </div>
    <div class="col-span-10">
      <div class="flex justify-center mt-12">
        <div class="text-center px-4">
          <div class="border-b pb-2">مشتری</div>
          <div class="pt-2 text-blue-600 hover:font-bold hover:cursor-pointer">
            <RouterLink :to="{name:'customer', params: {id: proforma.reqId.customer.id}}">{{proforma.reqId.customer.name}}</RouterLink>
          </div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">درخواست</div>
          <div class="pt-2 text-blue-600">
            <RouterLink :to="{name: 'order', params: {id: proforma.reqId.id}}">{{proforma.reqId.number}}</RouterLink>
          </div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">پیش فاکتور</div>
          <div class="pt-2 text-blue-600">{{proforma.number}}</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">تاریخ</div>
          <div class="pt-2 text-blue-600">{{proforma.dateFa}}</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">اعتبار</div>
          <div class="pt-2 text-blue-600">{{proforma.expDateFa}}</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">مبلغ</div>
          <div class="pt-2 text-blue-600">***</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">تعداد دستگاه</div>
          <div class="pt-2 text-blue-600">{{proforma.qty}}</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">مجموع کیلووات</div>
          <div class="pt-2 text-blue-600">{{proforma.kw}}</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">کارشناس</div>
          <div class="pt-2 text-blue-600 hover:font-bold hover:cursor-pointer">
            <RouterLink :to="{name:'user', params: {id: proforma.owner.id}}">{{proforma.owner.lastName}}</RouterLink>
          </div>
        </div>
        <div class="px-4 group relative cursor-pointer">
          <div class="border-b pb-2 px-4">...</div>
          <div class="text-gray-500 hidden group-hover:block min-w-max
      absolute right-0 top-10 bg-gray-100 rounded rounded-l py-2 px-4 text-xs z-20">
            <div class="pb-1 min-h-fit">ویرایش</div>
            <div class="pb-1 min-h-fit">حذف</div>
            <div class="pb-1 min-h-fit">کپی پیش فاکتور</div>
            <div class="pb-1 min-h-fit">تخفیف</div>
            <div class="pb-1 min-h-fit">سود روتین</div>
            <div class="pb-1 min-h-fit">سود روتین و پروژه</div>
            <div class="pb-1 min-h-fit">افزایش اعتبار مشتری</div>
            <div class="pb-1 min-h-fit">تسویه از حساب مشتری</div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-6 mt-16">
        <div class="col-span-10 px-3">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div>
              <label>
                <input type="checkbox" v-model="condense">
                <span class="mr-2">فشرده</span>
              </label>

            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="text-center py-3">ردیف</th>
                <th scope="col" class="text-center py-3">کد</th>
                <th scope="col" class="text-center py-3">نوع</th>
                <th scope="col" class="text-center py-3">تعداد</th>
                <th scope="col" class="text-center py-3">کیلووات</th>
                <th scope="col" class="text-center py-3">دور</th>
                <th scope="col" class="text-center py-3">ولتاژ</th>
                <th scope="col" class="text-center py-3">قیمت واحد</th>
                <th scope="col" class="text-center py-3">قیمت کل</th>
                <th scope="col" class="text-center py-3"></th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(row, index) in proformaSpecs" :key="row.id">
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row"
                      class="relative font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      :class="{
                'py-6 text-center': !condense,
                  }"
                  >{{ index + 1 }}
                    <div class="absolute bottom-0 right-0 text-xs pr-2 cursor-pointer text-blue-500"
                         @click="handleShowHideFlag(row.node.id)"  >جزئیات</div>
                  </th>
                  <td class="text-sm text-center">{{row.node.code}}</td>
                  <td class="text-sm text-center">{{row.node.reqspecEq.type.title}}</td>
                  <td class="text-sm text-center">{{row.node.qty}}</td>
                  <td class="text-sm text-center">{{row.node.kw}}</td>
                  <td class="text-sm text-center">{{row.node.rpm}}</td>
                  <td class="text-sm text-center">{{row.node.voltage}}</td>
                  <td class="text-sm text-center">{{new JNumber(row.node.price).thousandSeparate()}}</td>
                  <td class="text-sm text-center">{{new JNumber(row.node.qty * row.node.price).thousandSeparate()}}</td>
                  <td class="text-sm text-center cursor-pointer relative group">
                    <span class="group-hover:invisible">...</span>
                    <div class="absolute hidden left-0 top-0 group-hover:block p-2">
                      <p class="text-blue-800 text-xs pb-1">ویرایش</p>
                      <p class="text-red-800 text-xs ">حذف</p>
                    </div>
                  </td>
                </tr>
                <tr class="border-b border-b-2" :class="{
              'hidden': !showSpecDetailsFlag.filter(item => item.id === row.node.id)[0]?.show ?? false
            }">
                  <td colspan="5">
                    <div class="grid grid-cols-4 min-w-20 py-2">
                      <div>
                        <p>{{row.node.im?.title ?? ''}}</p>
                      </div>
                      <div>
                        <p>{{row.node.ic?.title ?? ''}}</p>
                      </div>
                      <div>
                        <p>{{row.node.ip?.title ?? ''}}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
              <tr class="text-center">
                <td colspan="8">جمع بدون مالیات ارزش افزوده</td>
                <td>{{new JNumber(totalNonVat()).thousandSeparate()}}</td>
              </tr>
              <tr class="text-center">
                <td colspan="8">مالیات ارزش افزوده</td>
                <td>{{new JNumber(vat()).thousandSeparate()}}</td>
              </tr>
              <tr class="text-center">
                <td colspan="8">جمع با مالیات ارزش افزوده</td>
                <td>{{new JNumber(totalPrice()).thousandSeparate()}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-span-2 relative">
          <div class="p-3">
            <div>شرح</div>
            <div>{{proforma.summary}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>