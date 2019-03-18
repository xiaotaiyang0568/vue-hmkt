<template>
  <div class="main">
    <mt-header title="退款详情" :fixed="fixed"></mt-header>
    <div class="content" v-if="refundOrder.order">
      <merchandise :merchandise="refundOrder.order.merchandises"></merchandise>
      <mt-cell title="退款状态" :value="refundStatus"></mt-cell>
      <mt-cell title="退款说明" :value="refundOrder.orderRefund.operateExplain"></mt-cell>
      <mt-cell title="订单金额" :value="'¥ '+refundOrder.order.payPrice+'.00'"></mt-cell>
      <mt-cell title="申请日期" :value="refundOrder.orderRefund.createDT"></mt-cell>
      <mt-cell title="退款日期" :value="refundOrder.orderRefund.operateDT" v-if="refundOrder.orderRefund.operateDT!==''"></mt-cell>
      <mt-cell title="退款原因" :value="refundOrder.orderRefund.reason"></mt-cell>
      <mt-cell title="退款编号" :value="refundOrder.orderRefund.refundNo"></mt-cell>
      <mt-cell title="备注" :value="refundOrder.orderRefund.remark" v-if="refundOrder.orderRefund.remark && refundOrder.orderRefund.remark!==''"></mt-cell>
      <cus-server-tel style="margin-top: 0;"></cus-server-tel>
    </div>
  </div>
</template>
<script>
  import merchandise from '../../../components/merchandise.vue'
  import cusServerTel from '../../../components/cusServerTel.vue'
  import {mapGetters} from 'vuex'
  import util from '../../../util/util'
  export default {
    mounted () {
      this.refundOrder = JSON.parse(this.$route.query.refundOrder)
    },
    components: {
      merchandise,
      cusServerTel
    },
    data () {
      return {
        fixed: true,
        refundOrder: {}
      }
    },
    computed: {
      ...mapGetters(['refundStatusMap']),
      refundStatus () {
        return this.refundStatusMap[parseInt(this.refundOrder.orderRefund.status)]
      }
    },
    methods: {

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
    height:100%;
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
    margin-left: 0.2rem;
    font-size:0.35rem;
  }
  .status{
    font-size: 0.4rem;
    color:#427E43;
  }
</style>