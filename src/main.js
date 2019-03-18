// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/common/stylus/index.styl'
import '@/common/font/iconfont.css'
import '@/common/icon/iconfont.css'
import '@/common/scss/mint-ui.scss'
import 'lib-flexible'
import {postRequest, putRequest, getRequest, getRequestApi,postRequestApi} from './api/apiService.js'
import {isBlank, phoneVeri, RouterName, scrollToBottom, loadMsgsCount, clearLoadMsgsCount, setStorage, getStorage, loginCheck, getUrlParamHref, request} from './util/util'
import util from './util/util'
Vue.use(MintUI)
Vue.config.productionTip = false
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.isBlank = isBlank
Vue.prototype.phoneVeri = phoneVeri
Vue.prototype.RouterName = RouterName
Vue.prototype.scrollToBottom = scrollToBottom
Vue.prototype.loadMsgsCount = loadMsgsCount
Vue.prototype.clearLoadMsgsCount = clearLoadMsgsCount
Vue.prototype.setStorage = setStorage
Vue.prototype.getStorage = getStorage
Vue.prototype.loginCheck = loginCheck
Vue.prototype.getRequestApi = getRequestApi
Vue.prototype.postRequestApi = postRequestApi

// 判断浏览器类型
let ua = navigator.userAgent.toLowerCase()
let BrowserType = {
  alipay: ua.indexOf('alipay') > -1,
  wechat: ua.indexOf('micromessenger') > -1,
  other: ua.indexOf('micromessenger') < 0 && ua.indexOf('alipay') < 0
}

// 判断终端类型
let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
let isWindowsPhone = /(?:Windows Phone)/.test(ua)
let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
let isAndroid = /(?:Android)/.test(ua)
let isFireFox = /(?:Firefox)/.test(ua)
// let isChrome = /(?:Chrome|CriOS)/.test(ua)
let isPhone = /(?:iPhone)/.test(ua) && !isTablet
  let TeminalType = {
  isTablet: isTablet,
  isPhone: isPhone,
  isAndroid: /(?:Android)/.test(ua),
  isPC: !isPhone && !isAndroid && !isSymbian
}
// alert('userAgent'+ ua)
// alert('browserType'+ JSON.stringify(BrowserType))
Vue.prototype.BrowserType = BrowserType
Vue.prototype.TeminalType = TeminalType

// getCustomerInfo
// sessionStorage.getItem('userInfo')
getRequest('gcwwwifc/getUserProfile?ProfileType='+util.ProfileType.expAddress).then(res => {
  if (res.data.code === 0) {
    // app.$store.commit('setSessionInfo', res.data.result)
    app.$store.commit('setExpAddress', res.data.result)
  } else {
    app.$store.dispatch('setSignOut')
    return postRequest('gcwwwifc/login', {
      'LoginId': 'guest',
      'Password': 'guest'
    })
  }
}).then(res => {
  if (res && res.data.code === 0) {
    return getRequest('gcwwwifc/getCustomerInfo').then(res => {
      app.$store.commit('setSessionInfo', res.data.result)
    })
  }
}).then(res => {
  getRequest('gcwwwifc/getUserProfile?ProfileType='+util.ProfileType.invTitle).then(res => {
    app.$store.commit('setInvTitleList', res.data.result)
  })
}).then(res => {
  getRequest('gcwwwifc/getUserProfile?ProfileType='+util.ProfileType.invAddress).then(res => {
    app.$store.commit('setInvAddressList', res.data.result)
  })
}).then(res => {
  getRequest('getMerchandiseMeta').then(res => {
    // console.log('setMerchandiseMeta', res.data.result)
    setStorage('merchandiseMeta', res.data.result)
    app.$store.commit('setMerchandiseMeta', res.data.result)
  })
}).then(res => {
  getRequest('getMerchandises').then(res => {
    // console.log('getMerchandises', res.data.result)
    app.$store.commit('setMerchandise', res.data.result)
  })
})

let app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  data: {
    Bus: new Vue()
  }
})
window.app = app

//处理查看报告
let isCheckRpt = parseInt(getUrlParamHref('isCheckRpt')) === util.BooleanInt.yes
console.log('isCheckRpt')
if (isCheckRpt) {
  if (isBlank(app.$store.state.user.userInfo.customerName)) { // 未登录
    app.$router.push({name: RouterName.login, query: {isCheckRpt: isCheckRpt}})
  } else {
    app.$router.push({name: RouterName.myReport})
  }
}
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (from.name === RouterName.addInvTitle && app.$store.state.com.isSearchEnterprise) {
    app.$store.commit('setIsSearchEnterprise', false)
    next(false)
  } else {
    next()
  }
  // NProgress.start();
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('userInfo');
  // }
  // let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  // if (!userInfo && to.path != '/account/login') {
  //   next({ path: '/account/login' })
  // } else {
  //   next()
  // }   //默认可选择暂时不登录
  // next()
})

// 加载控制台
const loadScript = (url, callback) => {
  const script = document.createElement('script')
  script.onload = () => callback()
  script.src = url
  document.body.appendChild(script)
}

loadScript(
  'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js',
  () => {
    var VConsole = window.VConsole
    new VConsole()
  })
