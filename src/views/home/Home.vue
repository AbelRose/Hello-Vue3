<template>
    <el-row class="home" :gutter="20">
        <!-- 左侧 -->
        <el-col :span="8" style="margin-top: 20px">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../../assets/images/user.png" alt="">
                    <div class="user-info">
                        <p class="name">SHERLOCK</p>
                        <p class="role">超管</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登陆时间:<span>2022-07-11</span></p>
                    <p>上次登陆地点:<span>北京</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" style="margin-top: 20px" height="450px">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <!-- 右侧 -->
        <el-col :span="16" style="margin-top: 20px"></el-col>
    </el-row>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const tableData = [
            {
                name: 'oppo',
                todayBuy: 500,
                monthBuy: 3500,
                totalBuy: 22000
            },
            {
                name: 'vivo',
                todayBuy: 300,
                monthBuy: 2200,
                totalBuy: 24000
            },
            {
                name: '苹果',
                todayBuy: 800,
                monthBuy: 4500,
                totalBuy: 65000
            },
            {
                name: '小米',
                todayBuy: 1200,
                monthBuy: 6500,
                totalBuy: 45000
            },
            {
                name: '三星',
                todayBuy: 300,
                monthBuy: 2000,
                totalBuy: 34000
            },
            {
                name: '魅族',
                todayBuy: 350,
                monthBuy: 3000,
                totalBuy: 22000
            }
        ];
        const tableLabel = {
            name: '课程',
            todayBuy: '今日购买',
            monthBuy: '本月购买',
            totalBuy: '总购买',
        }
        return {
            tableData,
            tableLabel
        }
    }
})
</script>

<style lang="less" scoped>
.home {
    .user {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }
}
</style>