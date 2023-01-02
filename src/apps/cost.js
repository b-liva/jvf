import {createApp} from "vue";
import ProjectCostCalculator from "../components/cost/ProjectCostCalculator.vue";
import router from "../router/routes";

const projectCost = createApp(ProjectCostCalculator);
projectCost.use(router);
projectCost.mount("#pcCalc");

window.pcCost = projectCost;
