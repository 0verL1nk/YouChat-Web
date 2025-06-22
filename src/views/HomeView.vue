<script setup lang="ts">
import MainView from '@/views/Chat/MainView.vue'
import MainHeader from '@/views/Header/MainHeader.vue'
import { ref } from 'vue'

// WebSocket 连接状态
const wsConnected = ref(false)
const mainViewRef = ref<InstanceType<typeof MainView> | null>(null)

// 更新连接状态的方法
const updateConnectionStatus = (status: boolean) => {
  wsConnected.value = status
}
// 处理登出
const handleLogout = () => {
  mainViewRef.value?.close() // 调用 MainView 组件的 close 方法
}
</script>

<template>
  <div class="home-container">
    <MainHeader :isConnected="wsConnected" @logout="handleLogout" />
    <main class="main-content">
      <MainView @connection-change="updateConnectionStatus" />
    </main>
  </div>
</template>

<style scoped>
.home-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 40px;
  /* Header 的高度 */
}
</style>
