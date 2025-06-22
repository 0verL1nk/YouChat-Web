import { defineStore } from 'pinia'
import axios from 'axios'
import { type ChatMsg, type Long } from '@/proto/chat'
import { type ChatMsg as chatMsg, MsgType, type ChatMsgText } from '@/types/socket'
import request from '@/services/requests'
import { API_URLS } from '@/api/urls'
import type { ConversationMsg, GetConversationMsgsReq, GetConversationMsgsResp } from '@/types/chat'
import { before, each } from 'lodash-es'
import { intToLong } from '@/utils/common'
export const useConversationStore = defineStore('conversation', {
  state: () => ({
    conversationID: '',
    messages: [] as ChatMsg[], // 当前会话已加载的消息
    displayMessages: [] as ConversationMsg[],
    loadingHistory: false,
    hasMore: true, // 是否还有更早的消息可加载
    pageSize: 50,
    page: 1,
    ws: null, // WebSocket 实例
  }),
  actions: {
    async loadHistory() {
      if (!this.hasMore || this.loadingHistory) return
      this.loadingHistory = true
      // 用最早一条消息的时间戳作为 cursor
      try {
        console.debug('groupID', this.conversationID)
        const req: GetConversationMsgsReq = {
          group_id: this.conversationID,
          page: this.page++, // 增加页码
          page_size: this.pageSize,
        }
        const res = await request.get<GetConversationMsgsResp>(API_URLS.getConversations, {
          params: req,
        })
        const batch = res.data.msgs // 假设接口返回的是按时间降序排列的数组
        if (batch.length < this.pageSize) {
          this.hasMore = false
        }
        // 创建临时数组存储转换后的消息
        const newMessages: ConversationMsg[] = []

        for (const msg of batch) {
          switch (msg.type) {
            case MsgType['text']:
              const content = msg.Content as ChatMsgText
              newMessages.push({
                ID: msg.id,
                From: msg.from,
                To: msg.to,
                Type: msg.type,
                Content: content.Text,
                created_at: intToLong(msg.create_at),
              })
              break
            default:
              break
          }
        }

        // 将新消息插入到数组开头
        this.displayMessages = [...newMessages, ...this.displayMessages]
      } finally {
        this.loadingHistory = false
      }
    },
    addMessage(msg: ChatMsg) {
      // 发送或收到实时消息时调用
      console.debug('addMessage', msg)
      //如果type不存在,就是0
      if (!msg.type) {
        msg.type = MsgType['text'] // 默认类型为文本
      }
      switch (msg.type) {
        case MsgType['text']:
          this.displayMessages.push({
            ID: msg.id || '',
            From: msg.from || '',
            To: msg.to || '',
            Type: MsgType['text'],
            Content: msg.text as string,
            created_at: msg.created_at as Long,
            Sended: false,
          })
          break
        default:
          break
      }
      // 调用websocket
    },
    updateMsg(cid: string, mid: string) {
      // 更新消息状态
      const displayMsg = this.displayMessages.find((m) => m.ID === cid)
      if (displayMsg) {
        displayMsg.Sended = true
        displayMsg.ID = mid
      }
    },
    reset() {
      // 离开会话、切换会话时清空前会话数据
      this.displayMessages = []
      this.hasMore = true
      this.ws = null
    },
  },
})
