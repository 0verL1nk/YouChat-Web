// Token 的 key 名称
const TOKEN_KEY = 'youchat_token'
const USERID_KEY = 'youchat_user_id'
// 获取 token
export const getToken = (): string => {
  return localStorage.getItem(TOKEN_KEY) || ''
}

// 设置 token
export const setToken = (token: string): void => {
  removeToken() // 确保每次设置前先移除旧的 token
  localStorage.setItem(TOKEN_KEY, token)
}

// 移除 token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

// 检查是否有 token
export const hasToken = (): boolean => {
  return !!getToken()
}

export const setUserID = (id: string): void => {
  localStorage.setItem(USERID_KEY, id)
}

export const getUserID = (): string => {
  return localStorage.getItem(USERID_KEY) || ''
}

export const removeUserID = (): void => {
  localStorage.removeItem(USERID_KEY)
}
