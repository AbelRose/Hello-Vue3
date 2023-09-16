import Mock from 'mockjs';
import homeApi from './mockData/home'
import userApi from './mockData/user'

// 拦截请求地址并返回相关的数据
Mock.mock('/home/getData', homeApi.getHomeData)

// 本地获取 User 的数据, 通过正则的方式
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
