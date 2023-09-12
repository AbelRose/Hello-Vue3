<template>
    <div class="table">
        <el-table :data="list" style="width: 100%" height="600px">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" :prop="item.prop"
                :width="item.width ? item.width : 125" />
            <el-table-column fixed="right" label="操作" min-width="180">
                <template #default>
                    <el-button size="small">编辑</el-button>
                    <el-button link type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br />
        <!-- 分页 -->
        <el-pagination small background layout="prev, pager, next" :total="config.total" @current-change="changePage"
            class="pager mt-4" />
    </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref, reactive } from 'vue';

export default defineComponent({
    setup() {
        const { proxy } = getCurrentInstance()
        // ref 和 tableLabel做双向绑定
        const list = ref([])
        const tableLabel = reactive([
            {
                prop: "name",
                label: "姓名",
            },
            {
                prop: "age",
                label: "年龄",
            },
            {
                prop: "sexLabel",
                label: "性别",
            },
            {
                prop: "birth",
                label: "出生日期",
                width: 200,
            },
            {
                prop: "addr",
                label: "地址",
                width: 320,
            },
        ]);
        onMounted(() => {
            getUserData(config)
        });
        const config = reactive({
            total: 0,
            page: 1
        });
        const getUserData = async (config) => {
            let res = await proxy.$api.getUserData(config);
            config.total = res.count
            list.value = res.list.map((item) => {
                item.sexLabel = item.sex === 0 ? '女' : '男 '
                return item
            })
        };
        const changePage = (page) => {
            config.page = page
            getUserData(config)
        };
        return {
            list, tableLabel, config, changePage
        }
    },
})
</script>
