<template>
  <div class="register-container">
    <a-card class="register-card" bordered>
      <div class="logo">
        <!-- <img src="/logo.png" alt="Logo" /> -->
      </div>
      <a-form :model="form" :rules="rules" ref="registerForm" layout="vertical" @finish="handleSubmit">
        <a-form-item label="邮箱" name="email" :rules="rules.email">
          <a-input v-model:value="form.email" placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item label="密码" name="password" :rules="rules.password">
          <a-input-password v-model:value="form.password" placeholder="请输入密码" />
        </a-form-item>

        <a-form-item label="确认密码" name="password" :rules="rules.rePassword">
          <a-input-password v-model:value="form.rePassword" placeholder="请再次输入密码" />
        </a-form-item>
        <a-form-item label="验证码" name="captcha" :rules="rules.captcha">
          <div class="captcha-wrapper">
            <a-input v-model:value="form.captcha" placeholder="验证码" style="width: 60%;" />
            <img :src="captchaUrl" @click="refreshCaptcha" alt="captcha" class="captcha-img" />
          </div>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            注册
          </a-button>
        </a-form-item>

        <div class="extra-actions">
          <a-button type="link" @click="goLogin">返回登陆</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message, type FormInstance } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { Register } from '@/services/auth'
import type { RegisterReq } from '@/types/auth'
import type { RuleObject } from 'ant-design-vue/es/form'


const form = reactive({
  email: '',
  password: '',
  rePassword: '',
  captcha: ''
})

const registerForm = ref<FormInstance>()
const router = useRouter()

const rules = {
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  rePassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (_rule: RuleObject, value: string) => {
        if (value !== form.password) {
          return Promise.reject('两次输入的密码不一致')
        }
        return Promise.resolve()
      },
      trigger: 'blur'
    }
  ],
  captcha: [{ required: false, message: '请输入验证码', trigger: 'blur' }]
}

const captchaUrl = ref(`/api/captcha?ts=${Date.now()}`)
const refreshCaptcha = () => {
  captchaUrl.value = `/api/captcha?ts=${Date.now()}`
}

const handleSubmit = () => {
  registerForm.value?.validate().then(async () => {
    const req: RegisterReq = {
      email: form.email,
      password: form.password,
      captcha: form.captcha
    }
    console.log("user register:", req)
    await Register(req)
    const redirect = '/'
    router.push(redirect)
    message.success("注册成功")
    console.log('提交表单', form)
  })
}
// 跳转到登录页面
const goLogin = () => {
  router.push({ path: '/login' })
}
</script>

<style scoped>
.register-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
}

.register-card {
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