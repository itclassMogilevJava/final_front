import Vue from 'vue'
import Router from 'vue-router'
import Cart from '@/components/Cart'
import Shop from '@/components/Shop'
import Register from '@/components/Register'
import Login from '@/components/Login'

Vue.use(Router);

const router = new Router({
    mode: 'history', 
    routes: [
        { path: '/', component: Shop },
        { path: '/cart', component: Cart },
        { path: '/register', component: Register },
        { path: '/login', component: Login },
    ]
});

export default router;