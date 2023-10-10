import { createRouter, createWebHistory } from 'vue-router'
import Authorization from '../components/AuthorizationClient.vue'
import Home from '../components/HomePage.vue'
import Waiting from '../components/WaitingApp.vue'
import PersonalArea from '../components/PersonalArea.vue'

import AuthApp from '../components/AuthApp.vue'

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
    {
        path: '/personal',
        name: 'PersonalArea', 
        component: PersonalArea
    }, 
    {
        path: '/auth',
        name: 'AuthApp', 
        component: AuthApp
    }, 
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;