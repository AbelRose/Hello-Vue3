<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">+新增</el-button>
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
                <template #default="scope">
                    <!-- 编辑的时候用插槽 scope.row 就是这条数据 -->
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 现在这个分页是每页20条 -->
        <el-pagination small background layout="prev, pager, next" :total="config.total" :page-size="20"
            @current-change="changePage" class="pager mt-4" />
    </div>
    <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增用户' : '编辑用户'" width="35%" :before-close="handleClose">
        <el-form :inline="true" :model="formUser" ref="userForm">
            <!-- 为了显示在同一行用 el-row 和 el-col -->
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name" :rules="[
                        { required: true, message: '姓名是必填项' }]">
                        <el-input v-model="formUser.name" placeholder="请输入姓名" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年龄" prop="age" :rules="[
                        { required: true, message: '年龄是必填项' },
                        { type: 'number', message: '年龄必须是数字' }
                    ]">
                        <el-input v-model.number="formUser.age" placeholder="请输入年龄" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="性别" prop="sex" :rules="[
                        { required: true, message: '性别是必填项' }]">
                        <el-select v-model="formUser.sex" placeholder="请选择">
                            <el-option label="男" value="0" />
                            <el-option label="女" value="1" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期" prop="birth" :rules="[
                        { required: true, message: '出生日期是必填项' }]">
                        <el-date-picker v-model="formUser.birth" type="date" label="出生日期" placeholder="请输入出生日期"
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="地址" prop="addr" :rules="[
                    { required: true, message: '地址是必填项' }]">
                    <el-input v-model="formUser.addr" placeholder="请输入地址" clearable />
                </el-form-item>
            </el-row>
            <el-row style="justify-content: end;">
                <el-form-item>
                    <el-button type="primary" @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-row>
        </el-form>
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
                    // 重置模态框的内容 注意需要加上prop
                    proxy.$refs.userForm.resetFields();
                    // done 的时候已经关闭了
                    done();
                })
                .catch(() => {
                    // catch error
                })
        };
        // 添加用户的form数据
        const formUser = reactive({
            name: "", // 添加用户的用户名
            age: "", // 年龄
            sex: "", // 性别
            birth: "", // 生日
            addr: "" // 地址
        });
        // 日期格式化
        const timeFormat = (time) => {
            var time = new Date(time);
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var day = time.getDate();
            function add(m) {
                return m < 10 ? "0" + m : m;
            }
            return year + '-' + add(month) + '-' + add(day)
        };
        // 添加用户 
        const onSubmit = () => {
            // 校验
            proxy.$refs.userForm.validate(async (valid) => {
                if (valid) {
                    // 日期处理
                    formUser.birth = timeFormat(formUser.birth)
                    if (action.value == 'add') {
                        let res =
                            await proxy.$api.addUser(formUser)
                        if (res) {
                            // 让模态框消失
                            dialogVisible.value = false;
                            // 重置模态框的内容 注意需要加上prop
                            proxy.$refs.userForm.resetFields();
                            getUserData(config)
                        }
                    } else {
                        // 性别处理
                        formUser.sex == '男' ? (formUser.sex = 1) : (formUser.sex = 0)
                        // 编辑接口
                        let res =
                            await proxy.$api.editUser(formUser)
                        if (res) {
                            // 让模态框消失
                            dialogVisible.value = false;
                            // 重置模态框的内容 注意需要加上prop
                            proxy.$refs.userForm.resetFields();
                            getUserData(config)
                        }

                    }
                } else {
                    ElMessage({
                        showClose: true,
                        message: "请输入正确的内容",
                        type: "error",
                    });
                }
            });
        };
        // 取消
        const handleCancel = () => {
            // 让模态框消失
            dialogVisible.value = false;
            // 重置模态框的内容 注意需要加上prop
            proxy.$refs.userForm.resetFields();
        };
        // 区分编辑和新增
        const action = ref('add')
        // 编辑
        const handleEdit = (row) => {
            action.value = 'edit';
            dialogVisible.value = true;
            // 浅拷贝
            // 先对性别做处理
            row.sex == 1 ? (row.sex = '男') : (row.sex = '女')
            // 防止出现点击编辑之后 在点击新增的时候 会把数据带到新增的模态框里面
            proxy.$nextTick(() => {
                Object.assign(formUser, row)
            })
        };
        // 新增用户
        const handleAdd = () => {
            action.value = 'add';
            dialogVisible.value = true;
        };
        // 删除用户
        const handleDelete = (row) => {
            ElMessageBox.confirm('确定删除吗?')
                .then(async () => {
                    await proxy.$api.deleteUser({
                        id: row.id
                    })
                    ElMessage({
                        showClose: true,
                        message: '删除成功',
                        type: 'success',
                    });
                    getUserData(config)
                })
                .catch(() => {
                    // catch error
                })
        }
        return {
            list, tableLabel, config, changePage, formInline, handleSearch, dialogVisible, handleClose, formUser, onSubmit, handleCancel, action, handleEdit, handleAdd, handleDelete
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
 