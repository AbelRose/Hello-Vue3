<template>
    <el-aside :width="$store.state.isCollapse ? '160px' : '60px'">
        <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
            :collapse="!$store.state.isCollapse" :collapse-transition="false">
            <!-- :collapse="!$store" 注意没有this  :collapse-transition false 是去掉动画 -->
            <h3 class="show-pointer" @click="goHome" v-show="$store.state.isCollapse">
                Hello Vue3
            </h3>
            <h3 class="show-pointer" @click="goHome" v-show="!$store.state.isCollapse">
                Vue3
            </h3>
            <el-menu-item :index="item.path" v-for=" item  in  noChildren() " :key="item.path" @click="clickMenu(item)">
                <!-- 动态 icon 为什么可以这样写 因为在main.js里面已经把需要的东西注册进来了 可以动态使用-->
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu :index="item.path" v-for=" item  in  hasChildren() " :key="item.path">
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="subItem.path" v-for="(  subItem, subIndex  ) in  item.children " :key="subIndex"
                        @click="clickMenu(subItem)">
                        <component class="icons" :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

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
                name: 'other',
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
        const router = useRouter();
        const store = useStore();
        const clickMenu = (item) => {
            router.push({
                name: item.name,
            });
            // vuex 进行管理 点击之后会到store中的index.js中的selectMenu 从而改变currentMenu的值
            store.commit('selectMenu', item)
        };
        // 点击跳转到首页
        const goHome = () => {
            router.push({
                name: 'home',
            })
        }
        return {
            noChildren,
            hasChildren,
            clickMenu,
            goHome
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

    h3 {
        line-height: 48px;
        color: #fff;
        text-align: center;
    }

    // 解决图标不展示的问题 NB！！
    .el-sub-menu {
        display: grid;
        width: 100%;
    }

    /* 
      去掉 title 的 div 外部元素 通过添加 ::v-deep 选择器，我们可以直接访问子组件的样式，从而修改它们的样式
      这个原理是使用了CSS的 ::v-deep 伪元素选择器来覆盖子组件的样式。在Vue中，组件的样式是通过作用域化的方式来限定范围的，这意味着组件的样式只会应用于组件内部，而不会影响到子组件的样式。 
 
      然而，有时候我们可能需要修改子组件的样式，这时就可以使用 ::v-deep 选择器。 ::v-deep 选择器可以穿透组件的作用域，直接访问到子组件的样式，从而覆盖或修改子组件的样式。 
 
      在上面的代码中，我们使用了 ::v-deep 选择器来选择 .el-menu-item-group__title 元素，并设置它的 display 属性为 none ，从而去掉了 <el-menu-item-group> 标题外部的 <div> 元素。 
 
      需要注意的是， ::v-deep 选择器是Vue特定的选择器，它在Vue 2.x版本中被引入。在Vue 3.x版本中， ::v-deep 选择器已经被弃用，取而代之的是 /deep/ 选择器
    */
    :deep(.el-menu-item-group__title) {
        display: none;
    }

    .show-pointer {
        cursor: pointer; // pointer图标
    }
}
</style>

