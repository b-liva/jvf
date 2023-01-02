import {createRouter, createWebHistory} from "vue-router";
import HomePage from "../components/test/HomePage.vue";
import Orders from "../components/order/Orders.vue";
import ProjectCost from '../components/cost/ProjectCost.vue';

const routes = [
    {path: '/', name: 'home', component: HomePage, props:{title:'نخست'}},
    {path: '/orders', name: 'orders', component: Orders, props: {title: 'سفارش فروش'}},
    {path: '/cost', name: 'cost', component: ProjectCost, props: {title: 'بهای تمام شده'}},
]

const router = createRouter({
    history: createWebHistory('/spa'),
    routes
})

export default router;