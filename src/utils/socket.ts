
import { message } from 'ant-design-vue'
import { ref } from 'vue'

interface MessageHandler {
  (event: MessageEvent): void
}

interface SocketOptions {
  url: string
  token: string
  onMessage?: MessageHandler
  reconnectInterval?: number
  heartbeatInterval?: number
  onConnectionChange?: (status: boolean) => void
}

export function useSocket(options: SocketOptions) {
  const {
    url,
    token,
    onMessage,
    reconnectInterval = 3000,
    heartbeatInterval = 15000,
    onConnectionChange,
  } = options

  let socket: WebSocket | null = null
  let reconnectTimer: number | null = null
  let heartbeatTimer: number | null = null

  const isConnected = ref(false)

  const connect = () => {
    const fullUrl = `${url}?token=${encodeURIComponent(token)}`
    socket = new WebSocket(fullUrl)
    socket.binaryType = 'arraybuffer'
    socket.onopen = () => {
      console.log('[WebSocket] 连接成功')
      isConnected.value = true
      message.success('成功连接服务器')
      startHeartbeat()
      onConnectionChange?.(true)
    }

    socket.onmessage = (event) => {
      onMessage?.(event)
    }

    socket.onerror = (error) => {
      message.error('无法连接服务器')
      console.error('[WebSocket] 错误:', error)
    }

    socket.onclose = () => {
      console.warn('[WebSocket] 连接断开，尝试重连')
      isConnected.value = false
      onConnectionChange?.(false)
      stopHeartbeat()
      attemptReconnect()
    }
  }

  const startHeartbeat = () => {
    heartbeatTimer = window.setInterval(() => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send('ping')
      }
    }, heartbeatInterval)
  }

  const stopHeartbeat = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  const attemptReconnect = () => {
    if (reconnectTimer) return
    reconnectTimer = window.setTimeout(() => {
      connect()
      reconnectTimer = null
    }, reconnectInterval)
  }

  const send = (data: Uint8Array) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(data)
    } else {
      console.warn('[WebSocket] 发送失败，未连接')
    }
  }

  const close = () => {
    socket?.close()
    stopHeartbeat()
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
  }

  connect()

  return {
    send,
    close,
    isConnected,
  }
}
