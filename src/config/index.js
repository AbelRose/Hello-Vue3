/**
 * 环境配置文件
 * 
 * 一般在企业级项目中一般有三个环境
 * 
 * 开发环境 测试环境 线上环境
 */
// 当前的环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    development: { 
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/ab47677c244ebf7fff6a06ff4fefc5f0/api'
    },
    test: { 
        baseApi: '/test.com/api',
        mockApi: 'https://www.fastmock.site/mock/ab47677c244ebf7fff6a06ff4fefc5f0/api'
    },
    prod: { 
        baseApi: '/prod.com/api',
        mockApi: 'https://www.fastmock.site/mock/ab47677c244ebf7fff6a06ff4fefc5f0/api'
    }
}

export default {
    env,
    // Mock的总开关
    mock: true,
    ...EnvConfig[env]
}


