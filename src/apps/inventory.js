import {createApp} from "vue";
import InventoryOutNumber from "../components/inventory/InventoryOutNumber.vue";

const ioE = document.querySelector("#invOutNum")
if (ioE != null) {
  const invOutApp = createApp(InventoryOutNumber, {...ioE.dataset})
  invOutApp.mount("#invOutNum");
}

