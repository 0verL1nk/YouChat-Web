import axios from 'axios'
import { getToken, removeToken } from '@/stores/local'
import { message } from 'ant-design-vue'
import { useLoadingStore } from '@/stores/loading'

const request = axios.create({
  // 在生产环境使用完整的 API URL，在开发环境使用相对路径
  baseURL: '',
  timeout: 60000,
  headers: {},
})

// 需要忽略全局loading的请求路径
const ignoreLoadingPaths: string[] = []

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      // headers里放token
      config.headers['Authorization'] = `Bearer ${token}`
    }
    // 显示全局加载状态
    if (!ignoreLoadingPaths.includes(config.url || '')) {
      try {
        const loadingStore = useLoadingStore()
        loadingStore.showLoading()
      } catch (error) {
        console.warn('Loading store not available yet', error)
      }
    }
    return config
  },
  (error) => {
    console.error(error)
    try {
      const loadingStore = useLoadingStore()
      loadingStore.hideLoading()
    } catch (error) {
      console.warn('Loading store not available yet', error)
    }
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    try {
      const loadingStore = useLoadingStore()
      loadingStore.hideLoading()
    } catch (error) {
      console.warn('Loading store not available yet', error)
    }

    // 对于blob和text等非JSON响应，直接返回
    const contentType = response.headers['content-type'] || ''
    if (
      response.config.responseType === 'blob' ||
      response.config.responseType === 'text' ||
      contentType.includes('application/pdf') ||
      contentType.includes('text/plain')
    ) {
      return response
    }

    // 对于JSON响应进行验证
    if (response.status === 200) {
      return response
    }
    return Promise.reject(new Error(response.data.info || '操作失败'))
  },
  (error) => {
    try {
      const loadingStore = useLoadingStore()
      loadingStore.hideLoading()
    } catch (error) {
      console.warn('Loading store not available yet', error)
    }

    console.debug('API Error:', error.config?.url, error.message, error.response?.data)

    if (error.response) {
      switch (error.response.status) {
        case 400:
          message.error(error.response.data?.error_msg || '请求错误')
          break
        case 401:
          removeToken()
          window.location.href = '/login' // 使用原生重定向
          break
        case 403:
          message.warning('权限不足')
          break
        case 500:
          message.error(error.response.data?.error_msg || '服务器错误')
          break
        default:
          message.error('网络错误')
      }
    } else if (error.request) {
      // 请求发出但未收到响应
      message.error('网络连接失败', 5)
    } else {
      // 请求配置出错
      message.error(error.message)
    }
    return Promise.reject(error)
  },
)

export default request
