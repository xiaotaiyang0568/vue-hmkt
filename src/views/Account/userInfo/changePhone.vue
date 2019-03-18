<template>
  <div class="main">
    <mt-header title="修改手机号" class="gmkt-header"></mt-header>
    <div>
      <ul class="nav">
        <div class="nav-item">
          <mt-field label="新手机号" placeholder="请输入新手机号" type="tel" v-model="phone"></mt-field>
        </div>
      </ul>
    </div>
    <mt-button size="normal" type="primary" class="right" @click="clickConfirm">确认</mt-button>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import {Toast} from 'mint-ui'
  export default {
    mounted () {},
    data () {
      return {
        phone: ''
      }
    },
    methods: {
      ...mapActions({userOut: "setSignOut"}),
      clickConfirm () {
        this.postRequest('gcwwwifc/modifyCustomerInfo', {Telephone: this.phone})
          .then((response) => {
            if (response.data.code === 0) {
              Toast({message: '修改成功'})
              this.$router.go(-1)
            }
            if (response.data.code === 1) {
              Toast({message: '失败，请重试'})
            }
          }, (response) => {
            Toast({message: '失败，请重试'})
          })
      }
    }
  }
</script>
<style scoped>
  .main{
    height: 20rem;
  }
  .nav{
    padding: 0;
    list-style-type: none;
    background-color: white;
  }
  .nav-item{
    margin: 0rem 0.3rem;
  }
  .right{
    background-color: #427E43;
    width: 90%;
    margin-left: 5%;
    margin-top: 0.6rem;
  }
</style>