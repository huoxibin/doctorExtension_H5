<template>
  <!-- index -->
  <div class="layout">
    <!-- 头 -->
    <doctorExtensionHeader/>

    <!-- 内容 -->
    <div class="content">
      <!-- router -->
        <router-view/>
    </div>

    <!-- 尾 -->
    <doctorExtensionFooter/>
  </div>
</template>

<script>
import doctorExtensionHeader from "./header";
import doctorExtensionFooter from "./footer";
export default {
  components: { doctorExtensionHeader, doctorExtensionFooter},
  computed: {
    // ...mapGetters(["linkName"]),
  },
  data() {
    return {
    };
  },
  methods: {
  },
  created () {
  },
  mounted () {

  }
};
</script>
<style scoped>
.layout {
  width: 100%;
  height: 100%;
}
.content {
  /* min-height: 600px; */
  width: 100%;
  /* height: calc(100vh - 60px); */
  margin-top: 60px;
}
</style>
