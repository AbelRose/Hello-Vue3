import Mock from 'mockjs';
import homeApi from './mockData/home'

// 拦截请求地址并返回相关的数据
Mock.mock('/home/getData', homeApi.getHomeData)