const MobileRouterName = {
  buy: 'buy',
  sample: 'sample',
  account: 'account',
  userInfo: 'userInfo',
  login: 'login',
  inputOrder: 'inputOrder',
  submitOrder: 'submitOrder',
  customerService: 'customerService',
  myReport: 'myReport',
  myOrder: 'myOrder',
  myCoupon: 'myCoupon',
  question: 'question',
  aboutGCCheck: 'aboutGCCheck',
  consult: 'consult',
  myInvoice: 'myInvoice',
  expAddress: 'expAddress',
  addExpAddress: 'addExpAddress',
  editExpAddress: 'editExpAddress',
  changePhone:'changePhone',
  payResult: 'payResult',
  orderDetail: 'orderDetail',
  agreement: 'agreement',
  invTitle: 'invTitle',
  addInvTitle: 'addInvTitle',
  inputInv: 'inputInv',
  editInvAddress: 'editInvAddress',
  addInvAddress: 'addInvAddress',
  invAddress: 'invAddress',
  reportDetail: 'reportDetail',
  refundAfterSale: 'refundAfterSale',
  refundDetail: 'refundDetail',
  refund: 'refund'
}

const ConsultType = {
  request: 1,
  response: 2
}

const InvTypeTabOpt = {
  none: '0',
  electronic: '1',
  regular: '2',
  special: '3'
}

const RouterForToolBar = {
  1: MobileRouterName.buy,
  2: MobileRouterName.sample,
  3: MobileRouterName.account
}

const ProfileType = {
  expAddress: 1,
  invTitle: 2,
  invAddress: 4
}

const BooleanInt = {
  yes: 1,
  no: 0
}

const PayType = {
  alipay: 1,
  wechat: 2
}

const TerminalType = {
  ipadOrPC: 1,
  phone: 2
}

export const RouterName = MobileRouterName

export const isBlank = (val) => {
  return val === '' || val === undefined || val === "" || val === null
}

export const phoneVeri = (val) => {
  val = val.replace(/\s+/g, '')
  return (/^1(3|4|5|7|8)\d{9}$/.test(val))
}

const ReasonType = {
  notwant: 1,
  merInfoError: 2,
  addrInfoError: 3,
  other: 100
}

const RefundStatusIcon = {
  1: 'icon iconfont icon-chulizhong1',
  2: 'icon iconfont icon-tuikuanwancheng',
  3: 'icon iconfont icon-tuikuanshibai1'
}

const ReasonHtml = '<div style="height: 5rem;">' +
  '<label class="mint-radiolist-label" style="text-align: left;margin-left: 15%;"><span class="mint-radio"><input type="radio" onporpertychange="onCheck_(event)" name="reason" class="mint-radio-input" value="1"> <span class="mint-radio-core"></span></span> <span class="mint-radio-label">不想要了</span></label>' +
  '<label class="mint-radiolist-label" style="text-align: left;margin-left: 15%;"><span class="mint-radio"><input type="radio" onporpertychange="onCheck_(event)" name="reason" class="mint-radio-input" value="2"> <span class="mint-radio-core"></span></span> <span class="mint-radio-label">商品信息填写错误</span></label>' +
  '<label class="mint-radiolist-label" style="text-align: left;margin-left: 15%;"><span class="mint-radio"><input type="radio" onporpertychange="onCheck_(event)" name="reason" class="mint-radio-input" value="3"> <span class="mint-radio-core"></span></span> <span class="mint-radio-label">地址信息填写错误</span></label>' +
  '<label class="mint-radiolist-label" style="text-align: left;margin-left: 15%;"><span class="mint-radio"><input type="radio" onporpertychange="onCheck_(event)" name="reason" class="mint-radio-input" value="100"> <span class="mint-radio-core"></span></span> <span class="mint-radio-label">其他</span></label>' +
  '<input id="otherReason" type="text" style="display: none;width: 95%;  height: 0.7rem; padding: 0.1rem;border: 1px solid gainsboro;border-radius: 0.3rem;" placeholder="请填写其他原因">' +
  '</div>'

export const scrollToBottom = (xwBody_) => {
  if (isBlank(xwBody_)) {
    return
  }
  console.log('scrollToBottom')
  setTimeout(() => {
    //滚动条长度
    let currentDistance = xwBody_.scrollHeight - xwBody_.clientHeight;
    //当前滚动条距离顶部的距离
    let currentScroll_y = xwBody_.scrollTop;
    if (currentDistance > 0 && currentDistance > currentScroll_y) {
      currentScroll_y = Math.ceil((currentDistance - currentScroll_y) / 10) + currentScroll_y;
      currentScroll_y = currentScroll_y > currentDistance ? currentDistance : currentScroll_y;
      //微信和qq浏览器不支持 scrollTo？
      //xwBody_.scrollTo(0,currentScroll_y);
      xwBody_.scrollTop = currentScroll_y;
      scrollToBottom(xwBody_);
    }
  }, 13);
}
let timeout = null
let flag = false
export const loadMsgsCount = (this_) => {
  if (flag) {
    return
  }
  time(this_)
  function time(this1) {
    this1.postRequest('loadUnreadCount', null).then(res => {
      let data = res.data.result
      if (data) {
        this1.setMessageCount(data)
      }
    })
    // clearTimeout(timeout)
    timeout = setTimeout(function () {
      time(this1)
    }, 15000)
  }
  flag = true
}

export const clearLoadMsgsCount = () => {
  if (!isBlank(timeout)) {
    clearTimeout(timeout)
    flag = false
  }
}

export const setStorage = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

export const getStorage = (name) => {
  if (!name) return
  let item = window.localStorage.getItem(name)
  if (!item) return
  if (!isJsonString(item)) return item
  return JSON.parse(item)
}

export const isJsonString = (str) => {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch (e) {
  }
  return false
}

export const loginCheck = (this_) => {
  if (this_.isBlank(this_.userInfo.customerName)) {
    this_.$messagebox.confirm('请先登录').then(res => {
      this_.$router.push({name: this_.RouterName.login})
    }).catch(res => {
      this_.$router.go(-1)
    })
  }
}

export const getUrlParamHref = (val) => {
  // let uri = window.location.href
  // let re = new RegExp('' + val + '=([^&?]*)', 'ig')
  // return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null)
  let reg = new RegExp('[?&]' + val + '=([^&#]*)', 'i')
  let res = window.location.href.match(reg)

  if (res && res.length > 1) {
    return decodeURIComponent(res[1])
  }
  return ''
}

export default {
  MobileRouterName,
  RouterForToolBar,
  ConsultType,
  scrollToBottom,
  ProfileType,
  BooleanInt,
  PayType,
  TerminalType,
  InvTypeTabOpt,
  ReasonHtml,
  ReasonType,
  RefundStatusIcon
}
