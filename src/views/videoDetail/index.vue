<template>
  <div>
    <!-- 视频详情    
    x
    
    
    -->
    <section class="video">
        <div class="cover-img" v-show="videocoverimg">
            <img class="cover-img-poster" :src="poster">
            <div  class="paly-icon" @click="playVideoicon"></div>
        </div>
        <video
            id="video" 
            :src="src"
            width="100%"
            height="100%"           
            controls
            controlslist="nodownload"
            webkit-playsinline
            playsinline
            x5-playsinline
            x-webkit-airplay="allow"
            :poster="poster"
        ></video>
    </section>
    <section class="container">
      <div class="video-info">
          <h1 class="video-title">{{ videoMsg.courseName }}</h1>
          <div class="video-time"><span>{{ videoMsg.createTime.substr(0, 10) }}</span><i class="read-count">{{ videoMsg.readCount}}</i></div>
      </div>
      <div class="doctor-info clearfix">
          <div class="doctor-img"><img v-bind:src="videoMsg.doctorInfo.doctorUrl" alt="医生头像"></div>
          <div class="doctor-name"><span>{{ videoMsg.doctorInfo.doctorName }}</span><i>{{ videoMsg.doctorInfo.titleName }}</i></div>
          <div class="doctor-agency"><span>{{ videoMsg.doctorInfo.hospitalName}}</span><i>{{ videoMsg.doctorInfo.departmentName }}</i></div>
      </div>
      <div class="video-txt-title">视频内容</div>
      <article v-html="videoMsg.courseIntroduction"></article>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    msg: String
  },
  data() {
    return {
        show: false,
        videoMsg: {},
        poster: '',
        src: '',
        videocoverimg: true
    }
  },
  mounted(){
    this.getVideomsg();
  },
  methods:{
    //播放视频
    playVideoicon(){
        let videoObj = document.querySelector("#video");
        this.videocoverimg = !this.videocoverimg;
        videoObj.play();
    },
    getVideomsg(){
        let _this = this;
        this.$get("/data/my", {
            pathL: "/doctor/course/getCourseDetail",
            "courseId": this.$route.query.courseId
        }).then(res => {
            if (!res.state) {
                document.title = res.data.courseName;
                this.videoMsg = res.data;
                this.poster = res.data.imageUrl;
                _this.playVideo(res.data.videoId);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    playVideo(videoId){
        this.$get("/data/my", {
            pathL: "/doctor/alimedia/getPlayInfo",
            "videoId": videoId
        }).then(res => {
            if (!res.state) {
                let data = res.data;
                this.src = data.playInfoList[0].playURL;
            }
        }).catch(err => {
            console.log(err);
        });
    }
  }
}
</script>
<style  lang="scss">
.video{
    width: 100%;
    height: 211px;
    position: relative;
    margin-bottom: 15px;
    z-index: 0;
    position: relative;
}
.cover-img{
   width: 100%;
   height: 211px;
   position: absolute;
   top: 0;
   left: 0;
   z-index: 1;
   .cover-img-poste{
       width: 100%;
       height: 100%;
   }
   .paly-icon{
        width: 50px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url("../../assets/play.png");
        background-size: 50px 50px; 
   }
}
.container{
  width: 100%;
  padding: 0 15px;
}
.video-title{
    font-size: 17px;
    color: #333333;
    line-height: 24px;
    font-weight: 600;
}
.video-time{
    margin-top: 10px;
    padding-bottom: 15px; 
    font-size: 14px;
    line-height: 20px;
    color: #666666;
    border-bottom: 1px solid #F0F0F0;
    span{
        margin-right: 20px;
    }
    i{
        padding-left: 25px;
        background: url("../../assets/readCount.png") no-repeat center left;
        background-size: 18px 12px; 
    }
}
.doctor-info{
    margin-top: 15px;
    .doctor-img{
        overflow: hidden;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        float: left; 
    }
    .doctor-name{
        margin-left: 70px;
        line-height: 20px;
        span{
            display: inline-block;
            margin-right: 13px;
            font-weight: 600;
            font-size: 15px;
            color: #333333;
        }
        i{
            display: inline-block;
            font-size: 14px;
            color: #333333;
        }
    }
    .doctor-agency{
        margin-left: 70px;
        line-height: 21px;
        // margin-top: 9px;
        span{
            display: inline-block;
            margin-right: 15px;
            font-size: 14px;
            color: #999999;
        }
        i{
            display: inline-block;
            font-size: 14px;
            color: #999999;
        }
    }
}
.video-txt-title{
    margin-top: 15px;
    font-size: 15px;
    line-height: 21px;
    color: #333333;
    font-weight: 600;
    margin-bottom: 10px;
}
article{
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    text-align: justify;
    margin-bottom: 50px; 
}
</style>
