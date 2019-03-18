<template>
  <div class="wrapper" ref="inputOrder">
    <mt-header title="填写订单" class="gmkt-header"></mt-header>
    <div class="main">
      <div class="merchan">
        <div class="merchan-desc">
          <img :src="baseUrl+merchandise.icon" style="width: 3rem;margin-right: 0.3rem;">
          <div class="desc">
            <merchandise-name :fromOrder=true style="width: 100%;"></merchandise-name>
            <!--<span style="font-size: 0.6rem;color: #000;">sssss</span>-->
            <div style="margin: 0.4rem 0;display: flex;flex-direction: row;width: 100%;">
              <a href="javascript:void 0" @click="changeQuantity(-1)" class="count" style="border-bottom-left-radius: 0.1rem;
            border-top-left-radius: 0.1rem;font-size: 0.7rem;">-</a>
              <input type="text" :value="productQuantity" disabled
                     style="width:1rem;height: 1rem;padding: 0;text-align: center;border: 1px solid gainsboro;
                            color: #666;
                            background-color: white;">
              <a href="javascript:void 0" @click="changeQuantity(1)" class="count" style="border-bottom-right-radius: 0.1rem;
            border-top-right-radius: 0.1rem;
            border-right: 1px solid gainsboro;
            border-left: none;">+</a>
            </div>
          </div>
          <!--<mt-field label="数字" placeholder="请输入数字" type="number" v-model="number"></mt-field>-->
        </div>

        <!--<div style="display: flex;flex-direction: row;height: 2rem;align-items: center">-->

        <!--</div>-->
      </div>
      <ul class="nav">
        <div class="address" v-if="expAddressDisplay">
          <div class="desc1">
            <div class="font1">{{expAddressDisplay.consignee}}</div>
            <div class="font2">{{expAddressDisplay.isDefault===1?'默认地址':''}}</div>
          </div>
          <div class="desc2" @click="clickAddress">
            <div class="display">
              <p class="p">{{expAddressDisplay.expressMobile}}</p>
              <p class="p" style="margin-top: 0;">{{expAddressDisplay.province}} {{expAddressDisplay.city}} {{expAddressDisplay.area}} {{expAddressDisplay.expressAddress}}</p>
            </div>
            <div>
              <i class="icon iconfont icon-rightarrow1f" style="color: #d9d9d9;font-weight: bold;"></i>
            </div>
          </div>
        </div>
      </ul>
      <!--<ul class="nav">-->
        <!--<mt-field label="收货人" placeholder="请输入收货人姓名" v-model="username"></mt-field>-->
        <!--<mt-field label="联系电话" placeholder="请输入收货人联系电话" v-model="username"></mt-field>-->
        <!--<mt-field label="所在区域" placeholder="请选择所在区域" v-model="region" :readonly=true @click.native.capture="showAddressPicker"></mt-field>-->
        <!--<mt-field label="详细地址" placeholder="请输入详细地址" v-model="username"></mt-field>-->
      <!--</ul>-->
      <ul class="nav">
        <!--<mt-cell title="优惠券" value="无可用" is-link @click.native="toMyCoupon"> </mt-cell>-->
        <mt-cell title="发票" :value=invDesc is-link @click.native="toMyInvoice"> </mt-cell>
        <mt-field label="备注" placeholder="请输入备注" type="textarea" v-model="remark"></mt-field>
      </ul>
      <ul class="nav">
        <mt-cell title="价格计算" :value="'¥'+merchandise.priceMin"></mt-cell>
        <!--<mt-cell title="优惠券抵扣" value="0"></mt-cell>-->
        <!--<mt-cell title="满减活动" value="0"></mt-cell>-->
      </ul>
      <div class="more">
        <p><i style="margin-right: 0.1rem;" class="icon iconfont icon-tedianquanchangbaoyou-copy"></i>顺丰包邮</p>
        <router-link to="/order/agreement"><i style="margin-right: 0.1rem;" class="icon iconfont icon-sanfangxieyi"></i>下单即为接受《吉凯检测商城购买协议》</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import merchandiseName from '../../components/merchandiseName.vue'
  import {mapGetters, mapMutations} from 'vuex'
  import util from '../../util/util'
  export default {
    mounted(){
      //初始化设备高度为设备高度height 100%
//      let orderHeight = window.innerHeight;
//      document.getElementById("three_level_address").style.height = orderHeight + 'px';
      this.$nextTick(() => {
        this.showLoginMsg(this.showAddressMsg)
        this.isExpAddressNull = this.isBlank(this.expressAddress) || this.expressAddress.length === 0
        if (this.isExpAddressNull && !this.isBlank(this.user.customerName)) {
          this.showAddressMsg()
        }
      })
    },
    data(){
      return{
        baseUrl: '/static/imgs/',
        number: '',
        remark: '',
        isExpAddressNull: false
      }
    },
    components: {
      merchandiseName
    },
    watch: {
      'remark': function (val) {
        this.setOrderRemark(val)
      }
    },
    methods:{
      ...mapMutations(['setProductQuantity', 'setOrderExpAddr', 'setOrderRemark']),
      showAddressMsg () {
        console.log('showAddressMsg')
        if (this.isExpAddressNull) {
          this.$messagebox.confirm('您还没有收货地址信息，去填写').then(res => {
            this.$router.push({name: this.RouterName.addExpAddress})
          }).catch(res => {
            this.$router.go(-1)
          })
        }
      },
      showLoginMsg (callback) {
        if (this.isBlank(this.user.customerName)) {
          this.$messagebox.confirm('请先登录').then(res => {
            this.$router.push({name: this.RouterName.login})
          }).catch(res => {
            this.$router.go(-1)
          })
        } else {
          callback()
        }
      },
      toMyCoupon () {
        this.$router.push({name: this.RouterName.myCoupon})
      },
      toMyInvoice () {
        this.$router.push({name: this.RouterName.inputInv})
      },
      changeQuantity (val) {
        let q = this.productQuantity
        if (val === 1) {
          q ++
          this.setProductQuantity(q)
        } else if (val === -1) {
          if (this.productQuantity === 1) {
            return
          }
          q --
          this.setProductQuantity(q)
        }
      },
      clickAddress () {
        this.$router.push({name: this.RouterName.expAddress, query: {isSelAddr: true}})
      }
    },
    computed: {
      ...mapGetters({
        merchandise: 'getMerchandise',
        expressAddress: 'expressAddress',
        user: 'userInfo',
        orderExpAddr: 'orderExpAddr',
        orderInv: 'orderInv',
        isNeedInv: 'isNeedInv',
        getInvTypeMap: 'getInvTypeMap',
        productQuantity: 'productQuantity'
      }),
      expAddressDisplay () {
        if (this.isBlank(this.orderExpAddr)) {
          let address = this.expressAddress
          if (this.isExpAddressNull || this.isBlank(address)) {
            return {}
          }
          let res = address[0]
          address.forEach(r => {
            if (r.isDefault === util.BooleanInt.yes) {
              res = r
            }
          })
          this.setOrderExpAddr(res)
          return res
        }
        return this.orderExpAddr
      },
      invDesc () {
        if (this.orderInv.invoiceType) {
          return this.getInvTypeMap[this.orderInv.invoiceType]
        }
        return '不开发票'
      }
    }
  }
</script>
<style lang="stylus" scoped>
.wrapper
  height: 16.2rem;
  overflow-y: auto;
  background-color #f2f4f7
  .main
    margin: 0 0.3rem;
    box-shadow: #DCDCDD 0 0 0.2rem;
    height: 19rem
    .merchan
      display: flex;
      flex-direction: column;
      height: 5rem;
      background-color: white;
      .merchan-desc
        display: flex;
        flex-direction: row;
        height: 3.5rem;
        align-items: center;
        width: 95%;
        margin-left: 2.5%;
        border-bottom: 1px solid gainsboro;
        .desc
          width: 100%
          display: flex;
          flex-direction: column;
          height: 2rem;
          margin-left: 0.2rem;
          .count
            font-size: 0.6rem;
            width: 1.2rem;
            border-top: 1px solid gainsboro;
            border-bottom: 1px solid gainsboro;
            border-left: 1px solid gainsboro;
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(247,247,247);
    .nav
      padding 0
      list-style-type none
      .address
        height 3rem
        background-color white
        display flex
        flex-direction column
        .desc1
          display flex
          flex-direction row
          margin 0.3rem
          .font1
            font-size 0.4rem
            width 70%
          .font2
            font-size 0.4rem
            /*right 0.6rem*/
            /*position absolute*/
        .desc2
          display flex
          flex-direction row
          margin 0.3rem
          height 2rem
          align-items center
          .display
            width 100%
            display flex
            flex-direction column
            .p
              font-size 0.4rem
      .nav-item
        .mint-cell
          background-position initial
          .mint-cell-wrapper
            /*font-size:0.4rem*/
            .mint-cell-title
              color red
              .mint-cell-text
                color red
                display block
                vertical-align: text-top
                font-size: 0.4rem;
              .icon
                vertical-align: text-top
                font-size 23px
                color #99a4bf
    .more
      margin: 0 0.3rem;

</style>
