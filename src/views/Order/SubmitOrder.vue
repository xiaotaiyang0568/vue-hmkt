<template>
  <div class="content">
    <mt-header title="支付" class="gmkt-header"></mt-header>
    <div class="main">
      <merchandise :merchandise="merchandise"></merchandise>
      <div class="pay">
        <div class="type" v-for="item in options" :key="item.id">
          <img :src="baseUrl+item.path" class="img">
          <div class="label">{{item.text}}</div>
          <div class="radio-beauty-container radio" @click="onCheck(item)">
            <label>
              <!--<span class="radio-name">radio1</span>-->
              <input type="radio" name="payType" hidden :value="item.type" :id="item.type" :ref="item.ref" :checked="item.check"/>
              <label :for="item.id" class="radio-beauty"></label>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import merchandise from '../../components/merchandise.vue'
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    mounted () {
      this.orderId = this.$route.query.orderId
    },
    data () {
      return {
        orderId: null,
        baseUrl: '/static/imgs/',
        checked: null,
        checkedType: 1,
        options: [
          {id:1, check: true, ref: 'zhifubao', path: 'zhifubaopay.svg', text: '支付宝支付',type: 1 },
          {id:2, check: false, ref: 'wechat', path: 'wechatpay.svg', text: '微信支付',type: 2   }
        ]
      }
    },
    components: {
      merchandise
    },
    methods: {
      ...mapMutations(['setPayType']),
      onCheck (item) {
        this.checkedType = item.type
        this.setPayType(this.checkedType)
//        console.log('wechat',this.$refs.wechat[0].checked)
//        console.log('zhifubao',this.$refs.zhifubao[0].checked)
        console.log('oncheck', item)
      }
    },
    computed: {
      ...mapGetters({
        merchandise: 'getMerchandise',
        productQuantity: 'productQuantity'
      })
    }
  }
</script>
<style scoped>
  .content{
    height:92%;
  }
  .main{
    height: 20rem;
    display: flex;
    flex-direction: column;
    /*margin-bottom: 1.5rem;*/
    background-color: rgb(242,242,242);
    box-shadow: #666 0 0 0.3rem;
    margin:0 0.3rem;
  }

  .pay{
    margin-top: 0.3rem;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  .type{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 1.5rem;
    margin: 0 0.5rem;
  }
  .img{
    width: 0.7rem;
    color: #427E43;
    padding-right: 0.2rem;
  }
  .label{
    font-size: 0.38rem;
  }
  .radio{
    right: 0.6rem;
    position: absolute;
  }

  .radio-beauty-container {
    font-size: 0;
  }
  .radio-beauty-container .radio-beauty:hover, .radio-beauty-container input[type="radio"]:checked + .radio-beauty {
    padding: 2px;
    background-color: #427E43;
    background-clip: content-box;
  }
  .radio-beauty-container .radio-name {
    vertical-align: middle;
    font-size: 16px;
  }
  .radio-beauty-container .radio-beauty {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #427E43;
    vertical-align: middle;
    margin: 0 15px 0 3px;
    border-radius: 50%;
  }
  .radio-beauty-container .radio-beauty:hover {
    /*box-shadow: 0 0 7px #427E43;*/
  }
</style>