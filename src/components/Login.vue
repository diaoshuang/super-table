<template>
  <div class="login-div">
    <!-- <div class="logo"></div> -->
    <div class="title">账号登录</div>
    <el-form
      ref="formRef"
      :model="loginForm"
      label-position="top"
      label-width="70px"
      class="login-form"
    >
      <el-form-item
        prop="account"
        label="用户名"
        :rules="[
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
            default: '',
          },
        ]"
      >
        <el-input v-model="loginForm.account" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="pwd"
        :rules="[
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
            default: '',
          },
        ]"
      >
        <el-input type="password" v-model="loginForm.pwd" />
      </el-form-item>
      <el-form-item
        prop="verifyCode"
        label="验证码"
        v-if="isShowVerifyCode"
        :rules="[
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
            default: '',
          },
        ]"
      >
        <el-input v-model="loginForm.verifyCode" />
        <img
          class="verify-code"
          @click="handleRefresh"
          alt="验证码"
          :src="verifyCodeImgUrl"
        />
      </el-form-item>
      <el-form-item>
        <div class="save-pass" @click="handleSetSavePass">
          <CircleCheckFilled
            class="icon"
            :class="[isSavePass ? 'checked' : '']"
          />记住密码
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          @click="submitForm(formRef)"
          >登录</el-button
        >
        <!-- <el-button @click="resetForm(formRef)">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { CircleCheckFilled } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import apis from '../apis';
import { storage } from '../util';

const isSavePass = ref(false);
const isShowVerifyCode = ref(false);
const verifyCodeImgUrl = ref('');
const formRef = ref<FormInstance>();
const loginForm = reactive<loginParams>({
  account: '',
  pwd: '',
  verifyCode: '',
});

const init = () => {
  // 是否保存密码
  isSavePass.value = storage.getStorage('savePass') === 'true' || false;
  if (isSavePass.value) {
    const saveUser = JSON.parse(storage.getStorage('saveUser') || '{}');
    loginForm.account = saveUser.account || '';
    loginForm.pwd = saveUser.pwd || '';
  }
  // 初始化验证码url
  handleRefresh();
};
const handleRefresh = () => {
  verifyCodeImgUrl.value = `/erupt-api/code-img?_t${Date.now()}`;
};

const handleSetSavePass = () => {
  isSavePass.value = !isSavePass.value;
  localStorage.setItem('savePass', isSavePass.value + '');
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const res = await apis.login(loginForm);
        const loginInfo = res.data;
        if (loginInfo.pass) {
          ElMessage.success('登录成功！');
          storage.setStorage(
            '_token',
            JSON.stringify(loginInfo),
            loginInfo.expire || ''
          );
          if (isSavePass.value) {
            const saveUser = {
              account: loginForm.account,
              pwd: loginForm.pwd,
            };
            storage.setStorage(
              'saveUser',
              JSON.stringify(saveUser),
              Date.now() + 86400_0_000
            );
          }
          // TODO 去往数据=首页
          return;
        }
        isShowVerifyCode.value = loginInfo?.useVerifyCode || false;
        ElMessage.error('登录失败，' + loginInfo.reason || '请稍后再试！');
      } catch (e: any) {
        ElMessage.error('登录失败，' + e.message || '请稍后再试！');
      }
    } else {
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 初始数据加载
init();
</script>
<style lang="scss" scoped>
.login-div {
  color: $cf-normal;
}
.title {
  border-bottom: 1px solid #efefef;
  font-size: 20px;
  text-align: left;
  padding-bottom: 22px;
}
.logo {
  background: url('@/assets/logo.png') no-repeat center center;
  background-size: 100% auto;
  margin: 20px auto;
  height: 32px;
  width: 32px;
}
.login-form {
  margin: 20px auto 0;
  min-width: 200px;
}
.save-pass {
  display: flex;
  cursor: pointer;
  .icon {
    color: #e5e5e5;
    margin-right: 4px;
    width: 18px;
    &.checked {
      color: $cf-primary;
    }
  }
}

.submit-button {
  background: #605bff;
  border-radius: 4px;
  font-size: 16px;
  height: 60px;
  line-height: 100%;
  width: 100%;
}
</style>
