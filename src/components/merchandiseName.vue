<template>
  <div :style="fontStyle" class="desc-d">常佑康
    <!--<div :style="style">®</div>-->
    <div :style="style">™</div>
    肠癌早筛检查
  </div>
</template>
<script>
  export default{
    props: ['fromOrder'],
    computed: {
      style () {
        if (this.fromOrder) {
          return 'margin-top: -2px;font-size: 0.3rem;'
        } else {
          return 'margin-top: -2px;font-size: 0.4rem;'
        }
      },
      fontStyle () {
        if (this.fromOrder) {
          return 'font-size: 0.4rem;font-weight: 400;font-weight:400'
        } else {
          return 'font-size: 0.65rem;font-weight: 500;'
        }
      }
    }
  }
</script>
<style>
  .desc-d {
    /*font-size: 0.65rem;*/
    /*font-weight: 500;*/
    display: flex;flex-direction: row;
    color: rgb(26, 27, 31);
    width:80%;
  }
</style>