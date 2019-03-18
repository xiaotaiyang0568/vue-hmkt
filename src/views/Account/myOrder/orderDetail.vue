<template>
  <div class="main">
    <div class="fixed">
      <mt-header title="订单详情" class="gmkt-header"></mt-header>
    </div>
    <div class="content" v-if="order.orderNo">
      <ul class="nav" style="display: flex;flex-direction: row;align-items: center">
        <i class="icon iconfont icon-shouhuodizhi location-i"></i>
        <div class="nav-item">
          <div class="desc1">
            <div class="font1 font-weight">{{order.deliveryInfo.expressContact}}</div>
            <div class="font2 font-weight">{{order.deliveryInfo.expressMobile}}</div>
          </div>
          <div class="desc1">
            <div class="font2">{{order.deliveryInfo.expressAddress}}</div>
          </div>
        </div>
      </ul>
      <ul class="nav">
        <div class="nav-item">
          <div class="desc2">
            <div class="display">
              <img :src="baseUrl+order.merchandises[0].merchandise.icon">
              <div class="desc-mer">
                <merchandise-name style="width: 65%;" :fromOrder="true"></merchandise-name>
                <div class="font2 pri">¥ {{order.payPrice}}.00 <span style="margin-left: 0.6rem;">x {{order.merchandises.length}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </ul>
      <ul class="nav">
        <div class="nav-item">
          <mt-cell title="订单编号" :value="order.orderNo"></mt-cell>
          <mt-cell title="订单时间" :value="order.createDT"></mt-cell>
          <!--<mt-cell id="payPrice" title="实付款" :value="'¥'+order.payPrice+'.00'"></mt-cell>-->
          <div class="display pay">
            <div class="desc-des">实付款</div>
            <div class="desc-pri">¥<span class="span-pri">{{order.payPrice}}.00</span></div>
          </div>
        </div>
        <order-buttons :order="order"></order-buttons>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import merchandiseName from '../../../components/merchandiseName.vue'
  import orderButtons from './components/orderButtons.vue'
  export default {
    mounted () {
      this.orderId = this.$route.query.orderId
      this.getData()
    },
    data () {
      return {
        data: '',
        selected: 0,
        orderList: [],
        baseUrl: '/static/imgs/',
        orderId: null,
        order: {}
      }
    },
    components: {
      merchandiseName,
      orderButtons
    },
    methods: {
      clickMerchandise (item) {
//        this.$router.push({name: this.RouterName.orderDetail, query: {order: item}})
      },
      clickItem (item) {
      },
      getData () {
        this.getRequestApi('loadOrderDetail', this.orderId).then(res => {
          if (res.data.code === 0) {
            this.order = res.data.result
          } else {
            this.$toast(res.data.message)
          }
        })
      }
    },
    computed: {
      ...mapGetters(['getMetaOrderType'])
    }
  }
</script>
<style scoped>
  .main{
    height: 18rem;
    overflow-y: auto;
    background-color: #f2f4f7;
  }
  .content{
    margin-top: 2rem;
  }
  .nav{
    padding: 0;
    list-style-type: none;
    background-color: white;
  }
  .nav-item{
    /*height: 3rem;*/
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    font-size: 0.4rem;
  }
  .pri{
    margin-top:0.2rem;
  }
  .font-weight{
    font-weight: 500;
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

  .desc-mer{
    display: flex;
    flex-direction: column;
    width:100%;
  }

  .fixed {
    position: fixed;
    top: 0;
    height: 3rem;
    width: 100%;
    z-index: 1000;
  }
  .location-i{
    padding-left: 1rem;
    font-size: 0.8rem;
    color: rgb(77, 134, 0);
  }

  img {
    width: 1.2rem;
    height: 1.2rem;
    margin-right:0.2rem;
  }

  #payPrice .mint-cell-wrapper .mint-cell-value span{
    font-weight: 500;
    font-size: 0.5rem;
  }

  .pay{
    height: 1.4rem;
    align-items: center;
    margin: 0 0.3rem;
  }

  .desc-des{
    font-size: 0.4rem;
  }
  .desc-pri{
    text-align: right;
    margin: 0px 0.6rem 0 auto;
  }
  .span-pri{
    font-size: 0.5rem;
    margin-left:0.2rem;
  }
</style>