// 组件之间的通信用vuex(CommonHeader 和 CommonAside的收缩) 并需要在main.js中引用
import { createStore } from 'vuex'
import Cookie from 'js-cookie'
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
        menu: [],
        token: ''
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
            // 除了首页只剩下1个的时候 直接清空menu
            if (res === 1) {
                state.currentMenu = null;
            }
            state.tabsList.splice(res, 1)
        },
        // 被 Login.vue调用 store.commit('setMenu', res.menu)
        setMenu(state, val) {
            state.menu = val
            localStorage.setItem('menu', JSON.stringify(val))
        },
        addMenu(state, router) {
            if (!localStorage.getItem('menu')) { 
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu')) 
            state.menu = menu
            // 在App.vue中用到 addMenu(因为每次都会走app.vue)
            // vuex 不能做数据持久化 如果想做 得结合localstore来做
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        // 模板字符串
                        let url = `../views/${item.url}.vue`
                        item.component = () => import(url)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    let url = `../views/${item.url}.vue`
                    item.component = () => import(url)
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item => {
                router.addRoute('home1', item)
            })
        },
        clearMenu(state) {
            state.menu = []
            localStorage.removeItem('menu')
        },
        // 设置 Token
        setToken(state, val) {
            state.token = val
            // token持久化
            Cookie.set('token', val)
        },
        // 清除 Token
        clearToken(state) {
            state.token = ''
            Cookie.remove('token')
        },
        // 获取 Token
        getToken(state) {
            state.token = state.token || Cookie.get('token')
        }
    }
})