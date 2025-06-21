import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const refreshToken = ref('')
  const userID = ref('')
  const setUser = (id: string) => {
    userID.value = id
  }

  return { accessToken, refreshToken, userID, setUser }
})
