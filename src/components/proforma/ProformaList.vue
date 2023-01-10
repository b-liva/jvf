<script setup>
import {useRouter} from "vue-router";
import {useProformaStore} from "../../store/store";
const router = useRouter();
const proformaStore = useProformaStore()
</script>

<template>
  <div class="overflow-x-auto">
    <div
        v-for="(proforma, index) in proformaStore.orders"
        :key="proforma.node.id"
        @click="router.push({name: 'proforma', params:{id:proforma.node.id}})"
        class="border bg-white rounded-lg p-2 mb-6 relative">
      <div class="">
        <div class="grid grid-cols-12">
          <div class="text-sm text-white text-center p-1.5 bg-blue-400 absolute top-0 right-0 w-12
          rounded-tr-lg rounded-bl-lg min-w-max">{{ proforma.node.number }}</div>
          <div class="col-start-13 text-green-700 p-1">{{proforma.node.owner.lastName}}</div>
        </div>
        <div class="grid grid-cols-9 py-4">
          <div class="col-span-3">{{ proforma.node.reqId.customer.name }}</div>
          <div class="">
            <div class="text-center">تعداد دستگاه</div>
            <div class=" text-center text-green-500">{{ proforma.node.reqId.totalQty }}</div>
          </div>
          <div class="">
            <div class="text-center">کیلووات</div>
            <div class="text-center text-green-500">{{ proforma.node.reqId.totalKw }}</div>
          </div>
          <div class="text-center">{{ proforma.node.dateFa }}</div>
          <div class="col-span-3 text-right">
            <div class="text-xs text-center text-gray-500 px-4 text-justify">
              {{proforma.node.reqId.orderfollowupSet.edges[0]?.node.summary ?? ""}}
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
