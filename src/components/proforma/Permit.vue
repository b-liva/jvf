<script setup>
import TimeLineList from "../list/TimeLineList.vue";
import {ref} from "vue";
import {useBaseTimeLineData, useBasePermitData} from "../../data/base";

let show = ref(false)
const timeLineData = useBaseTimeLineData();
const permitData = useBasePermitData();
let condense = ref(false)
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-2">
      <div class="col-span-2 m-3">
        <TimeLineList v-for="tld in timeLineData" v-bind="tld" page-name="permit" class="my-2"/>
      </div>
    </div>
    <div class="col-span-10">
      <div class="flex justify-center mt-12">
        <div class="text-center px-4">
          <div class="border-b pb-2">مشتری</div>
          <div class="pt-2 text-blue-600 hover:font-bold hover:cursor-pointer">
            <RouterLink :to="{name:'customer', params: {id: 'customerId'}}">CustomerName</RouterLink>
          </div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">شماره درخواست</div>
          <div class="pt-2 text-blue-600">450</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">تاریخ</div>
          <div class="pt-2 text-blue-600">1401-05-05</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">پیش بینی تحویل</div>
          <div class="pt-2 text-blue-600">
            <p><span>45</span> / <span class="text-green-500">30</span></p>
          </div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">مانده مجوز</div>
          <div class="pt-2 text-blue-600">4 / 6</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">مجموع کیلووات</div>
          <div class="pt-2 text-blue-600">450</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">کارشناس</div>
          <div class="pt-2 text-blue-600 hover:font-bold hover:cursor-pointer">
            <RouterLink :to="{name:'user', params: {id: 'userId'}}">username</RouterLink>
          </div>
        </div>
        <div class="px-4 group relative cursor-pointer">
          <div class="border-b pb-2 px-4">...</div>
          <div class="text-gray-500 hidden group-hover:block min-w-max
      absolute right-0 top-10 bg-gray-100 rounded rounded-l py-2 px-4 text-xs z-20">
            <div class="pb-1 min-h-fit">ویرایش</div>
            <div class="pb-1 min-h-fit">حذف</div>
            <div class="pb-1 min-h-fit">ابطال</div>
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
                <th scope="col" class="text-center px-3 py-3">ردیف</th>
                <th scope="col" class="text-center px-3 py-3">کد</th>
                <th scope="col" class="text-center px-3 py-3">نوع</th>
                <th scope="col" class="text-center px-3 py-3">تعداد</th>
                <th scope="col" class="text-center px-3 py-3">مانده</th>
                <th scope="col" class="text-center px-3 py-3">کیلووات</th>
                <th scope="col" class="text-center px-3 py-3">دور</th>
                <th scope="col" class="text-center px-3 py-3">ولتاژ</th>
                <th scope="col" class="text-center px-3 py-3">IM</th>
                <th scope="col" class="text-center px-3 py-3">IC</th>
                <th scope="col" class="text-center px-3 py-3">IP</th>
                <th scope="col" class="text-center px-3 py-3">IE</th>
                <th scope="col" class="text-center px-3 py-3"></th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(permit, index) in permitData" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row"
                    :class="{'py-4': !condense}"
                    class="px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ index + 1 }}
                </th>
                <td class="text-sm text-center px-3">{{permit.code}}</td>
                <td class="text-sm text-center px-3">{{permit.type}}</td>
                <td class="text-sm text-center px-3">{{permit.qty}}</td>
                <td class="text-sm text-center px-3">{{permit.qty - permit.delivered}}</td>
                <td class="text-sm text-center px-3">{{permit.kw}}</td>
                <td class="text-sm text-center px-3">{{permit.rpm}}</td>
                <td class="text-sm text-center px-3">{{permit.voltage}}</td>
                <td class="text-sm text-center px-3">{{permit.im}}</td>
                <td class="text-sm text-center px-3">{{permit.ic}}</td>
                <td class="text-sm text-center px-3">{{permit.ip}}</td>
                <td class="text-sm text-center px-3">{{permit.ie}}</td>
                <td class="text-sm text-center px-3 cursor-pointer relative group">
                  <span class="group-hover:invisible">...</span>
                  <div class="absolute hidden left-0 top-0 group-hover:block p-2">
                    <p class="text-blue-800 text-xs pb-1">ویرایش</p>
                    <p class="text-red-800 text-xs ">حذف</p>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div class="col-span-2">
          <div class="p-3">
            <div>شرح</div>
            <div>توضیحات مربوط به این مجوز</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>