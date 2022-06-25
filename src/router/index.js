import VueRouter from "vue-router";
import Vue from "vue";


import Home from '@/views/TheHome.vue'
Vue.use(VueRouter)

const router = new VueRouter({


    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'detail/:id',
                    component: () => import('@/views/home/TheDetail.vue')
                },
            ]

        },
        {
            path: '/category',
            component: () => import('@/views/TheCategory.vue')
        },
        {
            path: '/shopcart',
            component: () => import('@/views/TheShopCart.vue')
        },
        {
            path: '/profile',
            component: () => import('@/views/TheProfile.vue')
        },

    ],

    scrollBehavior(to, from, savedPosition) {
        // ...
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, left: 0 }
        }
    }
})
export default router