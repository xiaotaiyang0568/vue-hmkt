<template>
  <div>
    <mt-header title="发票信息">
      <mt-button slot="left" @click.native="clickCancel">取消</mt-button>
      <mt-button slot="right" @click.native="clickComplete">完成</mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="0">不开发票</mt-tab-item>
      <!--<mt-tab-item id="1">电子发票</mt-tab-item>-->
      <mt-tab-item id="2">增值税普通发票</mt-tab-item>
      <mt-tab-item id="3">增值税专用发票</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="inv-reg">
          <ul>
            <li>
              <div class="inv-title">发票抬头类型</div>
              <div class="inv-item">
                <mt-button v-for="item in typeOptions" :key="item.id" size="normal" :class="item.className" plain @click.native="clickTitle(item)" :style="item.style">{{item.text}}</mt-button>
                <!--<mt-button size="normal" class="inv-sel" plain @click.native="clickTitle(2)">单位</mt-button>-->
              </div>
            </li>
          </ul>
          <ul v-if="invRegularType===1">
            <mt-field label="个人发票姓名" placeholder="请输入个人发票姓名" v-model="userName"></mt-field>
            <mt-cell title="发票邮寄地址是否与收货地址一致">
              <mt-switch v-model="isSameAsExpAddr"></mt-switch>
            </mt-cell>
          </ul>
          <ul v-if="invRegularType===2">
            <mt-cell title="单位名称" :value="invContent" is-link @click.native="toInvTitle(2)"></mt-cell>
            <mt-cell title="发票邮寄地址是否与收货地址一致">
              <mt-switch v-model="isSameAsExpAddr"></mt-switch>
            </mt-cell>
          </ul>
          <ul v-if="!isSameAsExpAddr">
            <mt-cell title="发票寄送地址" :value="invAddressName" is-link @click.native="toInvAddress"></mt-cell>
          </ul>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="inv-reg">
        <mt-cell title="单位名称" :value="invContent" is-link @click.native="toInvTitle(3)"></mt-cell>
        <mt-cell title="发票邮寄地址是否与收货地址一致">
          <mt-switch v-model="isSameAsExpAddr"></mt-switch>
        </mt-cell>
        <ul v-if="!isSameAsExpAddr">
          <mt-cell title="发票寄送地址" :value="invAddressName" is-link @click.native="toInvAddress"></mt-cell>
        </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  const style = ''
  const styleActive = 'border: 1.5px solid #558b02;'
  import {mapGetters, mapMutations} from 'vuex'
  import util from '../../../util/util'
  export default {
    monted () {
      this.invOptions = this.getInvType
    },
    data () {
      return {
        typeOptions: [
          {id: 1, text: '个人', className: 'inv-sel btn-left', style: style},
          {id: 2, text: '单位', className: 'inv-sel', style: style}
        ],
        userName: null,
        isSameAsExpAddr: true,
        userCode: null,
        selected: util.InvTypeTabOpt.none,
        invType: null,
        invRegularType: null,
        invSpecialType: null,
        invOptions: [],
        activeItem: {}
      }
    },
    components: {
    },
    watch: {
      'selected': function (val, old) {
        if (val !== util.InvTypeTabOpt.none) {
          this.setIsNeedInv(true)
        } else {
          this.setIsNeedInv(false)
        }
        if (old === util.InvTypeTabOpt.regular && val === util.InvTypeTabOpt.special) {
          if (this.isBlank(this.invTitle.enterpriseBankName)) {
            this.setInvTitle({})
          }
        }
      }
    },
    computed: {
      ...mapGetters(['invTitle', 'orderInvAddr', 'getInvType']),
      invContent () {
        if (this.invTitle.enterpriseName) {
          return this.invTitle.enterpriseName
        }
        return '选择单位'
      },
      invAddressName () {
        if (this.orderInvAddr) {
          return this.orderInvAddr.expressAddress
        }
        return '选择发票寄送地址'
      }
    },
    methods: {
      ...mapMutations(['setInvTitle', 'setOrderInv','setIsNeedInv']),
      clickItem (item) {},
      clickTitle (item) {
        console.log('clickTitle')
        item.style = styleActive
        this.typeOptions.forEach(r => {
          if (r.id !== item.id) {
            r.style = style
          }
        })
        this.activeItem = item
        this.invRegularType = item.id
      },
      toInvTitle (type) {
        this.$router.push({name: this.RouterName.addInvTitle,
          query: {type: type}})
      },
      toInvAddress () {
        this.$router.push({name: this.RouterName.invAddress, query: {isSelAddr: true}})
      },
      clickComplete () {
        let orderInv = {}
        orderInv.expressAddress = this.isBlank(this.orderInvAddr) ? '' : this.orderInvAddr.expressAddress
        orderInv.expressContact = this.isBlank(this.orderInvAddr) ? '' : this.orderInvAddr.consignee
        orderInv.expressMobile  = this.isBlank(this.orderInvAddr) ? '' : this.orderInvAddr.expressMobile
        orderInv.invoiceType = parseInt(this.selected)
        orderInv.titleType = this.activeItem.id
        orderInv.invoicePersonalName = this.userName
        orderInv.enterpriseNo = this.invTitle.enterpriseNo
//        orderInv.enterpriseName = this.invTitle.enterpriseName
        this.setOrderInv(orderInv)
        this.$router.push({name: this.RouterName.inputOrder})
      },
      clickCancel () {
        this.$router.push({name: this.RouterName.inputOrder})
      }
    }
  }
</script>
<style scoped>
  .inv-reg{
    margin:0.3rem;
  }
  ul{
    padding: 0;
    list-style-type: none;
    background-color: white;
  }
  .inv-item{
    width:100%;
    display: flex;
    flex-direction: row;
  }
  .inv-title{
    margin:0.3rem 0;
  }
  .inv-sel{
    width:48%;
  }
  .btn-left{
    margin-right:4%;
  }
</style>