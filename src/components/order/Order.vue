<script setup>
import {useRoute} from "vue-router";
import TimeLineList from "../list/TimeLineList.vue";

const route = useRoute();
const props = [
    {title: 'دریافت سفارش', subtitle: '1401-05-05', checked: true},
    {title: 'صدور پیش فاکتور', subtitle: '1401-05-05', checked: true},
    {title: 'دریافت وجه', subtitle: '1401-05-05', checked: true},
    {title: 'صدور مجوز', subtitle: '1401-05-05', checked: true},
    {title: 'ارسال به مشتری', subtitle: '1401-05-05', checked: true},
    {title: 'ارسال فاکتور', subtitle: '1401-05-05', checked: true},
]
</script>

<template>
  <div class="flex justify-center mt-12">
    <div class="text-center px-4">
      <div class="border-b pb-2">مشتری</div>
      <div class="pt-2 text-blue-600">هوایار</div>
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
      <div class="border-b pb-2">تعداد دستگاه</div>
      <div class="pt-2 text-blue-600">6</div>
    </div>
    <div class="text-center px-4">
      <div class="border-b pb-2">مجموع کیلووات</div>
      <div class="pt-2 text-blue-600">450</div>
    </div>
    <div class="text-center px-4">
      <div class="border-b pb-2">کارشناس</div>
      <div class="pt-2 text-blue-600">فروغی</div>
    </div>
  </div>
  <div class="grid grid-cols-12 mt-6">
    <div class="col-span-3 bg-blue-100">
      <div class="m-3">
        <TimeLineList v-for="prop in props" v-bind="prop"/>
      </div>
    </div>
    <div class="col-span-7 bg-blue-200 px-3">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">ردیف</th>
            <th scope="col" class="px-6 py-3">کیلووات </th>
            <th scope="col" class="px-6 py-3">دور</th>
            <th scope="col" class="px-6 py-3">ولتاژ</th>
            <th scope="col" class="px-6 py-3">IM</th>
            <th scope="col" class="px-6 py-3">IC</th>
            <th scope="col" class="px-6 py-3">IP</th>
            <th scope="col" class="px-6 py-3">IE</th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="(row, index) in [1,2,3,4,5]" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{index}}</th>
            <td class="px-6 py-4">110</td>
            <td class="px-6 py-4">1500</td>
            <td class="px-6 py-4">380</td>
            <td class="px-6 py-4">IMB3</td>
            <td class="px-6 py-4">IC411</td>
            <td class="px-6 py-4">IP55</td>
            <td class="px-6 py-4">IE2</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div class="col-span-2 bg-blue-300">
      <div>
        <div>شرح</div>
        <div>توضیحات مربوط به این درخواست</div>
      </div>
    </div>
    <div>{{ route.params.id }}</div>
  </div>
</template>

<style scoped>

</style>