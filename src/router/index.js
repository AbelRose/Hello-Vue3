import { createRouter, createWebHashHistory } from 'vue-router'

// 必须是 routes 而不是 routers
const routes = [
    {
        path: '/',
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('../views/home/Home.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router