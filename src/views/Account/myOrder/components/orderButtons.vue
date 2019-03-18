<template>
 <div>
   <div class="btns-order" v-if="order.status===1">
     <div class="btns-btn margin-right1" @click="clickCancelOrder">取消订单</div>
     <div class="btns-btn margin-right1" @click="clickBuy">再次购买</div>
     <div class="btns-btn color" @click="clickPay">去支付</div>
   </div>
   <div class="btns-order" v-if="order.status===2">
     <div class="btns-btn margin-right" @click="clickRefund">申请退款</div>
     <div class="btns-btn color" @click="clickBuy">再次购买</div>
   </div>
   <div class="btns-order" v-if="order.status===3">
     <div class="btns-btn margin-right" @click="clickRefund">申请退款</div>
     <div class="btns-btn margin-right1">确认收货</div>
     <div class="btns-btn color" @click="clickBuy">再次购买</div>
   </div>
   <div class="btns-order" v-if="order.status===4">
     <div class="btns-btn color" @click="clickBuy">再次购买</div>
   </div>
   <!--<div class="btns-order" v-if="item.status===4">-->
   <!--<div class="btns-btn margin-right1">申请退款</div>-->
   <!--<div class="btns-btn margin-right1">取消订单</div>-->
   <!--<div class="btns-btn color">确认寄回</div>-->
   <!--</div>-->
 </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import util from '../../../../util/util'
  export default{
    props: ['order'],
    methods: {
      ...mapMutations(['setProductQuantity']),
      clickPay () {
        this.setProductQuantity(this.order.merchandises.length)
        this.$router.push({name: this.RouterName.submitOrder, query: {orderId: this.order.orderId}})
      },
      clickCancelOrder (callback) {
        let value = ''
        this.$messagebox.confirm('请选择取消订单原因(必填)：', {
          message: util.ReasonHtml,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res => {
          console.log(res)
          let reasons = document.getElementsByName('reason')
          reasons.forEach(r => {
            if (r.checked) {
              value = r.value
            }
          })
          if (this.isBlank(value)) {
            this.$messagebox.alert('请选择取消订单原因').then(res => {
              this.clickCancelOrder()
            })
          } else {
            let param = {}
            param.orderId = this.order.orderId
            param.reason = value
            if (parseInt(value) === util.ReasonType.other) { // 其他
              param.otherRemark = document.getElementById('otherReason').value
            }
            this.postRequest('cancelOrder', param).then(res => {
              if (res.data.code === 0) {
                this.$toast('已取消')
                this.$emit('loadData')
              } else if (res.data.code === 1) {
                this.$messagebox.alert(res.data.message).then(res => {
                  this.clickCancelOrder(() => {
                    document.getElementsByName('reason').forEach(r => {
                      if (parseInt(r.value) === util.ReasonType.other) {
                        r.checked = true
                        document.getElementById('otherReason').style.display = 'block'
                      }
                    })
                  })
                })
              }
            })
          }
          console.log('check reason', value)
        }).catch(res => {})
        this.$nextTick(() => {
          if (typeof callback === 'function') {
            callback()
          }
        })
//        if ('\v' == 'v') {
//          document.getElementsByName('reason').attachEvent('onporpertychange', e => {
//            console.log('inputting', e)
//          })
//        } else {
//          document.getElementsByName('reason').addEventListener('onporpertychange', e => {
//            console.log('inputting1', e)
//          })
//        }
      },
      clickBuy () {
        this.setProductQuantity(1) // 再次购买，初始化商品数量
        this.$router.push({name: this.RouterName.inputOrder})
      },
      clickRefund () {
        this.setProductQuantity(this.order.merchandises.length)
        this.$router.push({name: this.RouterName.refund, query: {order: JSON.stringify(this.order)}})
      }
    }
  }
</script>
<style scoped>
  .input-other{
    width: 100%;
    height: 1rem;
    border: 1px solid gainsboro;
    border-radius: 0.3rem;
  }
</style>