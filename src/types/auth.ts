export interface LoginReq {
  email: string
  password: string
  captcha?: string
  captcha_key?: string
}

export interface LoginResponse {
  token: string
  expire_at: {
    seconds: number
    nanos: number
  }
  user_id: string
  nick_name: string
  admin: string
}

export interface RegisterReq {
  email: string
  password: string
  captcha?: string
  captcha_key?: string
  nick_name?: string
  invite_code?: string
}

export interface RegisterResp {
  info: string
}
