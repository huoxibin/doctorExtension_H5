<template>
  <div class="index">
    <!-- banner轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannerData" :key="index">
        <a :href="item.linkUrl" target="_blank">
          <img style="width:100% !important; height:100% !important;" :src="item.url" alt="">
        </a>
      </van-swipe-item>
    </van-swipe>
    <!-- 查看更多 -->
    <section class="container">
      <div class="moerVideo">科普视频<span @click="gomoreVideo">更多</span></div>
    </section>
    <!-- 视频内容 -->
    <section class="container">
      <div class="video-box clearfix" v-for="(item, index) in videoData" v-bind:key="index" @click="govideoDetail(item)">
        <div class="video-img">
          <img class="play" src="../../assets/play.png" />
          <img v-bind:src="item.imageUrl" alt="">
          <div class="video-time">{{ item.duration }}</div>
        </div>
        <div class="video-desc">
          <p class="video-title">{{ item.courseName }}</p>
          <p class="doctor-name"><span>{{ item.doctorName }}</span><span>{{ item.titleName }}</span></p>
          <p class="doctor-drpt"><span>{{ item.hospitalName }}</span><span>{{ item.doctorDeptName }}</span></p>
          <p class="video-readCount"><span>{{ item.createTime.substr(0, 10) }}</span><i>{{ item.readCount }}</i></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      show: false,
      videoData: [],
      bannerData: []
    }
  },
  mounted(){
    document.title = "哆咖医生";
    this.getVideolist();
    this.getBannerlist();
  },
  methods:{
    //跳转到视频更多页面
    gomoreVideo(){
      this.$router.push({
        path: "/moreVideo"
      }); 
    },
    //跳转到视频详情页
    govideoDetail(item){
      this.$router.push({
        path: "/videoDetail", 
        query: {
          courseId: item.courseId
        }
      });    
    },
    //获取首页视频列表
    getVideolist(){
      this.$get("/data/my", {
        pathL: "/doctor/course/courseList",
        "pageNum": 1,
        "pageSize": 8,
        "content": "",
        "detpId": "",
        "orderType": 1
      }).then(res => {
        if (!res.state) {
          this.videoData = res.data.result
          // console.log(this.videoData);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    //获取banner列表
    getBannerlist(){
      this.$get("/data/my", {
        pathL: "/common/advertise/queryList",
        "advertisePlaceName": "doctor_web_course"
      }).then(res => {
        if (!res.state) {
          this.bannerData = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>
<style scoped lang="scss">
.van-swipe{
  height: 211px;
  margin-bottom: 15px;
  // z-index: -1;
}
.van-swipe-item{
  // background: red;
}
.container{
  width: 100%;
  padding: 0 15px;
}
.moerVideo{
  margin-bottom: 15px;
  font-size: 15px;
  line-height: 21px;
  color: #333333; 
  font-weight: 600;
  span{
    float: right;
    padding-right: 20px;
    font-size: 13px;
    line-height: 21px;
    color: #999999;
    background: url("../../assets/moreRight.png") no-repeat center right;
    background-size: 11px 12px; 
  }
}
.video-box{
  margin-bottom: 15px;
}
.video-img{
  float: left;
  width: 142px;
  height: 80px;
  // background: blue;
  position: relative;
  z-index: -1;
  .video-time{
    width: 44px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgba(0,0,0,0.40);
    border-radius: 10px;
    font-size: 12px;
    color: #FFFFFF;
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
  .play{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
.video-desc{
  width: 100%;
  padding-left: 157px; 
  height: 80px;
  p.video-title{
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  p.doctor-name{
    margin-top: 4px;
    font-size: 14px;
    line-height: 17px;
    color: #333333;
    span{
      margin-right: 10px;
    }
    span:last-child{
      margin-right: 0;
    }
  }
  p.doctor-drpt{
    margin-top: 5px;
    font-size: 13px;
    color: #666666;
    line-height: 15px;
    span{
      margin-right: 10px;
    }
    span:last-child{
      margin-right: 0;
    }
  }
  .video-readCount{
    margin-top: 5px;
    line-height: 15px;
    font-size: 12px;
    color: #999999;
    span{
      margin-right: 15px;
    }
    i{
      padding-left: 20px;
      background: url("../../assets/readCount.png") no-repeat center left;
      background-size: 15px 10px;
    }
  }
}
.button {
  background-color: #47DCF0;
  width: 319px;
  border-radius: 6px;
  margin: 0 auto;
  font-size: 18px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #ffffff;
}
</style>
