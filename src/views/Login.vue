<template>
  <el-form
    ref="formRef"
    :model="loginForm"
    label-width="120px"
    class="login-form"
  >
    <el-form-item
      prop="account"
      label="用户名"
      :rules="[
        {
          required: true,
          message: 'Please input user name',
          trigger: 'blur',
          default: 'admin'
        },
      ]"
    >
      <el-input v-model="loginForm.account" />
    </el-form-item>
    <el-form-item
      label="密码"
      prop="pwd"
    >
      <el-input type="password" v-model="loginForm.pwd" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import apis from '../apis'

const formRef = ref<FormInstance>()
const loginForm = reactive<loginParams>({
  account: 'admin',
  pwd: '81cdcdc512ba118d305c7825e8597319'
})

const submitForm = (formEl: FormInstance | undefined) => {
  debugger
  if (!formEl) return
  formEl.validate((valid) => {
    debugger
    if (valid) {
      debugger
      apis.login(loginForm).then(res => {
        alert(res)
      })
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
