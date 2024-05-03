import {
  IFetchUsersParams,
  IFetchUsersSuccessData,
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
  getAllUsersAction: async (params?: IFetchUsersParams) => {
    return await ApiClient.get<IFetchUsersSuccessData>('/users', {
      params,
    })
  },
  getProfileAction: async () => {
    return await ApiClient.get<IUserDetail>('/users/profile');
  },
}
