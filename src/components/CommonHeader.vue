<template>
    <el-header>
        <!-- header 分成左右两部分 -->
        <div class="l-content">
            <!-- Button里面的图标展示 -->
            <el-button size="small">
                <el-icon :size="20">
                    <Menu />
                </el-icon>
            </el-button>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user.png" alt="">
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
</script>

<style lang="less" scoped>
.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>
