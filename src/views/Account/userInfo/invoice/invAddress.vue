<template>
  <div class="main">
    <mt-header title="我的发票寄送地址" class="gmkt-header"></mt-header>
    <ul class="nav-ul">
      <li v-for="item in invAddressList" class="nav-li">
        <div class="address">
          <div class="desc1">
            <div class="font1">{{item.consignee}}</div>
            <div class="font2">{{item.isDefault===1?'默认地址':''}}</div>
          </div>
          <div class="desc2">
            <div class="display" @click="clickAddress(item)">
              <p class="p">{{item.expressMobile}}</p>
              <p class="p" style="margin-top: 0;">{{item.province}} {{item.city}} {{item.area}} {{item.expressAddress}}</p>
            </div>
            <i class="icon iconfont icon-bianji" style="color: rgb(207, 207, 207);
                        font-weight: bold;
                        font-size: 0.6rem;" @click="clickEditAddress(item)"></i>
          </div>
        </div>
      </li>
    </ul>
    <div>
      <!--<mt-button size="normal" class="left">删除</mt-button>-->
      <mt-button v-if="invAddressList" size="normal" type="primary" class="right" @click="addAddress" :disabled="invAddressList.length===3">
        <i class="icon iconfont icon-add" style="margin-right: 0.3rem;"></i>添加地址</mt-button>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    mounted () {
      this.isSelectAddress = this.$route.query.isSelAddr
    },
    computed: {
      ...mapGetters(['invAddressList'])
    },
    data () {
      return {
        isSelectAddress: false
      }
    },
    methods: {
      ...mapMutations(['setOrderInvAddr']),
      clickAddress (item) {
        if (this.isSelectAddress) {
          this.setOrderInvAddr(item)
          this.$router.go(-1)
          return
        }
        this.clickEditAddress(item)
      },
      clickEditAddress (item) {
        this.$router.push({name: this.RouterName.editInvAddress, query: {address: JSON.stringify(item)}})
      },
      addAddress () {
        this.$router.push({name: this.RouterName.addInvAddress})
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .main
    height: 20rem;
    overflow-y: auto;
    background-color #f2f4f7
    .nav-ul
      padding 0
      list-style-type none
      .nav-li
        border-bottom: 1px solid gainsboro;
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
            .font2
              font-size 0.4rem
              right 0.6rem
              position absolute
          .desc2
            display flex
            flex-direction row
            margin 0.3rem
            height 2rem
            align-items center
            .display
              display flex
              flex-direction column
              width 94%
              .p
                font-size 0.4rem
  .right
    background-color: rgb(85, 139, 2);
    width: 70%;
    margin-left: 15%;
    margin-top: 0.6rem;
    height: 1.2rem;
    border-radius: 0.6rem;
</style>