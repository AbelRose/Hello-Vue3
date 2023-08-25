<template>
    <el-aside :width="$store.state.isCollapse ? '180px' : '64px'">
        <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
            :collapse="!$store.state.isCollapse" :collapse-transition="false">
            <!-- :collapse="!$store" 注意没有this  :collapse-transition false 是去掉动画 -->
            <el-menu-item :index="item.path" v-for=" item  in  noChildren() " :key="item.path">
                <!-- 动态 icon 为什么可以这样写 因为在main.js里面已经把需要的东西注册进来了 可以动态使用-->
                <component class="icons" :is="item.icon">
                </component>
                <span>{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu :index="item.label" v-for=" item  in  hasChildren() " :key="item.path">
                <template #title>
                    <component class="icons" :is="item.icon">
                    </component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="subItem.path" v-for="(  subItem, subIndex  ) in  item.children " :key="subIndex">
                        <component class="icons" :is="subItem.icon">
                        </component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
    // Vue3和Vue2的区别 setUp之后 return出去
    // Vue2是data
    setup() {
        const list = [
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'UserManage/UserManage'
            },
            {
                path: '/other',
                label: '其他',
                icon: 'location',
                children: [
                    {
                        path: '/page1',
                        name: 'page1',
                        label: '页面1',
                        icon: 'setting',
                        url: 'Other/PageOne'
                    },
                    {
                        path: '/page2',
                        name: 'page2',
                        label: '页面2',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                    }
                ]
            }

        ];
        const noChildren = () => {
            return list.filter((item) => !item.children)
        };
        const hasChildren = () => {
            return list.filter((item) => item.children)
        };
        return {
            noChildren,
            hasChildren
        };
    },
};
</script>

<style lang="less" scoped>
.icons {
    width: 18px;
    height: 18px;
}

.el-menu {
    border-right: none;
}
</style>

