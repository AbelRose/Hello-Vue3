/**
 * 整个项目API的管理
 */
import request from './request'

export default {
    // Home 组件 左侧表格数据获取
    getTableData(params) {
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: params,
            // 单个接口的Mock控制
            mock: true
        })
    },
    // Home 组件 Count 数据获取
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
            mock: true
        }) 
    },
    // echarts 获取数据
    getChartData() {
        return request({
            url: '/home/getChartData',
            method: 'get',
            mock: true
        })
    },
    getUserData(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            mock: false, // 不走线上的API
            data: params
        })
    },
    addUser(params) {
        return request({
            url: '/user/add',
            method: 'post',
            mock: false, // 不走线上的API
            data: params
        })
    },
    editUser(params) {
        return request({
            url: '/user/edit',
            method: 'post',
            mock: false, // 不走线上的API
            data: params
        })
    },
    deleteUser(params) {
        return request({
            url: '/user/delete',
            method: 'get',
            mock: false, // 不走线上的API
            data: params
        })
    }
}