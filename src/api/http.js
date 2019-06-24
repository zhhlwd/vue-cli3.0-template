import axios from 'axios';
import store from '@store/index';
axios.defaults.timeout = 12000; // 请求超时时间
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'; // post请求头的设置
// axios 请求拦截器
axios.interceptors.request.use(
  config => {
    // 可在此设置要发送的token
    let token = store.getters['login/token'];
    token && (config.headers.token = token);
    return config;
  },
  error => {
    return Promise.error(error);
  }
);
// axios respone拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器
    console.log('response', response);
    if (
      response.status === 200 &&
      response.data.code === 0
    ) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    const responseCode = error.response.status;
    switch (responseCode) {
      // 401：未登录
      case 401:
        break;
      // 404请求不存在
      case 404:
        break;
      default:
    }
    return Promise.reject(error);
  }
);

export default function http(option) {
  return axios(option)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err.data;
  });
}
