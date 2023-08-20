import { createRouter, createWebHistory } from 'vue-router'
import Authorization from './../components/Auth/AuthorizationClient.vue'
import AuthorizationFromService from './../components/Auth/AuthorizationFromService.vue'

const routes = [
    {
        path:'/',
        name:'Authorization',
        component: Authorization,
    },
    {
        path: '/code',
        name: 'AuthorizationFromService', 
        component: AuthorizationFromService
    }
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;