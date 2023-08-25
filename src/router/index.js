import { createRouter, createWebHashHistory } from 'vue-router'

// 必须是 routes 而不是 routers
const routes = [
    {
        path: '/',
        component: () => import('../views/Main.vue'),
        // 重定向到home
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/Home.vue')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/user/User.vue')
            },
            {
                path: '/page1',
                name: 'page1',
                component: () => import('../views/Page1.vue')
            },
            {
                path: '/page2',
                name: 'page2',
                component: () => import('../views/Page2.vue')
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router