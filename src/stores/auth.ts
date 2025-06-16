import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useUserStore=defineStore('user',()=>{
  // FIXME: 先不整登录
  const isLogin=ref(false)
  const accessToken=ref('')
  const refreshToken=ref('')
  const userID=ref('')
  const setUser=(id:string)=>{
    userID.value=id
  }
  
  return {isLogin,accessToken,refreshToken,userID,setUser}
})
