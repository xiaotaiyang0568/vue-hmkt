<template>
  <div class="main" id="order">
    <div class="fixed">
      <mt-header title="我的订单" class="gmkt-header"></mt-header>
      <mt-navbar v-model="selected" style="padding: 0 0.2rem;">
        <mt-tab-item :id="item.dictKey" v-for="item in orderTypeOpts" :key="item.dickKey" @click.native="clickItem(item)">{{item.dictValue}}
          <mt-badge type="success" style="margin: -0.5rem -0.2rem;background-color: rgb(77, 134, 0);
                                          top: 2.2rem;font-size: 0.3rem;padding: 2px 5px;
                                          position: absolute;">{{item.count}}</mt-badge>
        </mt-tab-item>
        <!--color: #4caf50;background-color: unset;-->
      </mt-navbar>
    </div>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" style="margin: 3rem 0;" ref="myOrder">
      <mt-tab-container-item :id="selected">
        <div v-if="orderList.length === 0" class="nothing">
          <img style="    width: 6rem;
                height: 100%;" :src="baseUrl+'noorders.png'">
          <div style="font-size: 0.4rem;color: #666;">您还未有订单！</div>
        </div>
        <div v-else v-for="(item, index) in orderList" :key="item.orderNo" :id="'anchor-'+index">
          <ul class="nav">
            <div class="nav-item">
              <div class="desc2" @click="clickOrder('#anchor-'+index,item)">
                <div class="display">
                  <img :src="baseUrl+item.merchandises[0].icon">
                  <merchandise-name style="width: 65%;" :fromOrder="true"></merchandise-name>
                  <div class="font2 right-div">¥ {{item.payPrice}}.00</div>
                </div>
                <!--<div>-->
                  <!--<i slot="icon" class="icon iconfont icon-rightarrow1f"></i>-->
                <!--</div>-->
              </div>
              <div class=" desc1 right-count">
                x {{item.merchandises.length}}
              </div>
              <div class="desc1">
                <div class="font2 right-div" align="right">共计1件商品 合计：¥ {{item.payPrice}}.00</div>
              </div>
            </div>
            <order-buttons :order="item" @loadData="loadData"></order-buttons>
          </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <!--<footer-tip style="margin-top: -3.3rem;"></footer-tip>-->
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import merchandiseName from '../../../components/merchandiseName.vue'
  import orderButtons from './components/orderButtons.vue'
  import footerTip from '../../../components/footerTip.vue'
  export default {
    mounted () {
      this.selected = this.selectedTab
      this.loginCheck(this)
      this.clickItem({dictKey: this.selected})
    },
    created () {
//      window.addEventListener('scroll', this.onScrollScreen())
      window.onscroll = function(e){
        console.log('onscroll')
      }
    },
    watch: {
      'orderList': function (val) {
        this.$nextTick(() => {
          let s = this.orderSelector
          console.log('orderSelector')
          if (!this.isBlank(s)) {
//            this.$el.querySelector(s).scrollIntoView()
            document.querySelector("#order").scrollTop = this.$el.querySelector(s).offsetTop;
          }
        })
      },
      'selected': function (val) {
//        this.setOrderSelector('')
      }
    },
    data () {
      return {
        data: '',
        selected: 0,
        orderList: [],
        liteCounts:[],
        baseUrl: '/static/imgs/'
      }
    },
    components: {
      merchandiseName,
      orderButtons,
      footerTip
    },
    methods: {
      onScrollScreen () {
        console.log('onScrollScreen')
      },
      ...mapMutations(['setLoadingStatus', 'setProductQuantity', 'setOrderSelector', 'setSelectedTab']),
      loadData () {
        this.clickItem({dictKey: this.selected})
      },
      clickOrder (selector, item) {
        this.setOrderSelector(selector)
        this.setSelectedTab(this.selected)
        this.$router.push({name: this.RouterName.orderDetail, query: {orderId: item.orderId}})
      },
      clickItem (item) {
        if (this.isBlank(item.dictKey)) {
          return
        }
        this.setLoadingStatus(true)
        this.getRequestApi('loadMyOrders', item.dictKey).then(res => {
          if (res && res.data.code === 0) {
            this.orderList = res.data.result.orders
            this.liteCounts = res.data.result.liteCounts
            this.setLoadingStatus(false)
          }
        })
      }
    },
    computed: {
      ...mapGetters(['getMetaOrderType', 'userInfo', 'orderSelector', 'selectedTab']),
      orderTypeOpts () {
        let opts = this.getMetaOrderType
        let counts = this.liteCounts
        if (counts.length === 0) {
          return {}
        }
        opts.forEach(r => {
          let c = counts.filter(f => r.dictKey === f.status)[0]
          r.count = r.count = c ? c.count : 0
        })
        return opts
      }
    }
  }
</script>
<style scoped>
  .main{
    height: 20rem;
    overflow-y: auto;
    background-color: #f2f4f7;
  }
  .nav{
    padding: 0;
    list-style-type: none;
    background-color: white;
  }
  .nav-item{
    height: 3rem;
    background-color: white;
    display: flex;
    flex-direction: column;
  }

  .desc1{
    display: flex;
    flex-direction: row;
    margin: 0.3rem;
  }
  .font1{
    font-size: 0.4rem;
    width: 70%;
  }

  .font2{
    font-size: 0.35rem;
    /*right: 0.6rem;*/
    /*position: absolute;*/
  }

  .desc2{
    display: flex;
    flex-direction: row;
    margin: 0.3rem;
    height: 2rem;
    align-items: center;
  }

  .display{
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .p{
    font-size: 0.4rem;
  }

  .fixed {
    position: fixed;
    top: 0;
    height: 3rem;
    width: 100%;
    z-index: 1000;
  }
  img {
    width: 1.2rem;
    height: 1.2rem;
    margin-right:0.2rem;
  }

  .right-div{
    text-align: right;
    margin: 0px 0px 0px auto;
  }

  .right-count{
    text-align: right;
    margin: -1rem 0.3rem 0.5rem auto;
  }

</style>