import type { GetUserContactsReq, GetUserContactsResp } from '@/types/contact'
import request from './requests'
import { API_URLS } from '@/api/urls'

export const GetUserContacts = (req: GetUserContactsReq) => {
  return request.get<GetUserContactsResp>(API_URLS.getUserContacts, { params: req })
}
