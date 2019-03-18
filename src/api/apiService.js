import axios from 'axios'
import qs from 'qs'
import {Toast} from 'mint-ui'
import util from '../util/util'

axios.interceptors.request.use(config => {
  return config
}, err => {
  Toast({message: '请求超时!'})
  return Promise.resolve(err)
})
axios.interceptors.response.use(res => {
  // console.log('interceptors', new Date())
  if (res.status && res.status === 200) {
    if (res.data.code === 1 && res.config.url.indexOf('gcwwwifc') < 0) { //  || res.data.code === 101
      let msg = res.data.message
      if (msg.indexOf('会话已过期')<0) {
        Toast({message: msg})
      } else {
        app.$store.dispatch('setSignOut')
      }
      app.$store.commit('setLoadingStatus', false)
      // window.app.$router.push({name: util.MobileRouterName.login})
      return res
    }
  }
  return res
}, err => {
  // console.log(err)
  if (err.response) {
    if (err.response.status === 504 || err.response.status === 404) {
      Toast({message: '服务器被吃了⊙﹏⊙∥'})
    } else if (err.response.status === 403) {
      Toast({message: '权限不足,请联系管理员!'})
    } else {
      Toast({message: '未知错误!'})
    }
  }
  return Promise.resolve(err)
})

// let base = '/gcapi/'
// let base = process.env.API + '/gcapi/'
let base = ''
// if (process.env.NODE_ENV === 'development') {
//   base = '/gcapi/'
// } else {
//   base = '/cloud/gcapi/'
// }

base = '/gcapi/'

export const postRequest = (url, params) => {
  // let p = new URLSearchParams()
  // p.append('Json', JSON.stringify(params))
  // {Json: JSON.stringify(params)}
  let param = url.indexOf('gcwwwifc') > -1 ? params : {Json: JSON.stringify(params)}
  return axios({
    method: 'post',
    url: `${base}${url}`,
    params: param,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const postRequestApi = (url, params) => {
  let param = url.indexOf('gcwwwifc') > -1 ? params : {Json: JSON.stringify(params)}
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: param,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  })
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  })
}
export const getRequestApi = (url, param) => {
  // // param = {Json: param}
  // axios.get(`${base}${url}`, {
  //   params: param,
  //   paramsSerializer: function(p) {
  //     console.log('paramsSerializer',p)
  //     return 'Json='+qs.stringify(p)
  //   }
  // })
  let uri = url + '?Json=' + JSON.stringify(param)
  return axios({
    method: 'get',
    url: `${base}${uri}`
  })
}

let base1 = ''
export const request = (url) => {
  return axios({
    method: 'get',
    url: `${base1}${url}`
  })
}
