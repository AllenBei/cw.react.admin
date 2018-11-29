import axios from 'axios'
import { Common,LoginStores } from '@/store/store.js'
import { message } from 'antd'
const baseUrlStr = window.gob.apiUrl

const instance = axios.create({
  baseURL: baseUrlStr,
  timeout: 10000,  //请求时间设置
  withCredentials: true, // 跨域 cookie
})
const request = {}

const getUrl = (baseUrl, controller, action) => {
  let result = ''
  if (!(baseUrl === null || baseUrl === undefined || baseUrl === '')) {
  }
  if (controller !== null && controller !== undefined && controller !== '') {
    result += '/' + controller
  }
  if (action !== null && action !== undefined && action !== '') {
    result += '/' + action
  }
  return result
}

request['post'] = (controller, action, params, headers, baseUrl) => {
  let uri = getUrl(baseUrl, controller, action)
  return instance.post(uri, params, {
    headers: headers
  }).then(res => {
    if (res.data.code === '401') {
      LoginStores.loginOut(Common.getAuthRouter,true);
      return {
        code: -1,
        msg: '登录超时'
      }
    } else {
      return res.data
    }
  }).catch(async e => {
    message.error('请求失败');
    Common.getAuthRouter.push('/login');
    return e
  })
}

request['get'] = (controller, action, params, headers, baseUrl) => {
  let uri = getUrl(baseUrl, controller, action)
  return instance.get(uri, {
    params: params,
    headers: headers
  }).then(res => {
    return res.data
  }).catch(async e => {
  })
}

//response 拦截器该段代码每次数据请求都会触发
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) { }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });

export default request
