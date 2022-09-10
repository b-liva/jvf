import {createApp} from "vue";
import Cost from "../components/proforma/Cost.vue";

const projectCost = createApp(Cost);
projectCost.mount("#pcCalc")

window.pcCost = projectCost;
