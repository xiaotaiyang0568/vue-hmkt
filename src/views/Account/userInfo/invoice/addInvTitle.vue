<template>
  <div class="main">
    <mt-header title="填写发票抬头" class="gmkt-header"></mt-header>
    <!--<mt-navbar v-model="selectedTab">-->
      <!--<mt-tab-item id="2">增值税普通发票</mt-tab-item>-->
      <!--<mt-tab-item id="3">增值税专用发票</mt-tab-item>-->
    <!--</mt-navbar>-->
    <ul class="nav" v-if="selectedTab===2">
      <div class="nav-bac">
        <div class="nav-item">
          <mt-field label="单位名称" placeholder="请选择单位名称" v-model="enterprise.enterpriseName" @click.native="inputEnterpriseName"></mt-field>
          <mt-field label="纳税人识别码" placeholder="请输入纳税人识别码" v-model="enterprise.enterpriseInvoiceTaxRegNo"></mt-field>
        </div>
      </div>
    </ul>
    <ul class="nav" v-if="selectedTab===3">
      <div class="nav-bac">
        <div class="nav-item">
          <mt-field label="单位名称" placeholder="请选择单位名称" v-model="enterprise.enterpriseName" @click.native="inputEnterpriseName"></mt-field>
          <mt-field label="纳税人识别码" placeholder="请输入纳税人识别码" v-model="enterprise.enterpriseInvoiceTaxRegNo"></mt-field>
          <mt-field label="注册地址" placeholder="请输入注册地址" v-model="enterprise.enterpriseAddress"></mt-field>
          <mt-field label="注册电话" placeholder="请输入注册电话" v-model="enterprise.enterpriseTelephone"></mt-field>
          <mt-field label="开户银行" placeholder="请输入开户银行" v-model="enterprise.enterpriseBankName"></mt-field>
          <mt-field label="银行账户" placeholder="请输入银行账户" v-model="enterprise.enterpriseBankAccount"></mt-field>
        </div>
      </div>
    </ul>
    <!--<mt-tab-container v-model="selectedTab">-->
      <!--<mt-tab-container-item id="2">-->
        <!---->
      <!--</mt-tab-container-item>-->
      <!--<mt-tab-container-item id="3">-->
        <!---->
      <!--</mt-tab-container-item>-->
    <!--</mt-tab-container>-->

    <!--<ul class="nav">-->
      <!--<mt-cell title="设为默认">-->
        <!--<mt-switch v-model="isDefault"></mt-switch>-->
      <!--</mt-cell>-->
    <!--</ul>-->
    <div>
      <mt-button size="normal" type="primary" class="right" @click="saveInvTitle">
        <i class="icon iconfont icon-baocun" style="margin-right: 0.3rem;"></i>确定</mt-button>
    </div>
    <mt-popup :modal="isModal" class="popup"
      v-model="isSearchEnterpriseFlag"
              placeholder="搜索单位名称"
      popup-transition="popup-fade">
      <form action="" target="frameFile">
        <div class="mint-search">
          <div class="mint-searchbar">
            <div class="mint-searchbar-inner">
              <i class="mintui mintui-search"></i>
              <input ref="input"
                     autofocus="autofocus"
                     @click="visible = true"
                     type="search"
                     v-model="enterpriseName"
                     :placeholder="placeholder"
                     class="mint-searchbar-core">
            </div>
            <a class="mint-searchbar-cancel confirm"
               @click="handleConfirm"
               v-show="visible"
               v-text="confirmText">
            </a>
            <a class="mint-searchbar-cancel"
               @click="handleCancel"
               v-show="visible"
               v-text="cancelText">
            </a>
          </div>
          <div class="mint-search-list"
               v-show="enterpriseName">
            <div class="mint-search-list-warp">
              <slot>
                <mt-cell v-for="(item, index) in enterpriseList"
                        :key="index"
                        :title="item.enterpriseName"
                        @click.native="clickEnpName(item)"></mt-cell>
              </slot>
            </div>
          </div>
        </div>
      </form>
    </mt-popup>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import threeLevelAddress from '../../../../../static/citiPicker.json'
  import util from '../../../../util/util'
//  import XCell from 'mint-ui/packages/cell/index.js';
//  if (process.env.NODE_ENV === 'component') {
//    require('mint-ui/packages/cell/style.css');
//  }
  export default {
    mounted () {
      this.$refs.input.focus()
      this.selectedTab = this.$route.query.type
    },
    data () {
      return {
        selectedTab: null,
        visible: true,
        isModal: true,
        enterpriseList: [],
        enterpriseName: '',
        isDefault: false,
        value: '',
        autofocus: true,
        cancelText: '取消',
        confirmText: '查询',
        placeholder: '搜索单位名称',
        enterprise: {
          enterpriseName: '',
          enterpriseInvoiceTaxRegNo: '',
          enterpriseAddress: '',
          enterpriseBankAccount: '',
          enterpriseTelephone: '',
          enterpriseBankName: ''
        },
        hasReturned: false
      }
    },
    methods: {
      ...mapMutations(['setInvTitleList', 'setInvTitle', 'setIsSearchEnterprise']),
      handleConfirm () {
        this.postRequest('retrieveEnterprise', this.enterpriseName).then(res => {
          if (res.data.code === 0) {
            console.log('retrieveEnterprise')
            let resList = res.data.result
            if (resList.length === 0) {
              this.enterpriseList = [{enterpriseName: this.enterpriseName}]
            } else {
//              if (parseInt(this.selectedTab) === 2) {}
//              this.hasReturned = true
              this.enterpriseList = resList
            }
          } else {
            this.setIsSearchEnterprise(false)
            this.$toast(res.data.message)
          }
        })
      },
      clickEnpName (item) {
        this.enterprise = item
        this.setIsSearchEnterprise(false)
      },
      handleCancel () {
        this.setIsSearchEnterprise(false)
        this.enterpriseName = ''
      },
      inputEnterpriseName () {
        this.setIsSearchEnterprise(true)
      },
      saveInvTitle () {
        let param = {}
        param.type = parseInt(this.selectedTab)
        param.enterpriseGuid = this.enterprise.enterpriseGuid
        param.enterpriseName = this.enterprise.enterpriseName
        param.enterpriseInvoiceTaxRegNo = this.enterprise.enterpriseInvoiceTaxRegNo
        param.enterpriseBankName = this.enterprise.enterpriseBankName
        param.enterpriseBankAccount = this.enterprise.enterpriseBankAccount
        param.enterpriseAddress = this.enterprise.enterpriseAddress
        param.enterpriseTelephone = this.enterprise.enterpriseTelephone
        this.postRequest('upsertEnterprise', param).then((res) => {
          if (res.data.code === 0) {
            this.setInvTitle(res.data.result)
            this.$router.go(-1)
          } else {
            this.$toast(res.data.message)
          }
        })
      }
    },
    computed: {
      isSearchEnterpriseFlag: {
        set (val) {},
        get () {
          return this.$store.state.com.isSearchEnterprise
        }
      }
    }
  }
</script>
<style scoped>
  .main{
    height: 18rem;
    background-color: rgb(242,244,247);
  }
  .nav {
    padding: 0;
    list-style-type: none;
  }
  .right{
    background-color: rgb(85, 139, 2);
    width: 70%;
    margin-left: 15%;
    margin-top: 0.6rem;
    height: 1.2rem;
    border-radius: 0.6rem;
  }

  .popup {
    width: 100%;
  }
  .nav-item {
    margin:0 0.3rem;
  }

  .nav-bac{
    background-color: #fff;
  }
</style>