import axios from 'axios'
import request from './requests'
import { API_URLS } from '@/api/urls'
import type { LoginReq ,LoginResponse} from '@/types/auth'

export const Login = async (data: LoginReq) => {
    return request.post<LoginResponse>(API_URLS.login, data)
}
