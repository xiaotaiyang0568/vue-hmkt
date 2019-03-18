<template>
  <div class="main">
    <mt-header title="我的发票抬头" class="gmkt-header"></mt-header>
    <ul class="nav-ul">
      <li v-for="inv in invTitleList" class="nav-li">
        <div class="address">
          <div class="desc1">
            <div class="font1">{{inv.enterpriseName}}</div>
          </div>
          <div class="desc2">
            <div class="display">
              <p class="p">{{inv.isDefault===1?'默认':''}}</p>
            </div>
            <!--<i class="icon iconfont icon-delete" style="right: 0.3rem;position: absolute;color: darkcyan;-->
                                          <!--font-size: 0.5rem;" @click="clickDelete(item)"></i>-->
          </div>
        </div>
      </li>
    </ul>
    <div>
      <!--<mt-button size="normal" class="left">删除</mt-button>-->
      <mt-button size="normal" type="primary" class="right" @click="addAddTitle">
        <i class="icon iconfont icon-add" style="margin-right: 0.3rem;"></i>添加发票抬头</mt-button>
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
      ...mapGetters(['invTitleList'])
    },
    data () {
      return {
        isSelectAddress: false
      }
    },
    methods: {
      ...mapMutations(['setInvTitleList']),
      clickDelete (item) {
        // todo clickDelete
      },
      addAddTitle () {
        this.$router.push({name: this.RouterName.addInvTitle})
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