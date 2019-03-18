import * as types from '../types'
import util from '../../util/util'
import {postRequest} from '../../api/apiService'
import {scrollToBottom} from '../../util/util'
/**
 * App通用配置
 */
const defaultMsg = {
  type: util.ConsultType.response,
  time: new Date().toLocaleTimeString(),
  content: '您好！欢迎来到吉凯检测，请问有什么能帮到您？如有疑问请在线咨询或者拨打<a href="tel:4006966603" style="color: #26a2ff">400-696-6603</a>咨询！感谢您的支持! '
}
let flag = false
const isBlank = (val) => {
  return val === '' || val === undefined || val === "" || val === null
}
function metaHandler(state, code) {
  let meta = state.merchandiseMeta
  if (!isBlank(meta)) {
    let obj = {}
    meta.dictionaries.forEach(r => {
      if (r.typeID === code) {
        obj[r.dictKey] = r.dictValue
      }
    })
    return obj
  }
  return []
}
const state = {
  loading: false,         //暂时只开发这一个
  showToast: false,
  leftNavStatus: false,
  showSuccess: true,
  showFail: false,
  messageCount: null,
  timeout: null,
  payType: 1,
  msgsRecords: [],
  xwBody: null,
  merchandiseMeta: null,
  merchandise: null,
  productQuantity: 1,
  sessionInfo: {},
  expressAddress: null,
  orderExpAddr: null,
  orderInv: {},
  isNeedInv: false, // 默认不开发票
  orderRemark: '',
  invTitleList: [],
  invAddressList: [],
  orderInvAddr: null,
  invTitle: {},
  isSearchEnterprise: false,
  orderSelector: '',
  selectedTab: 0
}
const actions = {
  setLoadingState({commit}, status) {
    commit(types.COM_LOADING_STATUS, status)
  },
}
const getters = {
  loading: state => state.loading,
  showToast: state => state.showToast,
  showAlert: state => state.showAlert,
  messageCount: state => state.messageCount,
  getMsgsRecords: state => state.msgsRecords,
  payType: state => state.payType,
  getMerchandise: state => !isBlank(state.merchandise) ? state.merchandise.merchandises[0] : {},
  productQuantity: state => state.productQuantity,
  // expressAddress: state => state.sessionInfo.expressAddress,
  expressAddress: state => state.expressAddress,
  invoiceAddress: state => state.sessionInfo.invoiceAddress,
  invoiceTitle: state => state.sessionInfo.invoiceTitle,
  orderExpAddr: state => state.orderExpAddr,
  orderInvAddr: state => state.orderInvAddr,
  orderInv: state => state.orderInv,
  isNeedInv: state => state.isNeedInv,
  orderRemark: state => state.orderRemark,
  getMerchandiseByGuid: (state, id) => !isBlank(state.merchandise) ? state.merchandise.merchandises.filter(r => r.merchandiseId === id)[0] : {},
  getMetaOrderType: state => !isBlank(state.merchandiseMeta) ? state.merchandiseMeta.dictionaries.filter(r => r.typeID === 20001) : [],
  getInvType: state => !isBlank(state.merchandiseMeta) ? state.merchandiseMeta.dictionaries.filter(r => r.typeID === 20002 && r.valid === 1) : [],
  getInvTypeMap: state => {
    return metaHandler(state, 20002)
  },
  checkStatusMap: state => {
    return metaHandler(state, 20004)
  },
  refundReasonMap: state => {
    return metaHandler(state, 20009)
  },
  refundStatusMap: state => {
    return metaHandler(state, 20010)
  },
  invTitleList: state => state.invTitleList,
  invAddressList: state => state.invAddressList,
  invTitle: state => state.invTitle,
  isSearchEnterprise: state => state.isSearchEnterprise,
  orderSelector: state => state.orderSelector,
  selectedTab: state => state.selectedTab
}
const mutations = {
  setLoadingStatus (state, status) {
    state.loading = status
  },
  setMessageCount (state, data) {
    state.messageCount = data
  },
  loadMsgs (state, data) {
    if (flag) { // 避免重复调用此方法
      return
    }
    time()
    function time() {
      postRequest('loadMessages', null).then(res => {
        if (res.data.code === 0) {
          // console.log('loadMessages')
          state.msgsRecords = res.data.result
          state.msgsRecords.unshift(defaultMsg)
          scrollToBottom(state.xwBody)
        }
      })
      state.timeout = setTimeout(function () {
        time()
      }, 15000)
    }
    flag = true
  },
  clearTimeOut_ (state, data) {
    clearTimeout(state.timeout)
    flag = false
  },
  setMsgsRecords (state, data) {
    state.msgsRecords.push(data)
  },
  setXwBody (state, data) {
    state.xwBody = data
  },
  setPayType (state, data) {
    state.payType = data
  },
  setMerchandiseMeta (state, data) {
    state.merchandiseMeta = data
  },
  setMerchandise (state, data) {
    state.merchandise = data
  },
  setProductQuantity (state, data) {
    state.productQuantity = data
  },
  setSessionInfo (state, data) {
    state.sessionInfo = data
  },
  setExpAddress (state, data) {
    state.expressAddress = data
  },
  setOrderExpAddr (state, data) {
    state.orderExpAddr = data
  },
  setOrderInv (state, data) {
    state.orderInv = data
  },
  setIsNeedInv (state, data) {
    state.isNeedInv = data
  },
  setOrderRemark (state, data) {
    state.orderRemark = data
  },
  setInvTitleList (state, data) {
    state.invTitleList = data
  },
  setInvAddressList (state, data) {
    state.invAddressList = data
  },
  setOrderInvAddr (state, data) {
    state.orderInvAddr = data
  },
  setInvTitle (state, data) {
    state.invTitle = data
  },
  setIsSearchEnterprise (state, data) {
    state.isSearchEnterprise = data
  },
  setOrderSelector (state, data) {
    state.orderSelector = data
  },
  setSelectedTab (state, data) {
    state.selectedTab = data
  }
}


export default {
  state,
  actions,
  getters,
  mutations
}