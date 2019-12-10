<template>
  <footer>
    <p>京ICP备16061273号</p>
    <p>广播电视节目制作经营许可证：（京）字第11898号</p>
    <p>Copyright© 2019-2020 北京健科云网科技有限公司版权所有未经授权请勿转载</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
footer {
  width: 100%;
  background-color: #F9F9F9;
  height: 80px;
  padding: 4px 0 0 0;
}
footer p {
  font-size: 12px;
  line-height: 16px;
  color: #999999;
  text-align: center;
  margin: 2px 30px; 
}
</style>
