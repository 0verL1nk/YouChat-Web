export interface Contact {
  group_id: string
  name: string
  avatar?: string
  last_message_time?: EpochTimeStamp
  unread_count?: number
}
// 模糊搜搜
export interface SearchContactUserReq {
  UserID: string
  Page?: number
  PageSize?: number
}

export interface SearchContactUserResp {
  Users: contactUserInSearch[]
  Page?: number
  PageSize?: number
  Total: number
}

interface contactUserInSearch {
  UserID: string
  Avatar: string
}

export interface GetUserContactsReq {
  page?: number
  page_size?: number
}

export interface GetUserContactsResp {
  contacts: Contact[]
  Page?: number
  PageSize?: number
  Total: number
}
