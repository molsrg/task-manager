import { createRouter, createWebHistory } from 'vue-router'
import Authorization from '../components/AuthorizationClient.vue'
import Home from '../components/HomePage.vue'


const routes = [
    {
        path:'/auth',
        name:'Authorization',
        component: Authorization,
    },
    {
        path: '/home',
        name: 'Home', 
        component: Home
    }
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;