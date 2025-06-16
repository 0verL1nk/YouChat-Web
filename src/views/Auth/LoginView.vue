<template>
  <div class="login-container">
    <a-card class="login-card" bordered>
      <div class="logo">
        <!-- <img src="/logo.png" alt="Logo" /> -->
      </div>
      <a-form :model="form" :rules="rules" ref="loginForm" layout="vertical" @finish="handleSubmit">
        <a-form-item label="邮箱" name="email" :rules="rules.email">
          <a-input v-model:value="form.email" placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="rules.password">
          <a-input-password v-model:value="form.password" placeholder="请输入密码" />
        </a-form-item>

        <a-form-item label="验证码" name="captcha" :rules="rules.captcha">
          <div class="captcha-wrapper">
            <a-input v-model:value="form.captcha" placeholder="验证码" style="width: 60%;" />
            <img :src="captchaUrl" @click="refreshCaptcha" alt="captcha" class="captcha-img" />
          </div>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            登录
          </a-button>
        </a-form-item>

        <div class="extra-actions">
          <a-button type="link" @click="goRegister">注册账号</a-button>
          <a-button type="link" @click="goForgot">忘记密码？</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'
import { message, type FormInstance } from 'ant-design-vue'
import { useUserStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { Login } from '@/services/auth'
import type { LoginReq } from '@/types/auth'
import { setUserID, setToken } from '@/stores/local'



const form = reactive<LoginReq>({
  email: '',
  password: '',
  captcha: ''
})

const loginForm = ref<FormInstance>()
const userStore = useUserStore()
const router = useRouter()

const rules = {
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: false, message: '请输入验证码', trigger: 'blur' }]
}

const captchaUrl = ref(`/api/captcha?ts=${Date.now()}`)
const refreshCaptcha = () => {
  captchaUrl.value = `/api/captcha?ts=${Date.now()}`
}

const handleSubmit = () => {
  loginForm.value?.validate().then(async () => {
    // 调用登录接口示例
    // api.login(form.value).then(res => {
    //   userStore.setUser(res.data)
    //   const redirect = router.currentRoute.value.query.redirect as string || '/'
    //   router.push(redirect)
    // })
    console.log("user login:",form)
    var res = await Login(form)
    setToken(res.data.token)
    setUserID(res.data.user_id)
    const redirect = '/'
    router.push(redirect)
    message.success("登陆成功")
    console.log('提交表单', form)
  }).catch(err => {
    message.error(err.data.error_msg||"登陆失败")
    console.log('验证失败', err)
  })
}

// 跳转到注册页面
const goRegister = () => {
  router.push({ path: '/register' })
}

// 跳转到找回密码页面
const goForgot = () => {
  router.push({ path: '/forgot-password' })
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
}

.login-card {
  width: 360px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: default;
}

.logo {
  text-align: center;
  margin-bottom: 24px;
}

.logo img {
  width: 120px;
}

.captcha-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.captcha-img {
  cursor: pointer;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.extra-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.extra-actions .ant-btn-link {
  padding: 0;
}
</style>