<template>
  <div class="chat-container">
    <!-- 设置用户名弹窗 -->
    <!-- <a-modal v-model:open="userIdModalVisible" title="设置用户名" @ok="handleSetUserId" ok-text="保存">
      <a-input v-model:value="userIdInput" placeholder="请输入用户名或用户ID" />
    </a-modal> -->
    <!-- 左侧联系人列表 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <span>联系人</span>
        <PlusCircleOutlined @click="showAddContactModal" style="cursor: pointer; font-size: 18px;" />
      </div>

      <!-- 搜索联系人 -->
      <div style="padding: 0 12px 8px;">
        <a-input-search v-model:value="searchText" placeholder="搜索联系人" allow-clear />
      </div>

      <a-list bordered class="contact-list">
        <a-list-item v-for="item in filteredContacts" :key="item.id" :class="{ active: item.id === activeContact?.id }"
          @click="selectContact(item)">
          {{ item.name }} (ID: {{ item.id }})
        </a-list-item>
      </a-list>
    </div>
    <!-- 添加联系人弹窗 -->
    <a-modal
      v-model:open="addContactModalVisible"
      title="添加联系人"
      @ok="handleAddContact"
      ok-text="添加"
    >
      <a-input
        v-model:value="addSearchText"
        placeholder="输入用户名或ID搜索"
        @input="onAddSearchChange"
        allow-clear
      />
      <a-list
        v-if="searchResults.length"
        :data-source="searchResults"
        bordered
        style="margin-top: 12px"
      >
        <template #renderItem="{ item }">
          <a-list-item @click="selectSearchResult(item)" style="cursor: pointer">
            {{ item.name }} (ID: {{ item.id }})
          </a-list-item>
        </template>
      </a-list>
      <div v-else-if="addSearchText" style="margin-top: 12px; color: gray;">
        未找到用户
      </div>
    </a-modal>
    <!-- 右侧聊天窗口 -->
    <div class="chat-box">
      <div class="chat-header">{{ activeContact?.name || '请选择联系人' }}</div>

      <div class="chat-content">
        <div v-if="chatSelected" v-for="(msg, index) in messages" :key="index"
          :class="['chat-message', msg.from === 'me' ? 'from-me' : 'from-other']">
          {{ msg.text }}
        </div>
      </div>

      <div class="chat-input">
        <a-input-search v-model:value="inputText" placeholder="输入消息..." enter-button="发送" @search="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useUserStore } from '@/stores/auth'
import { setUserID, getUserID, getToken } from '@/stores/local'
import { useSocket } from '@/utils/socket'
import { API_URLS, API_WS_URLS } from '@/api/urls'
import type { Contact } from '@/types/contact'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import {debounce} from 'lodash-es'
const userStore = useUserStore()
const userIdModalVisible = ref(false)
const userIdInput = ref('')
const chatSelected = ref(false)

interface Message {
  text: string
  from: 'me' | 'other'
}
// 搜索联系人
const searchText = ref('')
const filteredContacts = computed(() => {
  const kw = searchText.value.toLowerCase()
  return contacts.value.filter(c =>
    c.name.toLowerCase().includes(kw) || String(c.id).includes(kw)
  )
})
const contacts = ref<Contact[]>([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
])

const activeContact = ref<Contact | null>(null)
const messages = ref<Message[]>([])
const inputText = ref('')

const selectContact = (contact: Contact) => {
  chatSelected.value = true
  activeContact.value = contact
  messages.value = [
    { text: '你好，我是 ' + contact.name, from: 'other' },
    { text: '你好！', from: 'me' }
  ]
  inputText.value = ''
}
const { send, close, isConnected } = useSocket({
  url: API_WS_URLS.chatWs,
  token: getToken(),
  onMessage: (event) => {
    const data = JSON.parse(event.data)
    messages.value.push({ text: data, from: 'other' })
  }
})


const sendMessage = () => {
  if (!inputText.value.trim()) return
  messages.value.push({ text: inputText.value, from: 'me' })
  inputText.value = ''
  // 可模拟回复：
  setTimeout(() => {
    messages.value.push({ text: '收到你的消息', from: 'other' })
  }, 500)
}

// 添加联系人弹窗相关
const addContactModalVisible = ref(false)
const addSearchText = ref('')
const searchResults = ref<Contact[]>([])

// 显示弹窗
const showAddContactModal = () => {
  addContactModalVisible.value = true
  addSearchText.value = ''
  searchResults.value = []
}

// 模糊匹配 id 或 name
const performSearch = () => {
  const kw = addSearchText.value.trim().toLowerCase()
  if (!kw) {
    searchResults.value = []
    return
  }
  const mockUsers: Contact[] = [
    { id: 4, name: 'David' },
    { id: 5, name: 'Eve' },
    { id: 6, name: 'Alfred' },
    { id: '007', name: 'James Bond' }
  ]
  searchResults.value = mockUsers.filter(u =>
    u.name.toLowerCase().includes(kw) || String(u.id).includes(kw)
  )
}

// 防抖版本
const debouncedSearch = debounce(performSearch, 300)

// 监听输入实时查询
const onAddSearchChange = () => {
  debouncedSearch()
}

const selectSearchResult = (contact: Contact) => {
  if (!contacts.value.find(c => c.id === contact.id)) {
    contacts.value.push(contact)
  }
  addContactModalVisible.value = false
  searchResults.value = []
  // 后端api
}

const handleAddContact = () => {
  if (searchResults.value.length === 1) {
    selectSearchResult(searchResults.value[0])
  }
}

// const handleSetUserId = () => {
//   if (!userIdInput.value.trim()) return
//   setUserID(userIdInput.value.trim())
//   console.log("userID:", getUserID())
//   userIdModalVisible.value = false
// }
onMounted(() => {
  if (!getUserID()) {
    userIdModalVisible.value = true
  }

})
onBeforeUnmount(() => {
  close()
})
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
}

.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}

.contact-list {
  flex: 1;
  overflow-y: auto;
}

.contact-list .ant-list-item.active {
  background-color: #e6f7ff;
  font-weight: bold;
  cursor: default;
}

.contact-list .ant-list-item {
  cursor: pointer;
}

.chat-box {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  font-weight: bold;
}

.chat-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #f9f9f9;
}

.chat-message {
  margin-bottom: 10px;
  max-width: 60%;
  padding: 8px 12px;
  border-radius: 8px;
  word-break: break-word;
}

.from-me {
  background: #d6f5d6;
  align-self: flex-end;
  margin-left: auto;
}

.from-other {
  background: #fff;
  border: 1px solid #eee;
  align-self: flex-start;
  margin-right: auto;
}

.chat-input {
  padding: 12px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
}
</style>