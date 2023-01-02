import {createRouter, createWebHistory} from "vue-router";
import HomePage from "../components/test/HomePage.vue";
import AboutPage from "../components/test/AboutPage.vue";
import ProjectCost from '../components/cost/ProjectCost.vue';

const routes = [
    {path: '/', name: 'home', component: HomePage},
    {path: '/about', name: 'about', component: AboutPage},
    {path: '/cost', name: 'cost', component: ProjectCost}
]

const router = createRouter({
    history: createWebHistory('/spa'),
    routes
})

export default router;