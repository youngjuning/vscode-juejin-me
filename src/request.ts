/* eslint-disable no-param-reassign */
import axios from 'axios';
import qs from 'qs';

// 中文文档: http://t.cn/ROfXFuj
// 创建实例
const request = axios.create({
  baseURL: 'https://api.juejin.cn/content_api/v1/',
  timeout: 10000,
});

// 添加请求拦截器
request.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' });
    }
    return config;
  },
  error => {
    // TODO: 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    const { data } = response;
    return data;
  },
  error => {
    // TODO: 对响应错误做点什么
    console.log(error);

    return Promise.reject(error);
  }
);

export default request;
