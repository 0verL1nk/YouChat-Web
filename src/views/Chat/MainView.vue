<template>
  <div class="chat-container">
    <div class="sidebar">
      <div class="sidebar-header">
        <span>聊天</span>
        <PlusCircleOutlined @click="showAddContactModal" style="cursor: pointer; font-size: 18px;" />
      </div>

      <!-- 搜索联系人 -->
      <div style="padding: 0 12px 8px;">
        <a-input-search v-model:value="searchText" placeholder="搜索联系人" allow-clear />
      </div>

      <a-list bordered class="contact-list">
        <a-list-item v-for="item in filteredContacts" :key="item.group_id"
          :class="{ active: item.group_id === activeContact?.group_id }" @click="selectContact(item)">
          {{ item.name }}
        </a-list-item>
      </a-list>
    </div>
    <!-- 添加联系人弹窗 -->
    <a-modal v-model:open="addContactModalVisible" title="添加联系人或群组" @ok="handleAddContact" ok-text="添加">
      <a-row>
        <a-col flex="auto">
          <a-input v-model:value="addSearchText" placeholder="输入用户名或ID搜索" @input="onAddSearchChange" allow-clear />
        </a-col>
        <a-col>
          <a-radio-group v-model:value="searchType">
            <a-radio-button value="contact">联系人</a-radio-button>
            <a-radio-button value="group">群组</a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>

      <a-list v-if="searchResults.length" :data-source="searchResults" bordered style="margin-top: 12px">
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

      <div class="chat-content" v-if="chatSelected" ref="chatContentRef" @scroll="handleScroll">
        <div v-if="conversationStore.loadingHistory" class="loading-history">
          <a-spin size="small" /> 加载历史消息...
        </div>
        <MessageCard v-for="(msg, index) in conversationStore.displayMessages" :key="index" :msg="msg"
          :userID="userID" />
      </div>
      <div class="chat-input" v-if="chatSelected">
        <a-input-search v-model:value="inputText" placeholder="输入消息..." enter-button="发送" @search="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, nextTick, defineEmits } from 'vue'
import { getUserID, getToken } from '@/stores/local'
import { useSocket } from '@/utils/socket'
import { API_WS_URLS } from '@/api/urls'
import type { Contact, GetUserContactsReq } from '@/types/contact'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import { debounce } from 'lodash-es'
import { useConversationStore } from '@/stores/chat'
import { GetUserContacts } from '@/services/user'
import { decodeChatMsg, encodeChatMsg, type ChatMsg } from '@/proto/chat'
import { intToLong } from '@/utils/common'
import MessageCard from '@/components/chat/MessageCard.vue'
import { MsgType } from '@/types/socket'

const emit = defineEmits<{
  (e: 'connection-change', status: boolean): void
}>()

const userIdModalVisible = ref(false)
const chatSelected = ref(false)
const userID = getUserID()
const activeContact = ref<Contact | null>(null)
const inputText = ref('')
const conversationStore = useConversationStore()
const searchType = ref('contact') // 搜索类型，默认为联系人
// 添加 chatContentRef
const chatContentRef = ref<HTMLElement | null>(null)

// 搜索联系人
const searchText = ref('')
const filteredContacts = computed(() => {
  const kw = searchText.value.toLowerCase()
  return contacts?.value?.filter(c =>
    c.name.toLowerCase().includes(kw) || String(c.group_id).includes(kw)
  )
})
const contacts = ref<Contact[]>([
  { group_id: 'sss', name: 'Alice' },
  { group_id: 'aadd', name: 'Bob' },
  { group_id: 'sdwd', name: 'Charlie' }
])

const selectContact = async (contact: Contact) => {
  chatSelected.value = true
  activeContact.value = contact
  // 清空数据
  conversationStore.reset()
  conversationStore.conversationID = contact.group_id
  await conversationStore.loadHistory()
  // 在消息加载完成后滚动到底部
  scrollToBottom()
  inputText.value = ''
}

const WsMsgHandler = (event: MessageEvent): void => {
  if (!event.data) {
    console.warn("ws msg is empty");
    return
  }
  const buf = new Uint8Array(event.data);
  if (buf.length === 0) {
    console.warn("ws msg buf is empty");
    return
  }
  if (event.data != 'pong') {
    console.debug("origin ws msg:", buf);
    const msg = decodeChatMsg(buf)
    console.debug("ws msg:", msg);
    if (msg.from == 'msg_received') {
      conversationStore.updateMsg(msg?.text || '', msg.id || '')
      return
    }
    if (msg.from == 'system') {
      return
    }
    // 如果type不存在为0
    if (!msg.type) {
      msg.type = MsgType['text']
    }
    switch (msg.type) {
      case MsgType['text']:
        conversationStore.addMessage(msg)
        break;

      default:
        console.warn("unknown msg type:", msg.type);
        break;
    }
    const shouldScroll = isAtBottom() // 在添加消息前判断是否在底部
    if (shouldScroll) {
      scrollToBottom()
    }
  }
}

const { send, close } = useSocket({
  url: API_WS_URLS.chatWs,
  token: getToken(),
  onMessage: WsMsgHandler,
  onConnectionChange: (status) => {
    emit('connection-change', status)
  }
})

const isAtBottom = () => {
  if (!chatContentRef.value) return false
  const { scrollTop, scrollHeight, clientHeight } = chatContentRef.value
  // 考虑一点误差范围(2px)
  return scrollHeight - scrollTop - clientHeight <= 2
}
// 滚动到底部的函数
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContentRef.value) {
      chatContentRef.value.scrollTop = chatContentRef.value.scrollHeight
    }
  })
}

const sendMessage = () => {
  if (inputText.value == '') {
    console.warn("input text is empty");
    return
  }
  const msg: ChatMsg = {
    id: crypto.randomUUID(),
    type: MsgType['text'],
    from: userID,
    to: activeContact.value?.group_id || '',
    text: inputText.value,
    created_at: intToLong(Date.now()),
  }
  console.debug("send msg:", msg);
  conversationStore.addMessage(msg)
  inputText.value = ''
  send(encodeChatMsg(msg))
  scrollToBottom()
}

// 添加处理滚动的函数
const handleScroll = async (e: Event) => {
  const target = e.target as HTMLElement
  // 当滚动到顶部时（考虑一点误差）
  if (target.scrollTop <= 10) {
    // 如果还有更多历史消息
    if (conversationStore.hasMore && !conversationStore.loadingHistory) {
      // 记录当前滚动位置
      const oldHeight = target.scrollHeight
      const oldScroll = target.scrollTop

      // 加载历史消息
      await conversationStore.loadHistory()

      // 保持相对滚动位置
      nextTick(() => {
        const newHeight = target.scrollHeight
        target.scrollTop = oldScroll + (newHeight - oldHeight)
      })
    }
  }
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
    { group_id: 'ass', name: 'David' },
    { group_id: 'sda', name: 'Eve' },
    { group_id: 'dsadaw', name: 'Alfred' },
    { group_id: '007', name: 'James Bond' }
  ]
  searchResults.value = mockUsers.filter(u =>
    u.name.toLowerCase().includes(kw) || String(u.group_id).includes(kw)
  )
}

// 防抖版本
const debouncedSearch = debounce(performSearch, 300)

// 监听输入实时查询
const onAddSearchChange = () => {
  debouncedSearch()
}

const selectSearchResult = (contact: Contact) => {
  if (!contacts.value.find(c => c.group_id === contact.group_id)) {
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

const refreshContact = async () => {
  try {
    const req: GetUserContactsReq = {}
    const resp = await GetUserContacts(req)
    if (resp.data) {
      contacts.value = resp.data.contacts
      console.debug("refresh contacts:", resp.data.contacts)
    } else {
      contacts.value = []
    }
  } catch (error) {
    console.error('Failed to refresh contacts:', error)
  }
}

onMounted(async () => {
  if (!getUserID()) {
    userIdModalVisible.value = true
  }
  // 初始化联系人
  await refreshContact()
  selectContact(contacts.value[0])
})
onBeforeUnmount(() => {
  close()
})
defineExpose({
  close
})
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100%;
  /* 修改为 100% */
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
  scroll-behavior: smooth;
}

.chat-input {
  padding: 12px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
}

.loading-history {
  text-align: center;
  padding: 8px 0;
  color: #999;
  font-size: 12px;
}
</style>
