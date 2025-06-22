<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'

const loadingStore = useLoadingStore()
const { loading } = storeToRefs(loadingStore)
</script>

<template>
  <div class="app-container">
    <RouterView />
    <!-- 全局加载动画 -->
    <div class="global-loading" v-if="loading">
      <a-spin size="large">
        <div class="loading-content">加载中...</div>
      </a-spin>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
}

.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-content {
  margin-top: 8px;
  color: #1890ff;
}
</style>
