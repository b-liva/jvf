<script setup>
import {useRoute} from "vue-router";
import TimeLineList from "../list/TimeLineList.vue";
import {ref} from "vue";

let show = ref(false)
const route = useRoute();
const props = [
  {title: 'دریافت سفارش', subtitle: '1401-05-06', checked: true, color: 'blue-600'},
  {title: 'صدور پیش فاکتور', subtitle: '1401-05-05', checked: true, color: 'blue-600'},
  {title: 'دریافت وجه', subtitle: '1401-05-05', checked: true, color: 'blue-600'},
  {title: 'صدور مجوز', subtitle: '1401-05-05', checked: false, color: 'blue-700'},
  {title: 'ارسال به مشتری', subtitle: '1401-05-05', checked: false, color: 'blue-700'},
  {title: 'ارسال فاکتور', subtitle: '1402-06-05', checked: false, color: 'blue-700'}
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
  <div class="grid grid-cols-12 gap-6 mt-20">
    <div class="col-span-2 m-3">
      <TimeLineList v-for="prop in props" v-bind="prop" class="my-2"/>
    </div>
    <div class="col-span-8 px-3">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="text-center px-3 py-3">ردیف</th>
            <th scope="col" class="text-center px-3 py-3">کد</th>
            <th scope="col" class="text-center px-3 py-3">نوع</th>
            <th scope="col" class="text-center px-3 py-3">تعداد</th>
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

          <tr v-for="(row, index) in [1,2,3,4,5]" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ index + 1 }}
            </th>
            <td class="text-center px-3 py-4">1010025</td>
            <td class="text-center px-3 py-4">روتین</td>
            <td class="text-center px-3 py-4">2</td>
            <td class="text-center px-3 py-4">110</td>
            <td class="text-center px-3 py-4">1500</td>
            <td class="text-center px-3 py-4">380</td>
            <td class="text-center px-3 py-4">IMB3</td>
            <td class="text-center px-3 py-4">IC411</td>
            <td class="text-center px-3 py-4">IP55</td>
            <td class="text-center px-3 py-4">IE2</td>
            <td class="text-center px-3 py-4">...</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div class="col-span-2 relative">
      <div class="p-3">
        <div>شرح</div>
        <div>توضیحات مربوط به این درخواست</div>
      </div>
      <div v-if="show" class="absolute bottom-0 left-0 ml-6 mb-8 rounded-md bg-gray-300 min-w-[360px]">
        <div class="relative p-5">
          <p @click="show = !show" class="absolute top-0 right-0 p-1 bg-red-400">X</p>
          <div class="py-1">
            <span class="text-green-500 pl-2">1401-05-06</span>
            <span class="text-xs">ارجاع به واحد مهندسی</span>
          </div>
          <div class="py-1">
            <span class="text-green-500 pl-2">1401-05-06</span>
            <span class="text-xs">ارجاع به واحد مهندسی</span>
          </div>
          <div class="py-1">
            <span class="text-green-500 pl-2">1401-05-06</span>
            <span class="text-xs">ارجاع به واحد مهندسی</span>
          </div>
        </div>
      </div>
      <div @click="show = !show" v-else class="absolute bottom-0 left-0 bg-gray-300 ml-3 mb-3 p-4 rounded-full">
        شرح پیگیری
      </div>
    </div>
    <!--    <div>{{ route.params.id }}</div>-->
  </div>
</template>

<style scoped>

</style>