<template>
    <div class="user-header">
        <el-button type="primary" @click="dialogVisible = true">+新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input v-model="formInline.keyword" placeholder="请输入用户名" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="list" style="width: 100%" height="500px">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" :prop="item.prop"
                :width="item.width ? item.width : 125" />
            <el-table-column fixed="right" label="操作" min-width="180">
                <template #default>
                    <el-button size="small">编辑</el-button>
                    <el-button link type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 现在这个分页是每页20条 -->
        <el-pagination small background layout="prev, pager, next" :total="config.total" :page-size="20"
            @current-change="changePage" class="pager mt-4" />
    </div>
    <el-dialog v-model="dialogVisible" title="新增用户" width="30%" :before-close="handleClose">
        <el-form :inline="true" :model="formUser">
            <el-form-item label="姓名">
                <el-input v-model="formUser.name" placeholder="请输入姓名" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
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
            page: 1,
            name: ''
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
        const formInline = reactive({
            keyword: ""
        });
        const handleSearch = () => {
            config.name = formInline.keyword
            getUserData(config)
        };
        // 控制模态框的显示和隐藏
        const dialogVisible = ref(false)
        const handleClose = (done) => {
            ElMessageBox.confirm('确定关闭吗?')
                .then(() => {
                    done()
                })
                .catch(() => {
                    // catch error
                })
        };
        // 添加用户的form数据
        const formUser = reactive({
            name: "" // 添加用户的用户名
        })
        return {
            list, tableLabel, config, changePage, formInline, handleSearch, dialogVisible, handleClose, formUser
        }
    },
})
</script>

<style lang="less" scoped>
.table {
    position: relative;
    height: 520px;

    .pager {
        position: absolute;
        right: 0;
        bottom: -20px;
    }
}

.user-header {
    display: flex;
    justify-content: space-between;
}
</style>
