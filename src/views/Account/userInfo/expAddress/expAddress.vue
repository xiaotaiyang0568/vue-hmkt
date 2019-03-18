<template>
  <div class="main">
    <mt-header title="我的收货地址" class="gmkt-header"></mt-header>
    <ul class="nav-ul">
      <li v-for="expAddressDisplay in expressAddress" class="nav-li">
        <div class="address">
          <div class="desc1">
            <div class="font1">{{expAddressDisplay.consignee}}</div>
            <div class="font2">{{expAddressDisplay.isDefault===1?'默认地址':''}}</div>
          </div>
          <div class="desc2">
            <div class="display" @click="clickAddress(expAddressDisplay)">
              <p class="p">{{expAddressDisplay.expressMobile}}</p>
              <p class="p" style="margin-top: 0;">{{expAddressDisplay.province}} {{expAddressDisplay.city}} {{expAddressDisplay.area}} {{expAddressDisplay.expressAddress}}</p>
            </div>
            <i class="icon iconfont icon-bianji" style="color: rgb(207, 207, 207);
                        font-weight: bold;
                        font-size: 0.6rem;" @click="clickEditAddress(expAddressDisplay)"></i>
          </div>
        </div>
      </li>
    </ul>
    <div>
      <!--<mt-button size="normal" class="left">删除</mt-button>-->
      <mt-button size="normal" type="primary" class="right" @click="addAddress" :disabled="expressAddress.length===3">
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
      ...mapGetters(['expressAddress'])
    },
    data () {
      return {
        isSelectAddress: false
      }
    },
    methods: {
      ...mapMutations(['setOrderExpAddr']),
      clickAddress (item) {
        if (this.isSelectAddress) {
          this.setOrderExpAddr(item)
          this.$router.go(-1)
          return
        }
        this.clickEditAddress(item)
      },
      clickEditAddress (item) {
        this.$router.push({name: this.RouterName.editExpAddress, query: {address: JSON.stringify(item)}})
      },
      addAddress () {
        this.$router.push({name: this.RouterName.addExpAddress})
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
              font-weight: 500;
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