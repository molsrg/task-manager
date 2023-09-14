import { createRouter, createWebHistory } from 'vue-router'
import Authorization from '../components/AuthorizationClient.vue'
import Home from '../components/HomePage.vue'
import Waiting from '../components/WaitingApp.vue'


const routes = [
    {
        path:'/',
        name:'Authorization',
        component: Authorization,
    },
    {
        path: '/home',
        name: 'Home', 
        component: Home
    }, 
    {
        path: '/waiting',
        name: 'Waiting', 
        component: Waiting
    }, 
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;