import axios from 'axios';
import config from '../config'
import { ElMessage } from 'element-plus'
const NETWORK_ERROR = '网络请求异常, 请稍后重试......'

// 创建 axios 实例对象
const service = axios.create({
    baseURL: config.baseApi
})

// 在请求之前做一些事情
service.interceptors.request.use((req) => {
    // 可以自定义 Header
    // JWT token 认证的时候会用到Header
    return req
}) 

// 在请求之后做一些事情
service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data
    // 根据后端协议一致而定
    if (code === 200) {
        return data
    } else {
        // 网络请求错误
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

// 封装的核心函数
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase == 'get') {
        options.params = options.data
    }
    // 对 Mock 的处理
    let isMock = config.mock // 总的是true
    if (typeof options.mock !== 'undefined') {
        // 如果有接口不是Mock的话就用自己的
        isMock = options.mock
    }
    // 对线上环境做处理
    if (confirm.env === 'prod') {
        // 不给用到Mock的机会
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}

export default request


