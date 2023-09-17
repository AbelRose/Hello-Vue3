<template>
    <el-header>
        <!-- header 分成左右两部分 -->
        <div class="l-content">
            <!-- Button里面的图标展示 -->
            <el-button size="small" plain @click="handleCollapse">
                <el-icon :size="20">
                    <Menu />
                </el-icon>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <!-- 首页一定存在 所以直接写死 -->
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <!-- :src 动态引入 -->
                    <img class="user" :src="getImgSrc('user')" alt="">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script>
import { computed, defineComponent } from 'vue-demi';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
    // Vue3中 template中用到的变量都放到setUp中 并return出去
    setup() {
        // const imgSrc = require('../assets/images/user.png') 这种方式是webpack的 vite 不行
        // vite 的动态引用 原生的JS进行打包
        let getImgSrc = (user) => {
            return new URL(`../assets/images/${user}.png`, import.meta.url).href;
        };
        let store = useStore()
        // 点击按钮收缩的方法
        let handleCollapse = () => {
            // 调用vuex中的mutations 先要import
            store.commit('updateIsCollapse');
        };
        // 计算属性
        const current = computed(() => {
            // currentMenu 是 store index 中的 currentMenu
            return store.state.currentMenu;
        });
        // 退出
        const router = useRouter()
        const handleLoginOut = () => {
            store.commit("cleanMenu");
            router.push({
                name: 'login',
            })
        }
        return {
            // imgSrc
            getImgSrc,
            handleCollapse,
            current,
            handleLoginOut
        }
    }
});
</script>

<style lang="less" scoped>
header {
    display: flex;
    // 左右两边
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #333;
}

.l-content {
    display: flex;
    align-items: center;

    h3 {
        color: #fff;
    }

    .el-button {
        margin-right: 20px;
        width: 35px;
    }
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

.el-dropdown-link:focus {
    outline: none;
}

:deep(.bread) span {
    color: #fff !important;
    cursor: pointer !important; // 小手
}
</style>
