// 组件之间的通信用vuex(CommonHeader 和 CommonAside的收缩) 并需要在main.js中引用
import { createStore } from 'vuex'
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ]
    },
    // 通过 mutations 改变 state 的值
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse;
        },
        // 面包屑 
        selectMenu(state, val) {
            // 判断
            val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
        }
    }
})