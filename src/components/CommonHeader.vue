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
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script>
export default {
    // Vue3中 template中用到的变量都放到setUp中 并return出去
    setup() {
        // const imgSrc = require('../assets/images/user.png') 这种方式是webpack的 vite 不行
        // vite 的动态引用 原生的JS进行打包
        const getImgSrc = (user) => {
            return new URL(`../assets/images/${user}.png`, import.meta.url).href;
        }
        return {
            // imgSrc
            getImgSrc
        }
    }
}
</script>

<style lang="less" scoped>
header {
    display: flex;
    // 左右两边
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>
