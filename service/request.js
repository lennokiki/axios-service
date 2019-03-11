import axios from 'axios';
import baseUrl from '../config';
import { cancelLoading } from './globalLoading';
import createError from './createError';
import transfer from './transfer';
import store from '../store';
import router from '../router';

axios.defaults.baseURL = baseUrl.domain;
axios.defaults.timeout = 200000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const API = {};

//请求拦截器
axios.interceptors.request.use(function (config) {
  transfer(config);
  return config
},
  undefined
)

//响应拦截器
axios.interceptors.response.use(function (response) {
  cancelLoading();
  if (response.data && response.data.errorcode && response.data.errorcode != 200) {
    if (response.data.errorcode == 401) {
      // token.remove('session');
      // router.push('login')
      store.commit('USER_LOGOUT');
    }
    createError({ msg: response.data.message || '' });
    return Promise.reject(response.data.message || '');
  }
  return response.data;
}, function (error) {
  cancelLoading();
  createError(error);
  return Promise.reject('链接失败');
});

['head', 'delete', 'get', 'put', 'patch', 'post'].forEach((type, key) => {
  const addPrefix = 'api' + type.slice(0, 1).toUpperCase() + type.slice(1);
  API[addPrefix] = async (...rest) => {
    try {
      return await axios[type].apply(null, rest);
    } catch (error) {
      return Promise.reject(error);
    }
  }
})
export default API
