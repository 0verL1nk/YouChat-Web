<template>
  <a-layout-header class="header">
    <div class="header-content">
      <div class="left">
        <h1 class="logo">YouChat</h1>
      </div>

      <div class="right">
        <!-- 服务器连接状态 -->
        <span class="status-indicator" :class="{ connected: isConnected }">
          <div class="status-dot"></div>
          {{ isConnected ? '已连接' : '未连接' }}
        </span>

        <!-- 用户信息下拉菜单 -->
        <a-dropdown>
          <div class="user-info">
            <a-avatar :src="userAvatar">
              {{ !userAvatar ? userName.slice(0, 2) : '' }}
            </a-avatar>
            <span class="user-name">{{ userName }}</span>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="settings">
                <setting-outlined />
                设置
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout" @click="handleLogout">
                <logout-outlined />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { getUserName, getUserAvatar, removeToken, getUserID } from '@/stores/local'

const { isConnected } = defineProps<{
  isConnected: boolean
}>()
// 定义 logout 事件
const emit = defineEmits<{
  (e: 'logout'): void
}>()

const router = useRouter()
const userName = computed(() => getUserName() || '用户')
const userAvatar = computed(() => getUserAvatar(getUserID()))

const handleLogout = () => {
  // 实现登出逻辑
  emit('logout') // 触发登出事件
  removeToken()
  router.push('/login')
}
</script>

<style scoped>
.header {
  background: #fff;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  position: fixed;
  width: 100%;
  z-index: 1000;
}

.header-content {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 24px;
}

.logo {
  color: #1890ff;
  margin: 0;
  font-size: 20px;
}

.right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #999;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff4d4f;
  transition: background-color 0.3s;
}

.connected .status-dot {
  background: #52c41a;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background: #f5f5f5;
}

.user-name {
  font-size: 14px;
  color: #333;
}
</style>
