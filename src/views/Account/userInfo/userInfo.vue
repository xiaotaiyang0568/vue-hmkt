<template>
  <div class="main">
    <mt-header title="个人中心" class="gmkt-header"></mt-header>
    <div class="user">
      <div class="user-login">
        <div class="description">
          <div class="desc-img">
            <img class="img" :src="baseUrl+'customer.png'">
          </div>
          <div>
            <p class="title">{{user.customerName}}</p>
            <p class="title" style="margin-top: -0.2rem;font-weight: 300;">{{user.customerNo}}</p>
          </div>
        </div>
    </div>
    </div>
    <div>
      <ul class="nav">
        <div class="nav-item">
          <!--<mt-cell is-link title="修改手机号" to="/account/changePhone"></mt-cell>-->
          <mt-cell is-link title="收货地址管理" to="/account/expressAddress">
            <!--<i slot="icon" class="icon iconfont icon-dizhi01 icons"></i>-->
            <!--<img slot="icon" :src="baseUrl+'address.png'">-->
          </mt-cell>
          <!--<mt-cell is-link title="发票抬头管理" to="/account/invTitle">-->
            <!--<i slot="icon" class="icon iconfont icon-custom-receipt icons"></i>-->
            <!--&lt;!&ndash;<img slot="icon" :src="baseUrl+'invoice.svg'">&ndash;&gt;-->
          <!--</mt-cell>-->
          <mt-cell is-link title="发票寄送地址管理" to="/account/invAddress">
            <!--<i slot="icon" class="icon iconfont icon-shouhuodizhi icons"></i>-->
            <!--<img slot="icon" :src="baseUrl+'location.svg'">-->
          </mt-cell>
          <!--<mt-cell is-link title="标题文字" icon="more"></mt-cell>-->
        </div>
      </ul>
      <ul class="nav">
        <mt-button size="normal" class="right-user" @click="logout">退出登陆</mt-button>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import {Toast} from 'mint-ui'
  export default {
    mounted () {},
    data () {
      return {
        data: '',
        baseUrl: '/static/imgs/'
      }
    },
    methods: {
      ...mapActions({userOut: "setSignOut"}),
      logout () {
        this.postRequest('gcwwwifc/userLogout')
          .then((response) => {
            if (response.data.code === 0) {
//              $.sign.shareUrl = EMKT.wxShareUrl
//              EMKT.wxShare()
              Toast({message: '注销成功'})
//              $.sign.shareUrl = EMKT.wxShareUrl
//              EMKT.wxShare()
              this.userOut()
              this.$router.push({name: this.RouterName.account})
            }
            if (response.data.code === 1) {
              Toast({message: '失败，请重试'})
            }
          }, (response) => {
            Toast({message: '失败，请重试'})
          })
      }
    },
    computed: {
      ...mapGetters({
        user: 'userInfo'
      })
    }
  }
</script>
<style scoped>
  .main{
    height: 16rem;
    background-color: #f2f4f7;
  }
  .nav{
    padding: 0;
    list-style-type: none;
    background-color: white;
  }
  .nav-item{
    margin: 0rem 0.3rem;
  }
  .right-user{
    background-color: #fff;
    width: 100%;
    color: #2FA067;
    border-radius: unset;
  }
  img {
    width: 0.5rem;
  }
  .user{
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
    margin: 0.3rem 0.5rem 0;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    background-color: white;
    /*background: -webkit-linear-gradient(left, #6BAC7E , #AFD470);*/
    /*border-right: 1px solid #AFD470;*/
    /*border-bottom: 0.022666rem solid #ced1da*/
    height: 2.5rem;
  }

  .user-login{
    display: flex;
    flex-direction: column;
    align-items: center;
    /*justify-content: center;*/
    height: 100%;
    width:100%;
  }

  .description{
    vertical-align: top;
    margin: 0rem 0.6rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width:95%;
  }

  .desc-img{
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    border: 1px solid gainsboro;
    margin-right: 0.3rem;
  }

  .img{
    width: 100%;
  }

  .title{
    font-size: 0.42666rem;
    font-weight: 500;
  }
  .icons{
    font-size: 0.6rem;
    color: #666;
    vertical-align: text-top;
  }
</style>