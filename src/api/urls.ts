// 定义基础前缀，可由环境变量控制
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'
const API_BASE_WS = import.meta.env.VITE_API_BASE_WS_URL || '/wsApi'

export const API_URLS = {
  login: `${API_BASE}/auth/login`,
  logout: `${API_BASE}/logout`,
  getCaptcha: `${API_BASE}/auth/captcha`,
  register: `${API_BASE}/auth/register`,
  userInfo: `${API_BASE}/user/info`,

}


export const API_WS_URLS = {
  chatWs: `${API_BASE_WS}/chat/ws`
}