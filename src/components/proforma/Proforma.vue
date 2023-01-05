<script setup>
import TimeLineList from "../list/TimeLineList.vue";
import {ref} from "vue";

let show = ref(false)
const props = [
  {name: 'order', title: 'دریافت سفارش', subtitle: '1401-05-06', checked: true},
  {name: 'proforma', title: 'صدور پیش فاکتور', subtitle: '1401-05-05', checked: true},
  {name: 'income', title: 'دریافت وجه', subtitle: '1401-05-05', checked: true},
  {name: 'permit', title: 'صدور مجوز', subtitle: '1401-05-05', checked: false},
  {name: 'invOut', title: 'ارسال به مشتری', subtitle: '1401-05-05', checked: false},
  {name: 'invoice', title: 'ارسال فاکتور', subtitle: '1402-06-05', checked: false},
]
</script>

<template>
  <div class="flex justify-center mt-12">
    <div class="text-center px-4">
      <div class="border-b pb-2">مشتری</div>
      <div class="pt-2 text-blue-600 hover:font-bold hover:cursor-pointer">
        <RouterLink :to="{name:'customer', params: {id: 'customerId'}}">CustomerName</RouterLink>
      </div>
    </div>
    <div class="text-center px-4">
      <div class="border-b pb-2">پیش فاکتور</div>
      <div class="pt-2 text-blue-600">450</div>
    </div>
    <div class="text-center px-4">
      <div class="border-b pb-2">تاریخ</div>
      <div class="pt-2 text-blue-600">1401-05-05</div>
    </div>
    <div class="text-center px-4">
      <div class="border-b pb-2">اعتبار</div>
      <div class="pt-2 text-blue-600">1401-05-12</div>
    </div>
    <div class="text-center px-4">
      <div class="border-b pb-2">مبلغ</div>
      <div class="pt-2 text-blue-600">2,500,000,000</div>
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
        <div class="pb-1 min-h-fit">کپی پیش فاکتور</div>
        <div class="pb-1 min-h-fit">تخفیف</div>
        <div class="pb-1 min-h-fit">سود روتین</div>
        <div class="pb-1 min-h-fit">سود روتین و پروژه</div>
        <div class="pb-1 min-h-fit">افزایش اعتبار مشتری</div>
        <div class="pb-1 min-h-fit">تسویه از حساب مشتری</div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-12 gap-6 mt-20">
    <div class="col-span-2 m-3">
      <TimeLineList v-for="prop in props" v-bind="prop" page-name="proforma" class="my-2"/>
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
            <td class="text-sm text-center px-3 py-4">1010025</td>
            <td class="text-sm text-center px-3 py-4">روتین</td>
            <td class="text-sm text-center px-3 py-4">2</td>
            <td class="text-sm text-center px-3 py-4">110</td>
            <td class="text-sm text-center px-3 py-4">1500</td>
            <td class="text-sm text-center px-3 py-4">380</td>
            <td class="text-sm text-center px-3 py-4">IMB3</td>
            <td class="text-sm text-center px-3 py-4">IC411</td>
            <td class="text-sm text-center px-3 py-4">IP55</td>
            <td class="text-sm text-center px-3 py-4">IE2</td>
            <td class="text-sm text-center px-3 py-4 cursor-pointer relative group">
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
    <div class="col-span-2 relative">
      <div class="p-3">
        <div>شرح</div>
        <div>توضیحات مربوط به این پیش فاکتور</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>