import type {
  ChatMsg,
  ChatMsgAudio,
  ChatMsgFile,
  ChatMsgImage,
  ChatMsgVideo,
  MsgType,
} from './socket'

import type { Long } from '@/proto/chat'

export interface GetConversationMsgsReq {
  group_id: string
  page?: number
  page_size?: number
  before?: EpochTimeStamp
}

export interface GetConversationMsgsResp {
  msgs: ChatMsg[]
  total: number
  page: number
  page_size: number
}

// 前端展示用的结构体
export interface ConversationMsg {
  ID: string
  From: string
  To: string
  Type: MsgType
  Content: string
  created_at: Long
  Loading?: boolean
  Sended?: boolean
}
// 获取聊天列表
export interface GetConversationsListReq {
  page?: number
  page_size?: number
}

export interface GetConversationsListResp {
  conversations: {
    id: string
    name: string
    avatar: string
    last_msg: ChatMsg
    unread_count: number
    time: EpochTimeStamp
  }[]
  total: number
  page: number
  page_size: number
}
