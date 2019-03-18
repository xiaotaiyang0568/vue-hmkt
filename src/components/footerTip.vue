<template>
  <div class="tips">
    <hr class="line" v-if="!loading">
    <div class="tel">
      <p>已经到底啦～</p>
    </div>
    <hr class="line">
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed:{
      ...mapGetters(['loading'])
    }
  }
</script>
<style scoped>
  .tips {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    /*margin-top: -3.3rem;*/
  }
  .tel{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .line{
    border: 1px solid #e6eaf2;
    width: 30%;
  }
</style>