import {createRouter, createWebHistory} from "vue-router";
import HomePage from "../components/test/HomePage.vue";
import Order from "../components/order/Order.vue";
import ProjectCost from '../components/cost/ProjectCost.vue';
import Filters from "../components/order/Filters.vue";
import List from "../components/order/List.vue";
import SearchPage from "../layout/SearchPage.vue"

export const menuRoutes = [
    {path: '/', name: 'home', component: HomePage, props: {title: 'نخست'}},
    {
        path: '/orders',
        name: 'orders',
        component: SearchPage,
        children: [{
            path: '',
            components: {
                SearchFilters: Filters,
                SearchResults: List,
            }
        }],
        props: {title: 'سفارش فروش'}},
    {path: '/cost', name: 'cost', component: ProjectCost, props: {title: 'بهای تمام شده'}},
]

const nonMenuRoutes = [
    {path: '/order/:id', name: 'order', component: Order, props: {title: 'جزئیات سفارش'}},
]

const routes = menuRoutes.concat(nonMenuRoutes)

const router = createRouter({
    history: createWebHistory('/spa'),
    routes
})

export default router;