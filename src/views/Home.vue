<template>
  <div class="home-header">
    <KqLogo class="home-header-logo" @click="handleTop" />
    <el-tabs
      v-model="activeName"
      class="home-header-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="合作伙伴" name="friends"></el-tab-pane>
      <el-tab-pane label="关于我们" name="about"></el-tab-pane>
    </el-tabs>
    <div class="home-header-register">注册</div>
  </div>
  <div ref="homeContent" class="home-content">
    <div ref="contentLogin" class="content-login">
      <!-- login form -->
      <div class="title">
        <h1>智能数据服务平台</h1>
        <p>
          监控业务数据、洞悉用户特征、精准用户触达监控业务数据，实现对产品日常运营核心业务数据的精准监控，满足企业管理。
        </p>
      </div>
      <Login class="login-form" />
    </div>
    <Friends ref="contentFriends" />
    <About ref="contentAbout" />
  </div>
  <div class="home-footer">
    <!-- right -->
    ©2022 kunqishucang Ltd, All rights reserved
  </div>
  <el-button
    v-if="isShowTop"
    class="top-button"
    :icon="Top"
    size="large"
    @click="handleTop"
    circle
  />
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, VueElement } from 'vue';
import KqLogo from '@/components/KqLogo.vue';
import Friends from '@/components/home/Friends.vue';
import About from '@/components/home/About.vue';
import Login from '@/components/Login.vue';
import type { TabsPaneContext } from 'element-plus';
import { Top } from '@element-plus/icons-vue';
import { debounce, throttle } from 'lodash';

const activeName = ref('home');
const body = ref<HTMLBodyElement | null>(null);
const contentLogin = ref<HTMLDivElement | null>(null);
const contentFriends = ref<VueElement | HTMLDivElement | null>(null);
const contentAbout = ref<HTMLDivElement | null>(null);
const isShowTop = ref(false);

const scroll2Point = (dom: VueElement | HTMLDivElement | null) => {
  if (dom) {
    if (dom instanceof HTMLDivElement) {
      dom.scrollIntoView();
    } else {
      (dom as any).$el.scrollIntoView();
    }
  }
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  if (activeName.value === 'friends') {
    scroll2Point(contentFriends.value);
  } else if (activeName.value === 'about') {
    scroll2Point(contentAbout.value);
  }
};
const handleTop = () => {
  scroll2Point(contentLogin.value);
};
const handleScroll = debounce(() => {
  const scrollTop = body.value?.scrollTop || 0;
  isShowTop.value = scrollTop > 300;
}, 1000);

onMounted(() => {
  body.value = document.querySelector('body');
  body.value?.addEventListener('scroll', handleScroll);
});
onBeforeUnmount(() => {
  body.value?.removeEventListener('scroll', handleScroll);
});
</script>
<style lang="scss" scoped>
.home-header {
  background: $cb-dark;
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  line-height: 90px;
  z-index: 10;
  .home-header-logo {
    cursor: pointer;
    margin: 28px 40px 0 40px;
  }
  .home-header-tabs {
    flex: 1;
    margin: 0 40px;

    :deep {
      .el-tabs__item {
        color: $cf-light;
        padding: 0 40px;
        &:first-child {
          padding-left: none;
        }
        &:last-child {
          padding-right: none;
        }
      }
      .el-tabs__nav-wrap::after {
        height: 0;
      }
      .el-tabs__active-bar {
        height: 4px;
      }
    }
  }
  .home-header-register {
    color: $cf-light;
    width: 100px;
    cursor: pointer;
  }
}
.home-content {
  scroll-behavior: smooth;
  .content-login {
    background: url('@/statics/images/home-1.png') no-repeat center center;
    background-size: 100% 100%;
    color: $cf-write;
    height: 100vh;
    overflow: hidden;
    position: relative;
    .title {
      background: #030218;
      height: 100%;
      opacity: 0.8;

      h1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 64px;
        position: absolute;
        left: 150px;
        top: 200px;
      }
      p {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 32px;
        position: absolute;
        left: 150px;
        top: 280px;
        width: 360px;
      }
    }
    .login-form {
      background: #ffffff;
      box-shadow: 0px 4px 4px rgba(215, 215, 215, 0.25);
      border-radius: 10px;
      width: 300px;
      overflow: hidden;
      padding: 30px 40px 50px;
      position: absolute;
      top: 100px;
      right: 150px;
    }
  }
}
.home-footer {
  background: $cb-dark;
  color: $cf-light;
  height: 90px;
  line-height: 90px;
  text-align: center;
  width: 100%;
}
.top-button {
  position: fixed;
  bottom: 100px;
  right: 60px;
  font-size: 25px;
  font-weight: bold;
  opacity: 0.7;
}
</style>
