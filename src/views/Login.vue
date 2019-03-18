<template>
  <div class="wrapper">
    <!--<div class="title">-->
      <!--<span class="back" @click="back">&lt;</span>-->
      <!--<span class="title">登录</span>-->
    <!--</div>-->
    <mt-header title="登录"></mt-header>
    <div class="login">
      <div class="account">
        <label>手机号:</label>
        <input type="text" v-model="account" placeholder="请输入手机号">
      </div>
      <div style="display: flex;flex-direction: row;width: 100%; align-items: center;">
        <div class="password">
          <label>验证码:</label>
          <input v-model="password" type="text" placeholder="请输入验证码" style="width: 3.2rem">
        </div>
        <mt-button type="primary" size="normal" style="width: 2rem;
                                                      background-color: unset;
                                                      right: 0px;margin: 0px;
                                                      color: #427E43;
                                                      padding: 0px;" @click="sendVeriCode">{{sendCodeText}}</mt-button>
      </div>
      <!--<mt-field label="用户名" placeholder="请输入用户名" v-model="account"></mt-field>-->
      <!--<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>-->
      <button @click="login">登录</button>
    </div>
    <div class="desc" v-if="isCheckRpt">
      <p>
        注意：查看检测报告需先使用手机号进行登陆
      </p>
    </div>
    <cus-server-tel></cus-server-tel>
  </div>
</template>

<script>
import { requestLogin } from "../api/api";
import { mapActions,mapMutations } from "vuex";
import { Toast } from 'mint-ui';
import util from '../util/util'
import cusServerTel from '../components/cusServerTel.vue'
const sendText = '发送'
export default {
  mounted () {
    this.isCheckRpt = this.$route.query.isCheckRpt
  },
  data() {
    return {
      account: "",
      password: "",
      coolDown: false,
      sendCodeText: sendText,
      isCheckRpt: false
    }
  },
  components: {
    cusServerTel
  },
  methods: {
    ...mapMutations(['setSessionInfo','setExpAddress']),
    back() {
      this.$router.go('-1')
    },

    ...mapActions(
      [
        'setUserData','setUserInfo'
      ]
    ),
    sendVeriCode () {
      if (this.isBlank(this.account)) {
        Toast({message: '请填写手机号'})
        return
      }
      if (!this.phoneVeri(this.account)) {
        Toast({message: '请填写正确手机号格式'})
        return
      }
      if (!this.coolDown) {
        this.getRequest('gcwwwifc/requestLoginSmsCode?LoginId='+this.account, null).then((res) => {
          this.coolDown = true
          time(this)
          Toast({message: res.data.message})
        }, (res) => {
          Toast({message: res.data.message})
        })
      }
      let wait = 60
      function time (this_) {
        if (wait === 0) {
          this_.coolDown = false
          this_.sendCodeText = sendText
//          o.style.color = ''
          wait = 60
        } else {
          this_.sendCodeText = wait + 's'
//          o.style.color = '#C8C8C8'
          wait--
          setTimeout(function () {
            time(this_)
          }, 1000)
        }
      }
    },
    login() {                  //登录操作
      if (!this.account || !this.password) {
        Toast({
                message: '请填写完整登陆信息'
        });
        return;
      }
      this.$store.dispatch("setLoadingState", true); //设置loading状态

      this.getRequest('/gcwwwifc/loginBySmsCode?LoginId='+this.account+'&Password='+this.password+'&Code=').then(res => {
        let data = res.data
        if (data) {
          if (data.result.customerName === 'GUEST') {
            Toast({message: '啊哦～登陆失败了，稍后再试试吧'})
          } else {
            this.setUserInfo(res.data.result)
            this.setUserData(res.data.result)
            this.getRequest('gcwwwifc/getUserProfile?ProfileType='+util.ProfileType.expAddress).then(res => {
              if (res.data) {
                this.setExpAddress(res.data.result)
                if (this.isCheckRpt) {
                  this.$router.push({name: this.RouterName.myReport, query: {isCheckRpt: this.isCheckRpt}})
                } else
                  this.$router.go(-1)
              }
            })
          }
        } else {
          Toast({message: '啊哦～登陆失败了，稍后再试试吧'})
        }
        this.$store.dispatch("setLoadingState", false)
//      }).then(res => {
//        return this.postRequest('gcwwwifc/getCustomerInfo', null)
//      }).then(res => {
//        if (res && res.data.result) {
//          this.setSessionInfo(res.data.result)
//          console.log('setCustomerInfo')
//        }
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
    background-color: white;

    .title {
        height: 1.2rem;
        background-color: #f7f9fc;
        line-height: 1.2rem;

        .back {
            font-size: 0.8rem;
            margin-left: 0.3rem;
        }

        .title {
            font-size: 0.6rem;
            position: absolute;
            left: 45%;
        }
    }

    .login {
        width: 8rem;
        margin: 0 auto;

        .account, .password {
            -webkit-user-select:auto; /*webkit浏览器*/
            user-select:auto;
            -o-user-select:auto;
            -ms-user-select:auto;
            margin: 0.3rem;
            border-bottom: 1px solid #e6eaf2;
            height: 1.6667rem;
            line-height: 1.6667rem;
            color: #99a4bf;
            &>label {
                font-size: 0.45rem;
            }

            &>input {
                -webkit-user-select:auto; /*webkit浏览器*/
                user-select:auto;
                -o-user-select:auto;
                -ms-user-select:auto;
                border: 0;
                background-color: white;
                width: 5rem;
                height: 0.7rem;
                outline: none;
                font-size: 0.40rem;
            }
        }
        /*.mint-cell .mint-field*/
        /*.mint-field, .mint-cell-title {*/
          /*height: 85px;*/
        /*}*/

        // input
        // background-color white
        button {
            width: 7.4rem;
            height: 1rem;
            margin: 0.3rem;
            border-radius: 0.2rem;
            background-color: #427E43;
            border: 0;
            outline: none;
            font-size: 0.45rem;
            color: white;
        }
    }
    .desc{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }


    video{
      width: 10rem;
      height: 8rem;
    }

}
</style>
