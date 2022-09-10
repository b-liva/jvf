import {createApp, h} from "vue";
import CustomerTreeMap from "../components/customer/customerTreeMap.vue";

const customerTreeMapApp = createApp({
  render: () => h(CustomerTreeMap)
})
customerTreeMapApp.mount("#customerApp")
