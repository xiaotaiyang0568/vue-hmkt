<template>
  <div class="tips">
    <hr class="line">
    <div class="tel">
      <p>如有疑问请联系客服</p>
      <a href="tel:4006966603">400-696-6603</a>
      <div v-if="userInfo.customerName" class="consult">或<div class="btns-btn color" style="margin-left: 0.2rem;" @click="clickConsult">在线咨询</div></div>
    </div>
    <hr class="line">
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      clickConsult () {
        this.$router.push({name: this.RouterName.consult})
      }
    }
  }
</script>
<style scoped>
  .tips {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /*margin-top: 1rem;*/
    font-size: 0.4rem;
    margin-top: 35%;
    /*bottom: 0.5rem;*/
    /*position: absolute;*/
  }
  .tel{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .line{
    border: 1px solid #e6eaf2;
    width: 20%;
    margin-top: 0.7rem;
  }
  .consult {
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0.3rem;
    justify-content: center;
    font-size: 0.35rem;
  }
</style>