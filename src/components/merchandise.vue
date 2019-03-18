<template>
  <div>
    <div class="merchan">
      <div class="merchan-desc">
        <img :src="baseUrl+merchan.icon" style="width: 3rem;">
        <div class="desc">
          <merchandise-name :fromOrder=true style="width: 100%;"></merchandise-name>
          <div style="margin: 0.4rem 0;display: flex;flex-direction: row;width: 100%;">
            <p style="margin-right: 0.3rem;">总价：{{quantity*merchan.priceMin}} 元</p>
            <p>数量：{{quantity}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import merchandiseName from './merchandiseName.vue'
  import {mapGetters} from 'vuex'
  export default{
    props:['merchandise'],
    data () {
      return {
        baseUrl:'/static/imgs/'
      }
    },
    components: {
      merchandiseName
    },
    computed: {
      ...mapGetters(['productQuantity']),
      quantity () {
        if (this.merchandise instanceof Array) {
          return this.merchandise.length
        }
        return this.productQuantity
      },
      merchan () {
        if (this.merchandise instanceof Array) { // 多个不同产品时，如果merchandise是array，此组件需要使用v-for渲染
          return this.merchandise[0]
        }
        return this.merchandise
      }
    }
  }
</script>
<style scoped>
  .merchan{
    width:100%;
    height: 4rem;
    background-color: white;
  }
  .merchan-desc{
    display: flex;
    flex-direction: row;
    height: 3.5rem;
    align-items: center;
    width: 95%;
    margin-left: 2.5%;
    border-bottom: 1px solid gainsboro;
  }
  .desc{
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 2rem;
    margin-left: 0.2rem;
  }
</style>