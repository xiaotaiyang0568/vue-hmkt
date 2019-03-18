<template>
  <div>
    <mt-header title="申请退款" :fixed="true"></mt-header>
    <div class="content">
      <merchandise v-if="order.merchandises" :merchandise="order.merchandises[0]"></merchandise>
      <mt-cell title="订单金额" :value="'¥ '+order.payPrice+'.00'"></mt-cell>
      <mt-cell title="退款原因" :value="reason" is-link @click.native="selectReason"></mt-cell>
    </div>
    <div>
      <mt-button size="normal" type="primary" class="right" @click="submitRefund">
        <i class="icon iconfont icon-baocun" style="margin-right: 0.3rem;"></i>确定</mt-button>
    </div>
  </div>
</template>
<script>
  import merchandise from '../../../components/merchandise.vue'
  import {mapGetters} from 'vuex'
  import util from '../../../util/util'
  export default {
    mounted () {
      this.order = JSON.parse(this.$route.query.order)
    },
    data () {
      return {
        order: {},
        reasonDesc: '',
        reasonType: null
      }
    },
    components: {
      merchandise
    },
    methods: {
      submitRefund () {
        if (this.isBlank(this.reasonType)) {
          this.$messagebox.alert('请选择退款原因').then(res => {
            this.selectReason()
          })
          return
        }
        if (parseInt(this.reasonType) === util.ReasonType.other && this.isBlank(document.getElementById('otherReason').value)) {
          this.$messagebox.alert('当退款原因为其他时，请写明其他原因').then(res => {
            this.selectReason(this.checkReasonCallBack())
          })
          return
        }
        this.refund()
      },
      refund () {
        let param = {}
        param.orderId = this.order.orderId
        param.reason = parseInt(this.reasonType)
        if (parseInt(this.reasonType) === util.ReasonType.other) { // 其他
          param.otherRemark = document.getElementById('otherReason').value
        }
        this.postRequest('applyRefund', param).then(res => {
          if (res.data.code === 0) {
            this.$toast('已提交')
          this.$router.push({name: this.RouterName.myOrder})
          // this.$emit('loadData')
          } else if (res.data.code === 1) {
            this.$messagebox.alert(res.data.message).then(res => {
              this.selectReason(this.checkReasonCallBack())
            })
          }
        })
      },
      selectReason (callback) {
        let value = ''
        this.$messagebox.confirm('请选择退款原因(必填)：', {
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
              this.reasonDesc = this.refundReasonMap[parseInt(value)]
            }
          })
          this.reasonType = value
          if (this.isBlank(value)) {
            this.$messagebox.alert('请选择退款原因').then(res => {
              this.selectReason()
            })
          } else {
            // todo
          }

        }).catch(res => {})
        this.$nextTick(() => {
          let radios = document.getElementsByName('reason')
          for (let i=0, iLen=radios.length; i<iLen; i++) {
            let val = radios[i]
            val.onclick = function() {
              if (parseInt(val.value) === 100) {
                document.getElementById('otherReason').style.display = 'block'
              } else
                document.getElementById('otherReason').style.display = 'none'
            }
          }
          if (typeof callback === 'function') {
            callback()
          }
        })
      },
      checkReasonCallBack () {
        console.log('checkReasonCallBack')
        this.$nextTick(() => {
          document.getElementsByName('reason').forEach(r => {
            if (parseInt(r.value) === util.ReasonType.other) {
              r.checked = true
              document.getElementById('otherReason').style.display = 'block'
            }
          })
        })
      }
    },
    computed: {
      ...mapGetters(['refundReasonMap']),
      reason () {
        if (!this.isBlank(this.reasonDesc)) {
          return this.reasonDesc
        }
        return '请选择'
      }
    }
  }
</script>
<style scoped>
  .content{
    margin-top:1.5rem;
  }
</style>