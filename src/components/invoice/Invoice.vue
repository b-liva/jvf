<script setup>
import Timeline from "../list/TimeLine.vue";
import {ref} from "vue";
import {useBaseTimeLineData, useBaseInvoiceData} from "../../data/base";
import Watermark from "../element/Watermark.vue";

const invoiceData = useBaseInvoiceData();
let condense = ref(false)
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <Watermark class="absolute top-1/2 right-1/2 text-red-300 text-xl z-20"/>
    <div class="col-span-2">
      <div class="col-span-2 m-3">
        <Timeline/>
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
          <div class="border-b pb-2">شماره فاکتور</div>
          <div class="pt-2 text-blue-600">450</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">خروج از انبار</div>
          <div class="pt-2 text-blue-600">203</div>
        </div>
        <div class="text-center px-4">
          <div class="border-b pb-2">تاریخ</div>
          <div class="pt-2 text-blue-600">1401-05-05</div>
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
                <th scope="col" class="text-center px-3 py-3">سریال</th>
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

              <tr v-for="(inv_out, index) in invoiceData" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row"
                    :class="{'py-4': !condense}"
                    class="px-3 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">{{ index + 1 }}
                </th>
                <td class="text-sm text-center px-3">{{inv_out.code}}</td>
                <td class="text-sm text-center px-3">{{inv_out.serial}}</td>
                <td class="text-sm text-center px-3">{{inv_out.qty}}</td>
                <td class="text-sm text-center px-3">{{inv_out.kw}}</td>
                <td class="text-sm text-center px-3">{{inv_out.rpm}}</td>
                <td class="text-sm text-center px-3">{{inv_out.voltage}}</td>
                <td class="text-sm text-center px-3">{{inv_out.im}}</td>
                <td class="text-sm text-center px-3">{{inv_out.ic}}</td>
                <td class="text-sm text-center px-3">{{inv_out.ip}}</td>
                <td class="text-sm text-center px-3">{{inv_out.ie}}</td>
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
            <div>توضیحات</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>