<template>
  <div class="main">
    <mt-header title="检测报告列表" :fixed="fixed">
      <span slot="left" @click="clickReturn" v-if="isCheckRpt">首页</span>
    </mt-header>
    <div v-if="reportList.length === 0" class="nothing" style="margin-top: 50%;">
      <div style="font-size: 0.4rem;color: #666;">您还未有检测报告！</div>
      <cus-server-tel style="margin-top: 0.5rem;"></cus-server-tel>
    </div>
    <ul class="nav" v-else>
      <div v-for="(item, idx) in reportList" class="content" :key="idx">
        <div class="items">
          <div class="desc-items">
            <div class="desc1">
              <div class="font1 font-weight">{{item.checkPersonName}}</div>
              <merchandise-name style="width: 65%;font-weight: 600;" :fromOrder="true"></merchandise-name>
              <!--<div class="font2 font-weight">{{order.deliveryInfo.expressMobile}}</div>-->
            </div>
            <div class="desc1" v-if="item.checkDT">
              <div class="font2">检测完成时间：{{item.checkDT}}</div>
            </div>
            <div class="desc1" v-if="item.checkDT">
              <div class="font3">检测状态：{{item.statusName}}</div>
              <i class="icon iconfont icon-f14 refresh" @click="clickRefresh(item)"></i>
            </div>
          </div>
          <a class="btns-btn color" :href="'http://192.168.2.156:8080/DownloadReport?barCode='+item.barCode" target="_blank">下载报告</a>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
  import {mapMutations, mapGetters} from 'vuex'
  import merchandiseName from '../../../components/merchandiseName.vue'
  import cusServerTel from '../../../components/cusServerTel.vue'
  export default {
    mounted () {
      this.getData()
      this.isCheckRpt = this.$route.query.isCheckRpt
    },
    data () {
      return {
        reportList: [],
        fixed: true,
        isCheckRpt: false
      }
    },
    components: {
      merchandiseName,
      cusServerTel
    },
    computed: {
      ...mapGetters(['checkStatusMap'])
    },
    methods: {
      ...mapMutations(['setLoadingStatus']),
      clickRefresh (item) {
        this.postRequest('updateBarcodeInfo', item.barCode).then(res => {
          item = res.data.result
          console.log('updateBarcodeInfo-->', res)
        })
      },
      getData () {
        this.setLoadingStatus(true)
        this.postRequest('loadMyCheckReports').then(res => {
          this.reportList = this.resHandle(res.data.result)
          this.setLoadingStatus(false)
        })
      },
      clickItem (item) {
        this.$router.push({name: this.RouterName.reportDetail, query: {report: item}})
      },
      resHandle (res) {
        res.forEach(r => {
          r.statusName = this.checkStatusMap[r.checkStatus]
        })
        return res
      },
      clickReturn() {
        this.$router.push({name: this.RouterName.buy})
      }
    }
  }
</script>
<style scoped>
  .main {
    height: 18rem;
    background-color: rgb(242, 244, 247);
    overflow: auto;
  }

  .nav {
    padding: 0;
    list-style-type: none;
    margin-top: 1.7rem;
  }
  .items{
    height: 3rem;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid gainsboro;
    margin:0 0.3rem;
  }
  .desc-items{
    width:75%;
  }
  .content{
    width:100%;
    background-color: white;
  }

  .desc1{
    display: flex;
    flex-direction: row;
    margin: 0.3rem;
  }
  .font1{
    font-size: 0.4rem;
    margin-right: 0.4rem;
  }
  .font2{
    font-size: 0.35rem;
  }
  .font3 {
    font-size: 0.35rem;
    color: rgb(77, 134, 0);
  }
  .font-weight{
    font-weight: 500;
  }
  .refresh{
    margin-left: 0.2rem;
    color: #22ad7b;
  }

</style>