import axios from 'axios'
import request from './requests'
import { API_URLS } from '@/api/urls'
import type { LoginReq, LoginResponse, RegisterReq } from '@/types/auth'

export const Login = async (data: LoginReq) => {
  return request.post<LoginResponse>(API_URLS.login, data)
}

export const Register = async (data: RegisterReq) => {
  return request.post<RegisterReq>(API_URLS.register, data)
}
