<template>
  <div class="tab" style="display: flex;
    justify-content: center;">
    <!--<div class="header item toolbar-item" style="padding: 0px" v-for="item in toolBarList" :key="item.id">-->
      <!--<button :ref="item.ref" class="ui button bar-button" :style="{'border-radius':0,'background-color': item.backgroundColor, 'color': item.color}" @click="clickToolBtn(item)">-->
        <!--<i :class="item.icon"></i>-->
        <!--{{item.text}}-->
      <!--</button>-->
    <!--</div>-->
    <div class="btns" v-show="$route.name==='buy'">
      <div class="buy-btns">
        <div style="color: rgb(26, 27, 31);
                    font-weight: 500;
                    font-size: 0.7rem;
                    margin: 0.2rem 0.3rem;">¥
        </div>
        <div style="color: rgb(26, 27, 31);
                    font-size: 1rem;
                    font-weight: 800;
                    margin-top: 0.3rem;">{{merchandise.priceMin}}
        </div>
      </div>
      <div class="buy-btns">
        <mt-button style="
                    width: 80%;
                    background-color: #70972C;
                    color: white;
                    font-size: 0.42rem;
                    border-radius: unset;" @click="clickBuy">立即购买
        </mt-button>
      </div>
      <!--<mt-button icon="icon iconfont icon-icon_account" style="width: 50%;border-radius: unset;" @click="clickBuy">立即购买</mt-button>-->
      <!--<mt-button icon="icon iconfont icon-icon_account" style="width: 50%;border-radius: unset;" @click="clickConsult">在线咨询-->
      <!--<mt-badge size="small" type="primary" style="top: -0.5px; position: absolute;">{{msgCount}}</mt-badge></mt-button>-->
    </div>
    <mt-tabbar v-if="isShowTabbar" fixed>
      <mt-tab-item v-for="item in toolBarList" :key="item.id" :id="item.text" :ref="item.ref" :style="item.tabStyle" class="tabbar-item" @click.native="clickToolBtn(item)">
        <!--<i slot="icon" :class="item.icon" :style="item.style"></i>-->
        <img style="width: 0.7rem; height: 0.7rem;" slot="icon" :src="baseUrl+item.imgUrl">
        <span :style="item.style">{{item.text}}</span>
      </mt-tab-item>
    </mt-tabbar>
    <div class="tab-pri" v-else-if="isShowPriceBar" fixed>
      <div class="tip">实际付款：</div>
      <div class="symbol">¥</div>
      <div class="pri">{{merchandise.priceMin*productQuantity}}</div>
      <div class="submit" @click="submitOrder">提交订单</div>
    </div>
    <div class="tab-pri" v-else-if="isShowPayBar" fixed>
      <div class="confirm" @click="confirmPay">确认支付 ¥ {{merchandise.priceMin*productQuantity}}</div>
    </div>
  </div>

</template>

<script>
const aStyle = 'background-color: #F7F8F9;border-right: 0.5px solid lightgrey;';
const bStyle = 'background-color: #F7F8F9;';
const aStyleActive = 'background-color: #F7F8F9;border-right: 0.5px solid lightgrey;';
const bStyleActive = 'background-color: #F7F8F9;';
const iconColor = "color: #5A5B5C;font-weight:400";
const iconColorActive ="color: rgb(112, 151, 44);font-weight:600";
import util from '../util/util'
import {mapMutations, mapGetters} from 'vuex'
//import consult from '../views/Consult/Consult'
import axios from 'axios'
export default {
  mounted () {
    this.toolBarBtnInitClick()
  },
  data () {
    return{
      baseUrl: '/static/imgs/',
      orderId: null,
      toolBarList: [
        {id: 1, imgUrl: 'buy.png', icon: 'icon iconfont icon-shouye', text: '我要购买', routerName: this.RouterName.buy, ref: 'ref_buy', style: iconColor, tabStyle: aStyle},
        // todo 一期无视频，隐藏
//        {id: 2, imgUrl: 'sample.png', icon: 'icon iconfont icon-leimupinleifenleileibie2', text: '采样指南', routerName: this.RouterName.sample, ref: 'ref_sample', style: iconColor, tabStyle: aStyle},
        {id: 3, imgUrl: 'account.png', icon: 'icon iconfont icon-icon_account', text: '我的', routerName: this.RouterName.account, ref: 'ref_account', style: iconColor, tabStyle: bStyle}]
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      payType: 'payType',
      merchandise: 'getMerchandise',
      productQuantity: 'productQuantity',
      orderExpAddr: 'orderExpAddr',
      orderInv: 'orderInv',
      isNeedInv: 'isNeedInv'
    }),
    isShowTabbar () {
      let routeLength = this.$route.path.split('/').length;
      // let home = this.$route.path.split('/')[1];
//      console.log('routeLength',this.$route.path.split('/'))
      return routeLength === 2  ? true : false;
    },
    isShowPriceBar () {
      return this.$route.name.indexOf(this.RouterName.inputOrder) > -1
    },
    isShowPayBar () {
      return this.$route.name.indexOf(this.RouterName.submitOrder) > -1
    }
  },
  beforeDestroy() {
    this.$root.Bus.$off('scrollToBottom')
  },
  watch: {
    '$route': function () {
      if (this.isShowTabbar) {
        this.toolBarBtnInitClick()
      }
      let name = this.$route.name
      let flag = this.isBlank(this.userInfo.customerName) // 是否登陆
//      if (name === this.RouterName.consult && flag) {
//        this.$router.push({name: this.RouterName.login})
//      }
      if (name === this.RouterName.consult) {
        this.loadMsgs()
      } else {
        this.clearTimeOut_()
      }
      if (!flag && (name === this.RouterName.buy)) { //  || name === this.RouterName.account
//        console.log('loadMsgsCount-tabbar')
        this.loadMsgsCount(this)
      } else {
        this.clearLoadMsgsCount()
      }
    }
  },
  methods:{
    ...mapMutations(['clearTimeOut_', 'loadMsgs', 'setMessageCount']),
    submitOrder () {
      let param = {}
      let mers = []
      let mer = {}
      let expAddr = this.orderExpAddr
      mer.merchandiseId = this.merchandise.merchandiseId
      mer.amount = this.productQuantity
      mers.push(mer)
      param.merchandiseInfo = mers
      param.deliveryInfo = {expressContact: expAddr.consignee, expressMobile: expAddr.expressMobile, expressAddress: expAddr.expressAddress}
      param.needInvoice = this.isNeedInv ? util.BooleanInt.yes : util.BooleanInt.no
      let inv = this.orderInv
      if (this.isNeedInv && this.isBlank(inv.expressAddress)) {
        inv.expressAddress = expAddr.expressAddress
        inv.expressContact = expAddr.consignee
        inv.expressMobile = expAddr.expressMobile
      }
      param.invoiceInfo = inv
      param.orderRemark = this.orderRemark
//      axios.post('http://localhost:8080/gcapi/submitOrder?Json='+JSON.stringify(param),null,{
//        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
//      }).then(res => {
//        if (res && res.data.code === 0) {
//          this.orderId = res.data.result
//          this.$router.push({name: this.RouterName.submitOrder, query: {orderId: res.data.result}})
//        }
//      })
      this.postRequestApi('submitOrder', param).then(res => {
        if (res && res.data.code === 0) {
          this.orderId = res.data.result
          this.$router.push({name: this.RouterName.submitOrder, query: {orderId: res.data.result}})
        }
      })
    },
    toolBarBtnInitClick () {
      this.$nextTick(() => {
        let name = this.$route.name
        let buy = this.$refs.ref_buy
        let sample = this.$refs.ref_sample
        let account = this.$refs.ref_account
        if (name === this.RouterName.buy && !this.isBlank(buy) && !this.isBlank(buy[0])) {
          buy[0].$el.click()
        } else if (name === this.RouterName.sample && !this.isBlank(sample) && !this.isBlank(sample[0])) {
          sample[0].$el.click()
        } else if (name === this.RouterName.account && !this.isBlank(account) && !this.isBlank(account[0])) {
          account[0].$el.click()
        }
      })
    },
    clickToolBtn (item) {
      let id = item.id
      item.imgUrl = id === 1 ? 'buy1.png' : id === 2 ? 'sample1.png' : 'account1.png'
      item.style = iconColorActive
      item.tabStyle = item.id === 3 ? bStyleActive : aStyleActive
      this.toolBarList.forEach(e => {
        let id_ = e.id
        if (id_ !== item.id) {
          e.imgUrl = id_ === 1 ? 'buy.png' : id_ === 2 ? 'sample.png' : 'account.png'
          e.style = iconColor
          e.tabStyle = e.id === 3 ? bStyle : aStyle
        }
      })
      this.$router.push({name: util.RouterForToolBar[item.id]})
      console.log('clickToolBtn', util.RouterForToolBar[item.id])
    },
    confirmPay () {
      let bt = this.BrowserType
      let tt = this.TeminalType
      let pt = this.payType
      let orderId = parseInt(this.$route.query.orderId)
      if (pt === util.PayType.alipay) { // 支付宝支付
        this.postRequest('aliPayWap', {payType: pt, payWay: tt.isTablet || tt.isPC ? util.TerminalType.ipadOrPC : util.TerminalType.phone , orderId: orderId}).then(res => { // 普通浏览器
          const div = document.createElement('div');
          div.innerHTML = res.data.result;
          document.body.appendChild(div);
          document.forms[0].submit();
        })
      }

    },
    clickBuy () {
      this.$router.push({name: this.RouterName.inputOrder})
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab
  .tabbar-item
    display: inline-block
    .icon
      font-size: 25px
  .mint-tabbar
    height: 9%
  .mint-tab-item
    vertical-align center
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
  .tab-pri
    border-top 0.5px solid gainsboro
    height 1.58rem
    display flex
    flex-direction row
    position: fixed;
    bottom 0
    width: 100%;
    background-color white
    //z-index 1000
    .tip
      font-size 0.5rem
      display flex
      justify-content center
      align-items center
      margin-left 0.2rem
      margin-right 0.2rem
    .symbol
      margin: 0.7rem 0.2rem;
      font-size 0.4rem
      display flex
      justify-content center
      align-items center
    .pri
      font-size 0.7rem
      display flex
      justify-content center
      align-items center
      font-weight 500
    .submit
      height 1.6rem
      width 3rem
      background-color #427E43
      color white
      right 0
      position absolute
      font-size 0.5rem
      display flex
      justify-content center
      align-items center
    .confirm
      background-color #427E43
      color white
      width 100%
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.55rem;
</style>

