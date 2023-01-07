import {createRouter, createWebHistory} from "vue-router";
import HomePage from "../components/test/HomePage.vue";
import Order from "../components/order/Order.vue";
import ProjectCost from '../components/cost/ProjectCost.vue';
import Filters from "../components/order/Filters.vue";
import List from "../components/order/List.vue";
import SearchPage from "../layout/SearchPage.vue";
import Customer from "../components/customer/Customer.vue";
import User from "../components/user/User.vue";
import Proforma from "../components/proforma/Proforma.vue";
import Permit from "../components/proforma/Permit.vue";
import Income from "../components/income/Income.vue";
import InventoryIn from "../components/inventory/InventoryIn.vue";
import InventoryOut from "../components/inventory/InventoryOut.vue";
import Invoice from "../components/invoice/Invoice.vue";

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
    {path: '/customer/:id', name: 'customer', component: Customer, props: {title: 'مشتری'}},
    {path: '/user/:id', name: 'user', component: User, props: {title: 'کاربر'}},
    {path: '/order/:id', name: 'order', component: Order, props: {title: 'جزئیات سفارش'}},
    {path: '/proforma/:id', name: 'proforma', component: Proforma, props: {title: 'پیش فاکتور'}},
    {path: '/proforma/:id/permit', name: 'permit', component: Permit, props: {title: 'مجوز'}},
    {path: '/income/:id', name: 'income', component: Income, props: {title: 'دریافت وجه'}},
    {path: '/intIn/:id', name: 'invIn', component: InventoryIn, props: {title: 'ورود به انبار'}},
    {path: '/intOut/:id', name: 'invOut', component: InventoryOut, props: {title: 'خروج از انبار'}},
    {path: '/invoice/:id', name: 'invoice', component: Invoice, props: {title: 'فاکتور'}},
]

const routes = menuRoutes.concat(nonMenuRoutes)

const router = createRouter({
    history: createWebHistory('/spa'),
    routes
})

export default router;