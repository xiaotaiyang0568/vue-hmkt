import Vue from 'vue'
import Router from 'vue-router'
import util from '../util/util'
import Consult from '@/views/consult/Consult'
Vue.use(Router)

export default new Router({
  routes: [
    // {
      // path: '/home',
      // name: 'Home',
      // component: resolve => require(['@/views/Home/Home'], resolve),
      // children:[
      //   {
      //     path: '',
      //     redirect: 'recommend'
      //   },
      //   { path: 'recommend', component: recommend, name: 'recommend' },
      //   { path: 'classic', component: classic, name: 'classic' },
      //   { path: 'major', component: major, name: 'major' },
      //   { path: 'expert', component: expert, name: 'expert' },
      // ]
    // },
    // {
    //   path: '/mystudy',
    //   name: 'Mystudy',
    //   component: resolve => require(['@/views/Mystudy'], resolve),
    // },
    // {
    //   path: '/classify',
    //   name: 'Classify',
    //   component: resolve => require(['@/views/Classify'], resolve),
    // },
    // {
    //   path: '/home/coursedetails',
    //   name: 'Coursedetails',
    //   component: resolve => require(['@/views/Coursedetails/Coursedetails'], resolve),
      // children:[
      //   {
      //     path: '',
      //     redirect: 'introduce'
      //   },
      //   { path: 'introduce', component: introduce, name: 'introduce' },
      //   { path: 'catalog', component: catalog, name: 'catalog' },
      //   { path: 'comment', component:comment, name: 'comment' },
      // ]
    // },
    // {
    //   path: '/classifydetails',
    //   name: 'Classifydetails',
    //   component: resolve => require(['@/views/Classifydetails'], resolve),
    //   children:[
    //   ]
    // },
    // {
    //   path: '/home/search',
    //   name: 'search',
    //   component: resolve => require(['@/components/search'], resolve),
    //
    // },
    {
      path: '/account/login',
      name: util.MobileRouterName.login,
      meta: {index: 4},
      component: resolve => require(['@/views/Login'], resolve).default
    },
    // {
    //   path:'/account/setting',
    //   component: resolve => require(['@/views/Account/setting'], resolve),
    // },
    {
      path: '*',
      name: 'notfound',
      component: resolve => require(['@/components/NotFound'], resolve).default
    },
    {
      path: '/account/userInfo',
      meta: {index: 5.5},
      name: util.MobileRouterName.userInfo,
      component: resolve => require(['@/views/Account/userInfo/UserInfo'], resolve).default,
    },
    {
      path: '/',
      name: util.MobileRouterName.buy,
      meta: {index: 1},
      component: resolve => require(['@/views/Buy'], resolve).default
    },
    {
      path: '/sample',
      name: util.MobileRouterName.sample,
      meta: {index: 2},
      component: resolve => require(['@/views/Sample'], resolve).default
    },
    {
      path: '/account',
      name: util.MobileRouterName.account,
      meta: {index: 3},
      component: resolve => require(['@/views/Account/Account'], resolve).default
    },
    {
      path: '/buy/consult',
      name: util.MobileRouterName.consult,
      meta: {index: 5},
      component: Consult//resolve => require(['@/views/consult/Consult'], resolve)
    },
    {
      path: '/buy/inputOrder',
      name: util.MobileRouterName.inputOrder,
      meta: {index: 6},
      component: resolve => require(['@/views/Order/InputOrder'], resolve).default
    },
    {
      path: '/buy/submitOrder',
      name: util.MobileRouterName.submitOrder,
      meta: {index: 7},
      component: resolve => require(['@/views/Order/SubmitOrder'], resolve).default
    },   //
    {
      path: '/account/myReport',
      name: util.MobileRouterName.myReport,
      meta: {index: 8},
      component: resolve => require(['@/views/Account/myReport/myReport'], resolve).default
    },
    {
      path: '/account/reportDetail',
      name: util.MobileRouterName.reportDetail,
      meta: {index: 8.5},
      component: resolve => require(['@/views/Account/myReport/reportDetail'], resolve).default
    },
    {
      path: '/account/myOrder',
      name: util.MobileRouterName.myOrder,
      meta: {index: 9},
      component: resolve => require(['@/views/Account/myOrder/myOrder'], resolve).default
    },
    {
      path: '/account/myCoupon',
      meta: {index: 10},
      name: util.MobileRouterName.myCoupon,
      component: resolve => require(['@/views/Account/myCoupon'], resolve).default
    },
    {
      path: '/account/question',
      meta: {index: 11},
      name: util.MobileRouterName.question,
      component: resolve => require(['@/views/Account/question'], resolve).default
    },
    {
      path: '/account/customerService',
      meta: {index: 12},
      name: util.MobileRouterName.customerService,
      component: resolve => require(['@/views/Account/customerService'], resolve).default
    },
    {
      path: '/account/aboutGCCheck',
      meta: {index: 13},
      name: util.MobileRouterName.aboutGCCheck,
      component: resolve => require(['@/views/Account/aboutGCCheck'], resolve).default
    },
    {
      path: '/account/myInvoice',
      meta: {index: 14},
      name: util.MobileRouterName.myInvoice,
      component: resolve => require(['@/views/Account/myInvoice'], resolve).default
    },
    {
      path: '/account/expressAddress',
      meta: {index: 15},
      name: util.MobileRouterName.expAddress,
      component: resolve => require(['@/views/Account/userInfo/expAddress/expAddress'], resolve).default
    },
    {
      path: '/account/addExpressAddress',
      meta: {index: 16},
      name: util.MobileRouterName.addExpAddress,
      component: resolve => require(['@/views/Account/userInfo/expAddress/addExpAddress'], resolve).default
    },
    {
      path: '/account/editExpressAddress',
      meta: {index: 17},
      name: util.MobileRouterName.editExpAddress,
      component: resolve => require(['@/views/Account/userInfo/expAddress/editExpAddress'], resolve).default
    },
    {
      path: '/account/changePhone',
      meta: {index: 18},
      name: util.MobileRouterName.changePhone,
      component: resolve => require(['@/views/Account/userInfo/changePhone'], resolve).default
    },
    {
      path: '/order/payResult',
      meta: {index: 19},
      name: util.MobileRouterName.payResult,
      component: resolve => require(['@/views/Order/PayResult'], resolve).default
    },
    {
      path: '/account/orderDetail',
      meta: {index: 20},
      name: util.MobileRouterName.orderDetail,
      component: resolve => require(['@/views/Account/myOrder/orderDetail'], resolve).default
    },
    {
      path: '/order/agreement',
      meta: {index: 21},
      name: util.MobileRouterName.agreement,
      component: resolve => require(['@/views/Order/agreement'], resolve).default
    },
    {
      path: '/account/invTitle',
      meta: {index: 22},
      name: util.MobileRouterName.invTitle,
      component: resolve => require(['@/views/Account/userInfo/invoice/invTitle'], resolve).default
    },
    {
      path: '/account/addInvTitle',
      meta: {index: 23},
      name: util.MobileRouterName.addInvTitle,
      component: resolve => require(['@/views/Account/userInfo/invoice/addInvTitle'], resolve).default
    },
    {
      path: '/order/inputInvoice',
      meta: {index: 24, keepAlive: true},
      name: util.MobileRouterName.inputInv,
      component: resolve => require(['@/views/Order/invoice/inputInvoice'], resolve).default
    },
    {
      path: '/account/invAddress',
      meta: {index: 25},
      name: util.MobileRouterName.invAddress,
      component: resolve => require(['@/views/Account/userInfo/invoice/invAddress'], resolve).default
    },
    {
      path: '/account/addInvAddress',
      meta: {index: 26},
      name: util.MobileRouterName.addInvAddress,
      component: resolve => require(['@/views/Account/userInfo/invoice/addInvAddress'], resolve).default
    },
    {
      path: '/account/editInvAddress',
      meta: {index: 27},
      name: util.MobileRouterName.editInvAddress,
      component: resolve => require(['@/views/Account/userInfo/invoice/editInvAddress'], resolve).default
    },
    {
      path: '/account/refundAfterSale',
      meta: {index: 28},
      name: util.MobileRouterName.refundAfterSale,
      component: resolve => require(['@/views/Account/myRefund/refundAfterSale'], resolve).default
    },
    {
      path: '/account/refundDetail',
      meta: {index: 28},
      name: util.MobileRouterName.refundDetail,
      component: resolve => require(['@/views/Account/myRefund/refundDetail'], resolve).default
    },
    {
      path: '/account/refund',
      meta: {index: 29},
      name: util.MobileRouterName.refund,
      component: resolve => require(['@/views/Account/myOrder/refund'], resolve).default
    }
  ]
})
