<script setup>
import {useRoute} from "vue-router";
import {Tab} from "flowbite-vue";

const route = useRoute();
</script>

<template>
  <div class="grid grid-cols-9 mt-6">
    <div class="col-span-2 bg-blue-100">
      <div class="p-3">
        <div>
          <span>شماره درخواست</span>
          <span>450</span>
        </div>
        <div>
          <span>تاریخ درخواست</span>
          <span>1401-05-05</span>
        </div>
        <div>
          <span>دستگاه</span>
          <span>5</span>
        </div>
        <div>
          <span>کیلووات</span>
          <span>275</span>
        </div>
        <div>
          <div>شرح</div>
          <div>توضیحات مربوط به این درخواست</div>
        </div>
      </div>
    </div>
    <div class="col-span-5 bg-blue-200 px-3">
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
        <span>مشتری</span>
        <span>هوایار</span>
      </div>
      <div>
        <div>کارشناسان</div>
        <div>فروغی</div>
        <div>دانشی</div>
      </div>
    </div>
    {{ route.params.id }}
  </div>
</template>

<style scoped>

</style>