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
    }
}