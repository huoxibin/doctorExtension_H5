<template>
  <div class="layout-header">
    <header class="headerBox clearfix">
      <div class="logo"><img src="../../../assets/logo.png" alt="" @click="$router.push({path:'/index'})"></div>
      <div class="search-box fl">
        <input type="text" v-model="searchContent" placeholder="搜索视频内容">
        <div class="search-btn" @click="searchContentFn">搜索</div>
      </div>
      <div class="menu-box" @click="toggleMenu">
        <div class="menu"></div>
      </div>
    </header>
    <van-popup v-model="menuBoolean" position="top" :style="{ height: '100%' }" :overlay="false">
      <div class="menu-tc" v-show="menuBoolean">
        <div class="menu-tc-header">
          <p>导航</p>
          <div class="menu-box" @click="toggleMenu">
            <div class="menu"></div>
          </div>
        </div>
        <div class="nav-box clearfix">
          <div class="nav-left">
            <div 
              v-for="(item, index) in navList"
              @click="showSecondNavlist(index)"
              :class="{active : index===curId}"
              :key="index">
              <span>{{item.name}}</span>
              <i v-show="index!==curId"></i>
            </div>
          </div>
          <div class="nav-right">
            <div 
              v-for="(item, index) in navList" 
              :key="index" 
              :index="index" 
              v-show="index===curId">
              <span 
                v-for="items in item.twoLevelDepartment" 
                :key="items.id" 
                :id="items.id"
                @click="clickItem(items.id, items.twoLevel)">
                {{ items.twoLevel }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>  
</template>

<script>
import util from '../../../utils/util'
export default {
  data() {
    return {
      menuBoolean: false,
      items: [],
      navList: [],
      activeId: 1,
      activeIndex: 0,
      windowHeight: 0,
      searchContent: '',
      currentIndex: 1,
      curId: 0,
    };
  },
  watch: {

  },
  created() {
    this.getMenulist();
  },
  methods: {
    toggleMenu() {
      this.menuBoolean = !this.menuBoolean;
    },
    clickItem(Lid, twoLevelDepartment){
      if(window.location.href.includes("moreVideo")){
        //当前页是搜索页
        let params = {
          "detpId": Lid,
          "twoLevelDepartment": twoLevelDepartment
        }
        util.$emit('getVideolistFnBynavlist',params);
        document.title = `${twoLevelDepartment}视频`;
        this.menuBoolean = !this.menuBoolean;
      }else{
        //当前页非搜索页
        this.$router.push({
          path: '/moreVideo',
          query: {
            "detpId": Lid,
            "twoLevelDepartment": twoLevelDepartment
          }
        });
        document.title = `${twoLevelDepartment}视频`;
        this.menuBoolean = !this.menuBoolean;
      }
    },
    showSecondNavlist(index){
      this.curId = index;
    },
    getVideolist(params){
        util.$emit('getVideolistFnBysearch',params);
    },
    //搜索
    searchContentFn(){
      if(window.location.href.includes("moreVideo")){
        //当前页是搜索页
        this.getVideolist(this.searchContent);
        document.title = `${this.searchContent}视频`;
      }else{
        //当前页非搜索页
        this.$router.push({
          path: "/moreVideo",
          query:{
            content: this.searchContent,
            // orderType: 1
          }
        }); 
      }
    },
    //获取菜单数据
    getMenulist(){
      this.$get("/data/my", {
        pathL: "/doctor/departmentBase/getDepartmentTree",
        "doctorWeb": 1
      }).then(res => {
        if (!res.state) {
          //处理菜单数据
          this.navList = res.data;
          this.items = res.data.map(function(element, index){
            let children = element.twoLevelDepartment.map(function(el, _index){
              return {
                "text": el.twoLevel,
                "id": el.id,
              };
            });
            return {
              "text": element.name,
              "id": element.id,
              children 
            }
          });
          // console.log(this.items);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.layout-header{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
}
.headerBox{
  background: #ffffff;
  width: 100%;
  height: 60px;
  .logo{
    margin-top: 6px;
    margin-left: 15px;
    float: left;
    width: 60px;
    height: 46px;
    img{
      float: left;
      width: 100%;
    }
  }
  .search-box{
    margin-top: 15px;
    position: relative;
    margin-left: 15px;
    width: 224px;
    height: 30px;
    background: #F0F0F0;
    border-radius: 15px;
    input{
      float: left;
      background: transparent;
      width: 172px;
      font-size: 14px;
      color: #CCCCCC;
      border: none;
      outline: none;
      height: 30px;
      padding: 5px 0 5px 15px;
      line-height: 20px;
      padding-left: 15px;
    }
    .search-btn{
      width: 48px;
      height: 30px;
      line-height: 30px;
      position: absolute;
      top: 0;
      right: 0;
      text-align: center;
      background: #6DE4F2;
      border-radius: 15px;
      font-size: 15px;
      color: #FFFFFF;
    }
  }
}
.menu-box{
  float: right;
  height: inherit;
  padding: 0 5px;
  width: 36px;
  cursor: pointer;
  margin-right: 10px;
  .menu{
    margin-top: 28px;
    width: 27px;
    height: 3px;
    background: #999999;
    border-radius: 2px;
    position: relative;
  }
}
.menu::before{
  content: "";
  width: 27px;
  height: 3px;
  background: #999999;
  border-radius: 2px;
  position: absolute;
  top: 10px;
}
.menu::after{
  content: "";
  width: 27px;
  height: 3px;
  background: #999999;
  border-radius: 2px;
  position: absolute;
  top: -10px;
}
.menu-tc{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  background: #FFFFFF;
  .menu-tc-header{
    padding-left: 30px;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    color: #333333;
    font-weight: 600;
    border-bottom: 1px solid #f0f0f0;
    p{
      float: left;
    }
  }
}
.van-tree-select{
  // width: 100%;
  // position: fixed;
  // top: 0;
  // left: 0;
  
  // top: 0;
  height: calc(100vh - 60px);
}

.van-sidebar-item--select{
  border-color: #6DE4F2 !important;
}
a:hover{
  color: #333333;
  font-weight: 600;
}
.van-tree-select__item--active{
  color: #333333 !important;
  font-weight: 600 !important;
}
.van-icon-checked:before{
  color: #6DE4F2;
}


.fade-enter-active,
.fade-leave-active {
  transition: bottom 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  bottom: -200px;
}
.badge {
  margin-right: 50px;
  cursor: pointer;
}
header .swing {
  animation: swing 2s linear infinite;
}
@keyframes swing {
  10% {
    transform: rotate(25deg);
  }
  20% {
    transform: rotate(-20deg);
  }
  30% {
    transform: rotate(15deg);
  }
  40% {
    transform: rotate(-15deg);
  }
  50%,
  100% {
    transform: rotate(0deg);
  }
}


.nav-left{
  float: left;
  width: 150px;
  height: calc(100vh - 60px);
  background: #F9F9F9;
  div{
    height: 45px;
    line-height: 45px;
    padding-left: 30px;
    font-size: 15px;
    color: #333333;
    border-left: 3px solid transparent;
    position: relative;
    i{
      position: absolute;
      top: 0;
      right: 15px;
      display: inline-block;
      height: 100%;
      width: 9px;
      background: url("../../../assets/tablist_more.png") no-repeat center center;
      background-size: 9px 16px; 
    } 
  }
  div.active{
    border-color: #6DE4F2;
    background: #ffffff;
  }
}
.nav-right{
  height: calc(100vh - 60px);
  overflow-y: scroll;
  margin-left: 150px;
  span{
    display: block;
    text-align: center;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    color: #333333;
  }
}
</style>
