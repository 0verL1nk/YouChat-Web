<template>
  <div :class="['message-container', isFromMe ? 'me' : 'other']">
    <div class="avatar">
      <a-avatar v-if="haveAvatar" :src="avatar" />
      <a-avatar v-else>{{ avatar }}</a-avatar>
    </div>
    <div class="message-content">
      <div class="sender-name">{{ isFromMe ? '我' : msg.From }}</div>
      <div class="message-bubble">
        <div v-if="msg.Type === MsgType['text']" class="text-content">
          {{ msg.Content }}
        </div>
        <div v-else-if="msg.Type === MsgType['image']" class="image-content">
          <img :src="msg.Content" alt="图片消息" />
        </div>
        <div v-else class="unknown-content">
          未知消息类型
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MsgType } from '@/types/socket'
import { getUserAvatar } from '@/stores/local'

interface Props {
  msg: {
    Type: number
    Content: string
    From: string
  }
  userID: string
}

const props = defineProps<Props>()

const isFromMe = computed(() => {
  return props.msg.From === props.userID
})
const haveAvatar = computed(() => {
  if (getUserAvatar(isFromMe.value ? props.userID : props.msg.From)) {
    return true
  } else {
    return false
  }
})


const avatar = computed(() => {
  const avatarUrl = getUserAvatar(isFromMe.value ? props.userID : props.msg.From)
  if (avatarUrl == '') {
    return isFromMe.value ? 'Me' : props.msg.From.slice(0, 2)
  } else {
    return avatarUrl
  }
})
</script>

<style scoped>
.message-container {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  padding: 0 8px;
}

.message-container.me {
  flex-direction: row-reverse;
}

.avatar {
  flex-shrink: 0;
  margin-top: 4px;
}

.message-content {
  display: flex;
  flex-direction: column;
  max-width: 60%;
}

.sender-name {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.me .sender-name {
  text-align: right;
}

.message-bubble {
  border-radius: 12px;
  padding: 8px 12px;
  position: relative;
}

.me .message-bubble {
  background: #e6f7ff;
  border: 1px solid #91d5ff;
}

.other .message-bubble {
  background: #fff;
  border: 1px solid #d9d9d9;
}

.text-content {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.image-content img {
  max-width: 100%;
  border-radius: 8px;
}

.unknown-content {
  color: #999;
  font-style: italic;
}
</style>