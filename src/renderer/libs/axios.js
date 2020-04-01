import axios from 'axios';
import { Message } from 'view-design';
import { router } from '@/router';
//import { getStore, setStore } from '../libs/h5-storage';
import * as storagePromise from '../service/storagePromise';
//import Cookies from 'js-cookie';
import qs from 'qs';

// axios初始化配置
axios.defaults.timeout = 15000;   // baseURL将自动加在'url' 前面，除非'url' 是一个绝对 URL。
axios.defaults.baseURL = 'http://116.196.76.171/gomk';   // 请求超时时长
axios.defaults.headers.common['X-Custom-Header'] = 'gomk';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  (err) => {
    // 请求错误提示
    Message.error('请求超时');
    return Promise.resolve(err);
  },
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    const { data } = response;

    // 根据返回的code值来判断执行不同的处理动作(需要和后端约定好)
    switch (data.code) {
      case 401:
        // 未登录  清楚已登录的状态
        //Cookies.set('userInfo', '');
        storagePromise.set('userInfo', '')
        //setStore('accessToken', '');
        storagePromise.set('accessToken', '')
        if (router.history.current.name != 'login') {
          if (data.message !== null) {
            Message.error(data.message);
          } else {
            Message.error('未知错误，请重新登录');
          }
          router.push('/login');
        }
        break;
      case 403:
        // 无权限
        if (data.message !== null) {
          Message.error(data.message);
        } else {
          Message.error('未知错误，可能是权限不足');
        }
        break;
      case 500:
        // 后端服务错误
        if (data.message !== null) {
          Message.error(data.message);
        } else {
          Message.error('未知错误，可能是后台服务错误');
        }
        break;
      case 1001:
        // 重名
        if (data.message !== null) {
          Message.error(data.message);
        } else {
          Message.error('未知错误，可能是后台服务错误');
        }
        break;
      default:
        return data;
    }
    return data;
  },
  (err) => {
    // 返回状态码不是200时候的错误处理
    Message.error(err.toString());
    return Promise.resolve(err);
  },
);

export const downloadRequest = (url, params) => {
  //let accessToken = getStore('accessToken');
  let accessToken = storagePromise.get('accessToken');
  return axios({
    method: 'get',
    url: `${url}`,
    responseType: 'blob',
    params: params,
    headers: {
      'accessToken': accessToken
    }
  });
};

export const getRequest = (url, accessToken, params) => {
  //let accessToken = getStore('accessToken');
  //let accessToken = storagePromise.get('accessToken');
  return axios({
    method: 'get',
    url: `${url}`,
    params: params,
    headers: {
      'accessToken': accessToken
    }
  });
};



export const postRequest = (url, accessToken, params) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    //data: qs.stringify(params),

    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      ret = ret.substring(0, ret.length - 1);
      console.log(ret);
      return ret;
    }],

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accessToken': accessToken
    }
  });
};


export const putRequest = (url, accessToken, params) => {
  //let accessToken = getStore("accessToken");
  return axios({
    method: 'put',
    url: `${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      ret = ret.substring(0, ret.length - 1);
      return ret;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'accessToken': accessToken
    }
  });
};

export const deleteRequest = (url, accessToken, params) => {
  //let accessToken = getStore('accessToken');
  return axios({
    method: 'delete',
    url: `${url}`,
    params: params,
    headers: {
      'accessToken': accessToken
    }
  });
};

export const importRequest = (url, accessToken, params) => {
  //let accessToken = getStore('accessToken');
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    headers: {
      'accessToken': accessToken
    }
  });
};

export const uploadFileRequest = (url, accessToken, params) => {
  //let accessToken = getStore('accessToken');
  return axios({
    method: 'post',
    url: `${url}`,
    params: params,
    headers: {
      'accessToken': accessToken
    }
  });
};

/**
* 无需token验证的请求 避免旧token过期导致请求失败
* @param {*} url 
* @param {*} params 
*/
export const getRequestWithNoToken = (url, params) => {
  console.log(url);
  return axios({
    method: 'get',
    url: `${url}`,
    params: params
  });
};
