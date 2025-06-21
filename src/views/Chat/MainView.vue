<template>
  <div class="chat-container">
    <!-- 设置用户名弹窗 -->
    <!-- <a-modal v-model:open="userIdModalVisible" title="设置用户名" @ok="handleSetUserId" ok-text="保存">
      <a-input v-model:value="userIdInput" placeholder="请输入用户名或用户ID" />
    </a-modal> -->
    <!-- 左侧聊天列表 -->
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

      <div class="chat-content" v-if="chatSelected">
        <div v-for="(msg, index) in conversationStore.displayMessages" :key="index"
          :class="['chat-message', msg.From === userID ? 'from-me' : 'from-other']">
          <div v-if="msg.Type === MsgType['text']">
            {{ msg.Content }}
          </div>
          <div v-else-if="msg.Type === MsgType['image']">
            <img :src="msg.Content" alt="Image message" style="max-width: 100%; border-radius: 8px;" />
          </div>
          <div v-else>
            未知消息类型
          </div>
        </div>
      </div>
      <div class="chat-input" v-if="chatSelected">
        <a-input-search v-model:value="inputText" placeholder="输入消息..." enter-button="发送" @search="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, reactive } from 'vue'
import { getUserID, getToken } from '@/stores/local'
import { useSocket } from '@/utils/socket'
import { API_WS_URLS } from '@/api/urls'
import type { Contact, GetUserContactsReq } from '@/types/contact'
import { MsgType } from '@/types/socket'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import { debounce } from 'lodash-es'
import { useConversationStore } from '@/stores/chat'
import { GetUserContacts } from '@/services/user'
import { decodeChatMsg, encodeChatMsg, type ChatMsg, msgType, type Long } from '@/proto/chat'
import { intToLong } from '@/utils/common'
const userIdModalVisible = ref(false)
const chatSelected = ref(false)
const userID = getUserID()
const activeContact = ref<Contact | null>(null)
const inputText = ref('')
const conversationStore = useConversationStore()
const searchType = ref('contact') // 搜索类型，默认为联系人

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



const selectContact = (contact: Contact) => {
  chatSelected.value = true
  activeContact.value = contact
  // 清空数据
  conversationStore.reset()
  conversationStore.conversationID = contact.group_id
  conversationStore.loadHistory()
  // conversationStore.addMessage({ Content: "我是" + contact.name, Code: 2000, From: '2222', To: userID, Type: MsgType['text'], CreateAt: Date.now() - 9999 })
  // conversationStore.addMessage({ Content: "你好", Code: 2000, From: userID, To: '2222', Type: MsgType['text'], CreateAt: Date.now() - 9958 })
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
    if (msg.code != 2000) {
      console.error("err get msg:", msg);
      return
    }
    if (msg.from == 'msg_received') {
      conversationStore.updateMsg(msg?.text || '', msg.id || '')
      return
    }
    switch (msg.type) {
      case msgType['TEXT']:
        conversationStore.addMessage(msg)
        break;

      default:
        console.warn("unknown msg type:", msg.type);
        break;
    }

  }
}

const { send, close, isConnected } = useSocket({
  url: API_WS_URLS.chatWs,
  token: getToken(),
  onMessage: WsMsgHandler
})


const sendMessage = () => {
  if (inputText.value == '') {
    console.warn("input text is empty");
    return
  }
  const msg = {
    id: crypto.randomUUID(),
    type: msgType['TEXT'],
    from: userID,
    to: activeContact.value?.group_id || '',
    text: inputText.value,
    created_at: intToLong(Date.now()),
  }
  console.debug("send msg:", msg);
  conversationStore.addMessage(msg)
  inputText.value = ''
  send(encodeChatMsg(msg))
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
  // 初始化联系人
  refreshContact()
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
