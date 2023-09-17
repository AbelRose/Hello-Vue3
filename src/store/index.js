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
        ],
        menu:[]
    },
    // 通过 mutations 改变 state 的值
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse;
        },
        // 面包屑 
        selectMenu(state, val) {
            // 判断
            // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
            if (val.name == 'home') {
                state.currentMenu = null;
            } else {
                state.currentMenu = val
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result == -1 ? state.tabsList.push(val) : ''
            }
        },
        closeTab(state, val) {
            let res = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(res, 1)
        },
        // 被Login.vue调用 store.commit('setMenu', res.menu)
        setMenu(state, val) {
            state.menu = val
            localStorage.setItem('menu', JSON.stringify(val))
        },
        addMenu(state) {
            if (!localStorage.getItem('menu')) { 
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu')) 
            state.menu = menu
            // 在App.vue中用到 addMenu(因为每次都会走app.vue)
            // vuex 不能做数据持久化 如果想做 得结合localstore来做
        }
    }
})