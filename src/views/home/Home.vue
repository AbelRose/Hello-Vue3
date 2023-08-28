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
        <el-col :span="16" style="margin-top: 20px" class="right-num">
            <div class="num">
                <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
                    <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
                    <div class="detail">
                        <p class="num">${{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
// 导入 axios 异步调用
import axios from 'axios';

export default defineComponent({
    setup() {
        // 需要用 ref 初始一个数组
        const tableData = ref([]);
        const countData = ref([]);
        const tableLabel = {
            name: '课程',
            todayBuy: '今日购买',
            monthBuy: '本月购买',
            totalBuy: '总购买',
        }
        // proxy 类似于Vue2中的 this
        const { proxy } = getCurrentInstance();
        // Home 组件 左侧表格数据获取 async 异步
        const getTableList = async () => {
            // fastmock 线上 Mock数据
            // await axios.get("https://www.fastmock.site/mock/ab47677c244ebf7fff6a06ff4fefc5f0/api/home/getData").then((res) => {
            //     if (res.data.code === 200) {
            //         tableData.value = res.data.data;
            //     }
            // });
            tableData.value = await proxy.$api.getTableData();
        }
        // Home 组件 Count 数据获取
        const getCountData = async () => {
            countData.value = await proxy.$api.getCountData();
        }
        onMounted(() => {
            getTableList();
            getCountData();
        })
        return {
            tableData,
            tableLabel,
            countData // 返回之后才能在页面中使用
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

    // .right-num {

    // }
    .num {
        display: flex;
        flex-wrap: wrap;

        .el-card {
            width: 30%;
            margin-bottom: 20px;
            margin-left: 20px;
        }

        .icons {
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }

        .detail {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .num {
                font-size: 18px;
                font-style: italic;
                margin-bottom: 12px;
            }

            .txt {
                font-size: 14px;
                text-align: center;
                color: #999;
            }
        }
    }

    .graph {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .el-card {
            width: 48%;
        }
    }
}
</style>