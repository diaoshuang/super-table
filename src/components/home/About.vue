<template>
  <div class="content-about">
    <!-- about -->
    <h2>关于我们</h2>
    <p class="about">
      鲲麒是领先的数据智能服务商，提供数据采集、数据治理、数据仓库、分析和营销等数据智能服务，围绕业务场景，提供的用户行为分析平台，内置多种数据分析模型，可实现用户精细化运营，支持私有化部署，最终赋能企业数字化转型，实现数据驱动增长
    </p>
  </div>
</template>
<style scoped lang="scss">
.content-about {
  background: url('@/statics/images/about.png') no-repeat center bottom;
  background-size: 100% calc(100% - 320px);
  height: 100vh;
  min-height: 700px;
  overflow: hidden;
  padding-top: 140px;
  text-align: center;
  .about {
    color: $cf-gray;
    width: 50%;
    margin: 10px auto;
  }
}
</style>
