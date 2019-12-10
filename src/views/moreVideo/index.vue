<template>
  <div>
    <!-- 视频内容 -->
    <div class="main-refresh" style="height:calc(100vh - 60px);overflow:hidden;">
      <pull-to :top-load-method="refresh" :bottom-load-method="loadMore" :bottom-config="BOTTOM_DEFAULT_CONFIG">
        <section class="container">
            <div class="video-box clearfix" v-for="(item, index) in videoData" v-bind:key="index" @click="gomoreVideo(item)" >
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
      </pull-to>
    </div>  
  </div>
</template>
<script>
import util from '../../utils/util';
import PullTo from '@/components/vue-pull-to/src/index';
export default {
  components:{
    PullTo
  },
  props: {
    msg: String
  },
  data() {
    return {
      show: false,
      videoData: [],
      pageNum: 1,
      pageSize: 8,
      content: this.$route.query.content,
      detpId: this.$route.query.detpId,
      orderType: this.$route.query.orderType,
      twoLevelDepartment: this.$route.query.twoLevelDepartment,
      count: 0,
      isLoading: false,
      total: 0,
      BOTTOM_DEFAULT_CONFIG: {
        pullText: "上滑继续加载",
        triggerText: "释放更新",
        loadingText: "加载中,请稍后",
        doneText: "加载完成",
        failText: "加载失败",
        loadedStayTime: 1000,
        stayDistance: 50,
        triggerDistance: 50,
        list: ""
      },
    }
  },
  beforeCreate(){
    
  },
  mounted(){
    if(this.twoLevelDepartment != "" && this.twoLevelDepartment != "undefined" && this.twoLevelDepartment != undefined){
      document.title = `${this.twoLevelDepartment}视频`;
    }else if(this.content != "" && this.content != "undefined" && this.content != undefined){
      document.title = `${this.content}视频`;
    }else{
      document.title = "科普视频";
    }
    //点击导航二级科室获取视频列表
    util.$on('getVideolistFnBynavlist',(params)=>{
      this.detpId = params.detpId;
      this.getVideolist();
    });
    //通过搜索获取视频列表
    util.$on('getVideolistFnBysearch',(params)=>{
      this.detpId = '';
      this.getVideolist(params);
    });
    this.getVideolist();
  },
  beforeDestroy(){
    util.$off('getVideolistFnBynavlist');
    util.$off('getVideolistFnBysearch');
  },
  methods:{
    //跳转到视频详情页
    gomoreVideo(item){
      this.$router.push({
        path: "/videoDetail", 
        query: {
          courseId: item.courseId
        }
      });    
    },
    getVideolist(params){
      this.content = params ? params : this.content;
      this.$get("/data/my", {
        pathL: "/doctor/course/courseList",
        "pageNum": 1,
        "pageSize": 8,
        "content": params || this.content || "",
        "detpId": this.detpId || "",
        "orderType": this.orderType || 1
      }).then(res => {
        if (!res.state) {
          let data = res.data;
          this.total = data.total
          this.videoData = data.result
        }
      }).catch(err => {
        console.log(err);
      });
    },
    //下拉刷新
		refresh(loaded) {
			this.$get("/data/my", {
        pathL: "/doctor/course/courseList",
        "pageNum": 1,
        "pageSize": 8,
        "content": this.content || "",
        "detpId": this.detpId || "",
        "orderType": this.orderType || 1
      }).then(res => {
        if (!res.state) {
          this.pageNum = 2;
          this.videoData = res.data.result
          loaded('done')
        }
      }).catch(err => {
        console.log(err);
      });
		},
		//上拉加载
		loadMore(loaded) {
      if(this.pageNum * this.pageSize >= this.total){
        this.BOTTOM_DEFAULT_CONFIG.doneText = "已加载全部数据";
        loaded('done');
        return
      }
			this.$get("/data/my", {
        pathL: "/doctor/course/courseList",
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
        "content": this.content || "",
        "detpId": this.detpId || "",
        "orderType": this.orderType || 1
      }).then(res => {
        if (!res.state) {
          let data = res.data;
          this.pageNum += 1;
          this.videoData = [...this.videoData, ...res.data.result];
          loaded('done')
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>
<style scoped lang="scss">
.container{
  height: calc(100vh - 60px);
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
  // height: 80px;
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
</style>
