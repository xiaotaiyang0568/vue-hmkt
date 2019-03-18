<template>
  <div class="wrapper">
    <div class="user">
      <div class="login user-login" v-if="!user.customerName">
        <div class="wrap">
          <div class="button" @click="changeToLogin">登录</div>
        </div>
      </div>
      <div class="user-login" v-else>
        <router-link :to="{name: 'userInfo'}" style="height: 3.3rem;width: 100%;" id="user-info">
          <!--<img :src="user.src" alt="" class="avatar"/>-->
          <!--<mt-cell :title=user.customerName :label="user.customerNo" is-link style="background-color: unset;-->
                                                                                <!--display: flex;-->
                                                                                <!--align-items: center;-->
                                                                                <!--height: 100%;"></mt-cell>-->
          <div class="description">
            <div class="desc-img">
              <img class="img" :src="baseUrl+'customer.png'">
            </div>
            <div>
              <p class="title">{{user.customerName}}</p>
              <p class="title" style="margin-top: -0.2rem;font-weight: 300;">{{user.customerNo}}</p>
            </div>
            <i slot="icon" class="icon iconfont icon-1202youjiantou" style="right: 1.2rem;
                                                    position: absolute;font-size: 0.7rem;
                                                    color: white;"></i>
          </div>
        </router-link>
        <div style="
                  height: 1.2rem;
                  width: 100%;
                  align-items: center;
                  display: flex;
                  color: #22ad7b;
                  /* border: none; */
                  font-weight: 500;
                  font-size: 0.42rem;
                  background-color: white;
                  border-right: 1px solid #fff;" @click="checkReport"><span style="padding-left: 0.3rem">查看检测报告</span></div>
      </div>

    </div>

    <div class="check-list">
      <!--<ul class="nav">-->
        <!--<li class="nav-item">-->
          <!--<router-link :to="{name: 'myReport'}">-->
            <!--<div style="height: 60px;display: flex;align-items: center;font-size: 0.4rem;margin: 0.2rem;">-->
              <!--&lt;!&ndash;<i class="icon iconfont icon-iconxuexisel"></i>&ndash;&gt;-->
              <!--<span>查看检测报告</span>-->
            <!--</div>-->
          <!--</router-link>-->
        <!--</li>-->
      <!--</ul>-->

      <div style="margin-top: -0.5rem;">
        <ul class="nav">
          <div class="nav-item">
            <mt-cell title="我的订单" to="/account/myOrder" is-link>
              <!--<i slot="icon" class="icon iconfont icon-dingdan1-copy"></i>-->
            </mt-cell>
            <mt-cell title="退款/售后" to="/account/refundAfterSale" is-link>
              <!--<i slot="icon" class="icon iconfont icon-tui"></i>-->
            </mt-cell>

            <!--<mt-cell title="我的优惠券" to="/account/myCoupon" is-link>-->
            <!--<i slot="icon" class="icon iconfont icon-youhuiquan"></i>-->
            <!--</mt-cell>-->
          </div>
          <!--<li class="nav-item">-->

            <!--<div class="list-item">-->
              <!--<div class="list-div width">-->
                <!--<router-link :to="{name: 'myOrder'}">-->
                  <!--<div class="list-div">-->
                    <!--<i slot="icon" class="icon iconfont icon-dingdan"></i>-->
                    <!--<span class="span">我的订单</span>-->
                  <!--</div>-->
                <!--</router-link>-->
              <!--</div>-->
              <!--<div class="list-div width">-->
                <!--<router-link :to="{name: 'myCoupon'}">-->
                  <!--<div class="list-div">-->
                  <!--<i slot="icon" class="icon iconfont icon-youhuiquan"></i>-->
                  <!--<span class="span">我的优惠券</span>-->
                  <!--</div>-->
                <!--</router-link>-->
              <!--</div>-->
              <!--<div class="list-div width">-->
                <!--<router-link :to="{name: 'consult'}">-->
                  <!--<div class="list-div">-->
                  <!--<i slot="icon" class="icon iconfont icon-yuesel"></i>-->
                  <!--<span class="span">客服中心</span>-->
                  <!--</div>-->
                <!--</router-link>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
          <!--<li class="nav-item">-->
            <!--<div class="list-item">-->
              <!--<div class="list-div width">-->
                <!--<router-link :to="{name: 'question'}">-->
                  <!--<div class="list-div">-->
                  <!--<i slot="icon" class="icon iconfont icon-youhuiquan"></i>-->
                  <!--<span class="span">常见问题</span>-->
                  <!--</div>-->
                <!--</router-link>-->
              <!--</div>-->
            <!--</div>-->
          <!--</li>-->
        </ul>
      </div>
      <ul class="nav">
        <div class="nav-item">
          <mt-cell title="客服中心" to="/buy/consult" is-link>
            <!--<i slot="icon" class="icon iconfont icon-jkefu2-copy"></i>-->
          </mt-cell>
          <mt-cell title="常见问题" to="/account/question" is-link>
            <!--<i slot="icon" class="icon iconfont icon-question_fill-copy"></i>-->
          </mt-cell>
        </div>
      </ul>
      <ul class="nav">
        <div class="nav-item">
          <mt-cell title="购买协议" to="/order/agreement" is-link>
            <!--<i slot="icon" class="icon iconfont icon-sanfangxieyi"></i>-->
          </mt-cell>
        </div>
      </ul>
      <ul class="nav">
        <div class="nav-item">
          <mt-cell title="关于吉凯检验" to="/account/aboutGCCheck" is-link>
            <!--<i slot="icon" class="icon iconfont icon-guanyuwomen-copy"></i>-->
          </mt-cell>
        </div>
      </ul>
      <ul class="nav">
        <div class="nav-item" style="display: flex;flex-direction: row; justify-content: center;height: 1.5rem;align-items: center">
          <i slot="icon" class="icon iconfont icon-kefu-tianchong" style="font-size: 0.5rem;color: rgb(80, 127, 65);margin-right:0.3rem;"></i>
          <a href="tel:4006966603" style="color: #26a2ff; font-size: 0.5rem;color: rgb(80, 127, 65);">400-696-6603</a>
        </div>
      </ul>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      baseUrl: '/static/imgs/'
//      user: {
//        src: 'http://img1.imgtn.bdimg.com/it/u=3198762613,766144830&fm=27&gp=0.jpg',
//        name: 'dmy123456789',
////        ways: '通过qq登录',
//        setting: {
//          badge: 2,
//        }
//      }
    }
  },
  methods:{
    changeToSetting(){            //跳转到设置界面
      if(this.user.name){
        this.$router.push('/account/setting');
      }else{
        this.$router.push('/account/login');
      }
    },
    changeToLogin(){            //跳转到登录界面
      this.$router.push('/account/login');
    },
    checkReport () {
      this.$router.push({name: this.RouterName.myReport})
    }
  },
  computed:{
    ...mapGetters({
      user: 'getUserData'
    })
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  background-color  #f2f4f7
  width 100%
  height 92%
  position fixed
  overflow scroll
  .user
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
    margin: 0.5rem 0.5rem 0;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    background-color white
    /*background: -webkit-linear-gradient(left, #6BAC7E , #AFD470);*/
    background: -webkit-linear-gradient(left, #22ad7b , #a4d560);
    border-right: 1px solid #AFD470;
    /*border-bottom 0.022666rem solid #ced1da*/
    height 4.5rem
    .user-login
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    .nav
      /*margin-top 8px*/
      margin-bottom 0
      margin: 0
    .avatar
      width: 1.50664rem
      height 1.50664rem
      border-radius 1.70664rem
      border 0.14222rem solid #ced1da
      display inline-block
      margin-left 0.21333rem
      margin-top 0.21333rem
    .description
      display inline-block
      vertical-align top
      margin: 0rem 0.6rem;
      display flex
      flex-direction row
      align-items center
      height: 100%;
      .desc-img
        border-radius 50%
        width: 1.8rem;
        height: 1.8rem;
        /*border: 1px solid gainsboro;*/
        margin-right: 0.3rem;
        background: url(/static/imgs/sample.png) no-repeat 0 0;
        .img
          width 100%
      .title
        font-size 0.42666rem
        font-weight 600
        color white
      .ways
        font-size 0.34133rem
    .login
      height 4.5rem
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
      /*background-color white*/
      text-align center
      .wrap
        width 2.2rem
        height 2.2rem
        border-radius 50%
        border 1px solid #427E43
        .button
          width 2rem
          height 2rem
          border-radius 50%
          background-color #427E43
          line-height 2rem
          margin 0.1rem
          color white
          font-size 0.5rem
          &:active
            background-color #f2f4f7
.check-list
  /*padding 0 0.5rem*/
  overflow auto
  border-top: 1px solid gainsboro;
  .nav
    padding 0
    list-style-type none
    background-color white
    .nav-item
      /*margin-left 0.9rem*/
      margin: 0rem 0.3rem;
      .mint-cell
        /*background-position initial*/
        /*display flex*/
        /*align-items center*/
        /*border none*/
        .mint-cell-wrapper
          border none
          /*box-sizing unset*/
          .mint-cell-title
            color red
            .icon
              vertical-align: text-top
              font-size 0.6rem
              color #666
            .mint-cell-text
              color red
              display block
              vertical-align: text-top
        .cell-div
          display flex
          flex-direction column
          align-items center
          .icon
            font-size 0.6rem
          .span
            font-size 0.32rem
      .list-item
        display flex
        flex-direction row
          /*justify-content: center;*/
        .list-div
          height: 2.5rem;
          font-size: 0.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction column
        .width
          width 30%

</style>
