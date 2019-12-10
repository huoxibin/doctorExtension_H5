<template>
  <div class="hello">
    <p>签到提醒</p>
    <p>北京健科云网科技有限公司</p>
    <p>北京健科云网科技有限公司</p>
    <p>北京健科云网科技有限公司</p>
    <p>北京健科云网科技有限公司</p>
    <p>北京健科云网科技有限公司</p>
    <van-popup v-model="show" position="top" :overlay="true"></van-popup>
    <van-button disabled type="primary">禁用状态</van-button>
    <div class="button">签到</div>
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
      show: true
    }
  }
}
</script>
<style scoped lang="scss">
p{
  font-size: 28px;
  line-height: 34px;
  padding-left: 16px;
}
.button {
  background-color: #47DCF0;
  width: 638px;
  border-radius: 12px;
  margin: 0 auto;
  font-size: 36px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  color: #ffffff;
}
</style>
