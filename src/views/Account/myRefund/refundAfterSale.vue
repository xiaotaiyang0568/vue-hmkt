<template>
  <div class="main">
    <mt-header title="退款/售后" :fixed="fixed">
      <mt-badge v-if="refundList" slot="right" type="success" style="margin: -0.5rem -0.2rem;background-color: rgb(77, 134, 0);
                                              right: 3.8rem; font-size: 0.3rem; padding: 4px 7px; position: absolute;">{{refundList.length}}</mt-badge></mt-header>
    <div class="content">
      <ul class="nav" v-if="refundList && refundList.length>0" v-for="(item ,idx) in refundList">
        <merchandise :merchandise="item.order.merchandises"></merchandise>
        <div class="btns-order margin">
          <i :class="refundStatusIcon(item)" style="font-size: 0.5rem;"></i>
          <div class="refund-font">{{refundStatus(item)}}</div>
          <div class="btns-btn color" @click="clickCheck(item)">查看详情</div>
        </div>
      </ul>
    </div>
    <!--<footer-tip></footer-tip>-->
  </div>
</template>
<script>
  import merchandise from '../../../components/merchandise.vue'
  import footerTip from '../../../components/footerTip.vue'
  import {mapGetters, mapMutations} from 'vuex'
  import util from '../../../util/util'
  export default {
    mounted () {
      this.loginCheck(this)
      this.getData()
    },
    components: {
      merchandise,
      footerTip
    },
    data () {
      return {
        fixed: true,
        refundList: []
      }
    },
    computed: {
      ...mapGetters(['refundStatusMap','userInfo'])
    },
    methods: {
      ...mapMutations(['setLoadingStatus']),
      refundStatusIcon (item) {
        return util.RefundStatusIcon[item.orderRefund.status]
      },
      refundStatus (item) {
        return this.refundStatusMap[parseInt(item.orderRefund.status)]
      },
      getData () {
        this.setLoadingStatus(true)
        this.postRequest('loadMyRefundOrders', null).then(res => {
          this.refundList = res.data.result
          this.setLoadingStatus(false)
        })
      },
      clickCheck (item) {
        this.$router.push({name: this.RouterName.refundDetail, query: {refundOrder: JSON.stringify(item)}})
      }
    }
  }
</script>
<style scoped>
  .main{
    background-color: #f2f4f7;
    overflow: auto;
    height: 18rem;
  }
  .content{
    margin-top:1.8rem;
  }
  .margin{
    margin-top: -0.5rem;
  }
  .nav{
    padding: 0;
    list-style-type: none;
    background-color: white;
  }
  .refund-font{
    margin-left: 0.1rem;
    font-size:0.35rem;
  }
</style>