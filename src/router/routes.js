import {createRouter, createWebHistory} from "vue-router";
import HomePage from "../components/test/HomePage.vue";
import ProjectCost from '../components/cost/ProjectCost.vue';

const routes = [
    {path: '/', name: 'home', component: HomePage, props:{title:'نخست'}},
    {path: '/order', name: 'order', component: ProjectCost, props: {title: 'سفارش فروش'}},
    {path: '/cost', name: 'cost', component: ProjectCost, props: {title: 'بهای تمام شده'}},
]

const router = createRouter({
    history: createWebHistory('/spa'),
    routes
})

export default router;