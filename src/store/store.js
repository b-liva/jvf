import {defineStore} from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      orderNumber: 0,
      orderId: 0,
      proformaId: 0,
      specId: 0,
      proformaSpecId: 0,
      costId: null,
      cost: null,
      showCostForm: false
    }
  }
})

export const useOrderStore = defineStore('orderStore', {
  state: () => {
    return{
      orders: []
    }
  }
})

export const useProformaStore = defineStore('proformaStore', {
  state: () => {
    return{
      proformas: []
    }
  }
})
