<template>
  <div class="main">
    <mt-header title="支付结果" class="gmkt-header"></mt-header>
    <div class="content">
      <img :src="baseUrl+'paySuccess.png'">
      <div class="desc">{{payResult}}</div>
      <mt-button class="btn" size="normal" type="primary" style="margin-top: 0.5rem;" @click="clickHome">返回首页</mt-button>
      <mt-button class="btn plain" size="normal" plain style="margin-top: 0.5rem;" @click="clickOrder">查看订单</mt-button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        baseUrl: '/static/imgs/'
      }
    },
    methods: {
      clickOrder () {
        this.$router.push({name: this.RouterName.myOrder})
      },
      clickHome () {
        this.$router.push({name: this.RouterName.buy})
      }
    },
    computed: {
      payResult () {
        return '支付成功！'
      }
    }
  }
</script>
<style scoped>
  .main {
    height: 20rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30%;
  }

  a {
    color: #26a2ff;
  }

  img {
    width: 2rem;
    margin-bottom:0.3rem;
  }

  .btn{
    width:80%;
  }

  .plain {
    border: 1px solid #427E43;
    color: #427E43;
  }

  .desc {
    font-size: 0.4rem;
    margin-bottom: 0.5rem;
  }
</style>