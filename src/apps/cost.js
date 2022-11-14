import {createApp} from "vue";
import ProjectCostCalculator from "../components/cost/ProjectCostCalculator.vue";

const projectCost = createApp(ProjectCostCalculator);
projectCost.mount("#pcCalc")

window.pcCost = projectCost;
