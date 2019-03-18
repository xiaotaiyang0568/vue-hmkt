<template>
  <div class="main">
    <mt-header title="我的检测报告"></mt-header>
    <ul class="nav">
      <!--<mt-cell v-for="item in reportList" :title="item.checkPersonName" :label="item.checkDT" :value="item.checkStatus" is-link @click.native="clickItem(item)"></mt-cell>-->
    </ul>
    <div style="margin-top: 10rem;">
      <a size="normal" type="primary" class="download-btn right" href="http://192.168.2.156:8080/DownloadReport?barCode=1" target="_blank">
        <i class="icon iconfont icon-baocun" style="margin-right: 0.3rem;"></i>下载</a>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
    },
    data () {
      return {
        reportList: []
      }
    },
    methods: {
      clickDownload (item) {
//        this.$router.push({name: this.RouterName.reportDetail, query: {report: item}})
      }
    }
  }
</script>
<style scoped>
  .main {
    height: 18rem;
    background-color: rgb(242, 244, 247);
  }

  .nav {
    padding: 0;
    list-style-type: none;
  }
  .download-btn{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /*color: inherit;*/
    display: block;
    font-size: 18px;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    color: #fff;
    line-height: 1.2rem;
  }
</style>