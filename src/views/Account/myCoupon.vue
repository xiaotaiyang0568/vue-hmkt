<template>
  <div>
    <mt-header title="我的优惠券" class="gmkt-header"></mt-header>
    <div class="coupon">
      <div class="coupon-info">
        <div class="info info1">¥ 10</div>
        <div class="info info2">123456</div>
      </div>
      <div class="coupon-desc"></div>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>
  .coupon {
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
    margin: 0.2rem 0.5rem 0;
    border-radius: 0.3rem;
    background-color: white;
    background: -webkit-linear-gradient(left, #6BAC7E, #AFD470);
    border-right: 1px solid #AFD470;
    /*border-bottom 0.022666rem solid #ced1da*/
    height: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .coupon-info {
    height:50%;
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .coupon-desc {
    height:50%;
    width:100%;
    border-top:0.5px solid gainsboro;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .info1 {
    left: 1rem;
    font-size: 0.8rem;
  }
  .info2 {
    right: 1rem;
    font-size: 0.6rem;
  }
  .info {
    position: absolute;
    color: white;
  }
</style>
