import {
  IUserDetail,
  TUpdateUserData
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const userManagementAPI = {
  updateProfile: async (payload: Partial<TUpdateUserData>) => {
    return await ApiClient.put<IUserDetail, Omit<TUpdateUserData, 'id'>>(
      `/users/profile`,
      payload
    )
  },
}
