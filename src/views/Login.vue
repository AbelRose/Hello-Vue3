<template>
    <el-form :model="loginForm" class="login-container">
        <h3>系统登录</h3>
        <el-form-item>
            <el-input type="input" placeholder="请输入账号" v-model="loginForm.username">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">
                登录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getCurrentInstance, reactive } from 'vue';

export default {
    setup() {
        // 需要解构
        const { proxy } = getCurrentInstance();
        const loginForm = reactive({
            username: 'admin',
            password: 'admin',
        });
        // 登陆
        const login = async () => {
            const res = await proxy.$api.getMenu(loginForm);
        };
        return {
            loginForm, login
        }
    }
}
</script>

<style  lang="less" scoped>
.login-container {
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 180px auto;

    h3 {
        text-align: center;
        margin-bottom: 20px;
        color: #505450;
    }

    // 穿透
    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>