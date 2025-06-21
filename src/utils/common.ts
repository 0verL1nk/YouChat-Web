import type { Long } from '@/proto/chat'

export const intToLong = (value: number): Long => {
  value |= 0
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  }
}

export const stringToLong = (value: string): Long => {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  }
}

export const longToString = (value: Long): string => {
  const low = value.low
  const high = value.high
  return String.fromCharCode(low & 0xffff, low >>> 16, high & 0xffff, high >>> 16)
}
