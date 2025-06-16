import { defineStore } from 'pinia'
import axios from 'axios'
import type { ChatMsg } from '@/types/socket'
export const useConversationStore = defineStore('conversation', {
    state: () => ({
        messages: [] as ChatMsg[],         // 当前会话已加载的消息
        loadingHistory: false,
        hasMore: true,        // 是否还有更早的消息可加载
        pageSize: 50,
        ws: null,             // WebSocket 实例
    }),
    actions: {
        async loadHistory(conversationId:string) {
            if (!this.hasMore || this.loadingHistory) return
            this.loadingHistory = true
            // 用最早一条消息的时间戳作为 cursor
            const before = this.messages.length
                ? this.messages[0].CreateAt
                : Date.now()
            try {
                const res = await axios.get(
                    `/api/conversations/${conversationId}/messages`,
                    {
                        params: { before, limit: this.pageSize },
                    }
                )
                const batch = res.data  // 假设接口返回的是按时间降序排列的数组
                if (batch.length < this.pageSize) {
                    this.hasMore = false
                }
                // 将更早的消息 prepend 到数组前面，顺序调整为从旧到新
                this.messages = [...batch.reverse(), ...this.messages]
            } finally {
                this.loadingHistory = false
            }
        },
        addMessage(msg:ChatMsg) {
            // 发送或收到实时消息时调用
            this.messages.push(msg)
        },
        reset() {
            // 离开会话、切换会话时清空前会话数据
            this.messages = []
            this.hasMore = true
            this.ws = null
        },
    },
})