<template>
  <div class="main">
    <mt-button plain><a href="tel:021-51320189">021-51320189</a>-8012</mt-button>
    <mt-button plain style="margin-top: 0.5rem;" @click="clickCusServer">在线客服</mt-button>
  </div>
</template>
<script>
  export default {
    methods: {
      clickCusServer () {
        this.$router.push({name: this.RouterName.consult})
      }
    }
  }
</script>
<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
    justify-content: center;
  }
  
  a {
    color: #26a2ff;
  }
</style>