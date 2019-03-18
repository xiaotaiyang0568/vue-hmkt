<template>
  <div class="buy-main" :style="{'height': mainHeight + 'px'}">
    <div class="container">
      <div class="buy-banner">
        <img class="banner" :src="baseUrl+'homebanner.png'">
      </div>
      <div style="display: flex;justify-content: center;margin-bottom: 1rem;">
        <div class="buy-info">
          <div class="desc">
            <merchandise-name></merchandise-name>
            <div class="desc-i" @click="clickConsult" content="center">
              <div style="margin-left: 0.3rem;">
                <img :src="baseUrl+'cusserver.png'" style="width: 0.8rem;">
                <mt-badge size="small" type="primary" style="top: -0.6rem; left: -0.3rem; position: relative;" color="#6bac7e">{{msgCount}}</mt-badge></mt-button>
              </div>
              <!--<i slot="icon" class="icon iconfont icon-zixun"></i>-->
              在线咨询</div>
          </div>
          <div class="info-inner"></div>
        </div>
        <!--<div class="btns">-->
        <!--<div class="buy-btns">-->
        <!--<div style="color: rgb(26, 27, 31);-->
        <!--font-weight: 500;-->
        <!--font-size: 0.7rem;-->
        <!--margin: 0.2rem 0.3rem;">¥-->
        <!--</div>-->
        <!--<div style="color: rgb(26, 27, 31);-->
        <!--font-size: 1rem;-->
        <!--font-weight: 800;-->
        <!--margin-top: 0.3rem;">980-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="buy-btns">-->
        <!--<mt-button style="-->
        <!--width: 80%;-->
        <!--background-color: #70972C;-->
        <!--color: white;-->
        <!--font-size: 0.42rem;-->
        <!--border-radius: unset;" @click="clickBuy">立即购买-->
        <!--</mt-button>-->
        <!--</div>-->
        <!--&lt;!&ndash;<mt-button icon="icon iconfont icon-icon_account" style="width: 50%;border-radius: unset;" @click="clickBuy">立即购买</mt-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<mt-button icon="icon iconfont icon-icon_account" style="width: 50%;border-radius: unset;" @click="clickConsult">在线咨询&ndash;&gt;-->
        <!--&lt;!&ndash;<mt-badge size="small" type="primary" style="top: -0.5px; position: absolute;">{{msgCount}}</mt-badge></mt-button>&ndash;&gt;-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import merchandiseName from '../components/merchandiseName.vue'
  export default {
    mounted () {
      if (this.user.customerName) { // todo change
        this.loadMsgsCount(this)
        console.log('loadMsgsCount-tabbar')
      }
      window.addEventListener('resize', this.onResize)
    },
    components: {
      merchandiseName
    },
    data () {
      return {
        baseUrl: '/static/imgs/',
        mainHeight: window.innerHeight,
        infoHeight: window.innerHeight - 150 - 131.25
      }
    },
    methods: {
      onResize () {
        console.log('onResize')
      },
      clickConsult () {
        this.$router.push({name: this.RouterName.consult})
      },
      clickBuy () {
        this.$router.push({name: this.RouterName.inputOrder})
      }
    },
    computed: {
      ...mapGetters({
        messageCount: 'messageCount',
        user: 'userInfo',
        merchandise: 'getMerchandise'
      }),
      msgCount () {
        return this.isBlank(this.messageCount) ? 0 : this.messageCount
      }
    }
  }
</script>
<style>
  .buy-banner {
    height: 5.5rem;
    /*background-color: aliceblue;*/
  }
  .banner{
    width: 100%;
    height: 100%;
  }
  .buy-info {
    /*height:~'calc(100%-6.55rem)';*/
    /*background-color: antiquewhite;*/
    width: 95%;
    display: flex;
    flex-direction: column;
  }
  .buy-main {
    /*justify-content: center;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    margin: 0.3rem 0.3rem;
    box-shadow: #666 0 0 0.2rem;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    overflow: auto;
  }
  .container{
    height: 30rem;
  }
  .info-inner {
    height: 17rem;
    border-top:1px solid gainsboro;
    /*background-color: #0a8ddf;*/
  }
  .btns {
    bottom: 0;
    position: fixed;
    height: 3.4rem;
    width: 94%;
    display: flex;
    flex-direction: row;
    border-top:1px solid gainsboro;
    /*margin: 0 0.2rem;*/
  }

  .buy-btns {
    width: 50%;
    display: flex;flex-direction: row;
    justify-content: center;
    height: 69.41px;
    align-items: center;
  }

  .desc {
    display: flex;
    flex-direction: row;
    height: 2.4rem;
    align-items: center;
  }
  .desc-i {
    width:20%;
    text-align: center;
  }
</style>
