<template>
  <div class="content">
    <!--<mt-header title="采样指南" class="gmkt-header"></mt-header>-->
    <div class="main">
      <div class="video-content" v-for="item in videoList">
        <div class="video">
          <!--<video :src="baseUrlVideo+item.videoUrl" preload="auto" class="play"  webkit-playsinline="true"-->
          <!--playsinline="true"-->
          <!--x-webkit-airplay="allow"-->
          <!--x5-video-player-type="h5"-->
          <!--x5-video-player-fullscreen="true"-->
          <!--x5-video-orientation="portraint"-->

          <!--style="object-fit:fill"></video>-->
          <video class="play" controls :poster="baseUrlImg+item.imgUrl" style="object-fit:fill">
            <source :src="baseUrlVideo+item.videoUrl" type="video/mp4">
          </video>
          <!--:poster="baseUrlImg+item.imgUrl"-->
        </div>
        <div class="info">
          <div class="desc1">
            {{item.name}}
          </div>
          <div class="desc2">
            {{item.desc}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        baseUrlVideo: '/static/video/',
        baseUrlImg: '/static/imgs/',
        videoList: [
          {id: 1, videoUrl: 'caiyang1.mp4', imgUrl: 'homebanner.png', name: '采样1', desc: '描述描述描述描述描述描述描述描述描述描述描述描述'},
          {id: 2, videoUrl: 'caiyang1.mp4', imgUrl: 'homebanner.png', name: '采样2', desc: '描述描述描述描述描述描述描述描述描述描述描述描述'},
          {id: 3, videoUrl: 'caiyang1.mp4', imgUrl: 'homebanner.png', name: '采样3', desc: '描述描述描述描述描述描述描述描述描述描述描述描述'}]
      }
    }
  }
</script>
<style scoped>
  .content {
    height: 16rem;
    overflow: auto;
  }
  .main {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    background-color: white;
    justify-content: center;
    align-items: center;
    overflow: auto;
  }

  .video-content {
    /*display: flex;*/
    /*flex-direction: column;*/
    border-radius: 0.4rem;
    box-shadow: #666 0 0 0.3rem;
    height: 7.5rem;
    width: 90%;
    /*margin: 0.3rem 0.3rem;*/
    margin: 0.3rem 0.3rem;
  }

  .video {
    width:100.1%;
    height:5.5rem;
    border-bottom:1px solid gainsboro;
  }
  .info {
    height:2rem;
    margin:0.2rem 0.3rem;
    display: flex;
    flex-direction: column;
  }
  .desc1{
    font-size: 0.5rem;
    font-weight:600;
    color: #1b1a1f;
  }
  .desc2{
    font-size: 0.3rem;
    color: #666;
  }
  .play{
    height: 5.5rem;
    width: 100%;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
  }
</style>
