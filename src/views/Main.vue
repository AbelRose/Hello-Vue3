<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-header>
                    <CommonHeader />
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import CommonHeader from '../components/CommonHeader.vue';

export default defineComponent({
    commonts: {
        CommonHeader,
    },
});
</script>
